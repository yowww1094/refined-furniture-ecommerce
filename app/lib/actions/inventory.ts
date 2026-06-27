'use server';

import { db } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function completeOrderAndDecrementInventory(orderId) {
  try {
    // Start a transaction
    const { data: order, error: orderError } = await db
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError) throw orderError;

    if (order.status !== 'processing') {
      throw new Error('Order is not in processing state');
    }

    // Get order items
    const { data: orderItems, error: itemsError } = await db
      .from('order_items')
      .select('*, product_id, products!inner(sku, stock_quantity)')
      .eq('order_id', orderId);

    if (itemsError) throw itemsError;

    // Update inventory for each product
    const updates = orderItems.map(item => ({
      id: item.product_id,
      stock_quantity: item.products.stock_quantity - item.quantity
    }));

    // Decrement inventory
    const { error: inventoryError } = await db
      .from('products')
      .upsert(updates);

    if (inventoryError) throw inventoryError;

    // Create inventory movement records
    const movementRecords = orderItems.map(item => ({
      product_id: item.product_id,
      change_type: 'out',
      quantity_change: -item.quantity,
      reason: `Order #${order.order_number} fulfillment`,
      reference_id: orderId,
      reference_type: 'order'
    }));

    const { error: movementError } = await db
      .from('inventory_movements')
      .insert(movementRecords);

    if (movementError) throw movementError;

    // Update order status to completed
    const { error: updateError } = await db
      .from('orders')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (updateError) throw updateError;

    // Revalidate relevant paths
    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin/inventory');
    revalidatePath('/admin/products');

    return { success: true, message: 'Order completed and inventory updated successfully' };
  } catch (error) {
    console.error('Error completing order:', error);
    return { success: false, error: error.message };
  }
}

export async function updateProductStock(productId, quantityChange, reason, referenceId = null, referenceType = null) {
  try {
    // Get current product
    const { data: product, error: productError } = await db
      .from('products')
      .select('stock_quantity')
      .eq('id', productId)
      .single();

    if (productError) throw productError;

    const newStock = Math.max(0, product.stock_quantity + quantityChange);

    // Update product stock
    const { error: updateError } = await db
      .from('products')
      .update({ stock_quantity: newStock })
      .eq('id', productId);

    if (updateError) throw updateError;

    // Create inventory movement record
    const { error: movementError } = await db
      .from('inventory_movements')
      .insert({
        product_id: productId,
        change_type: quantityChange > 0 ? 'in' : 'out',
        quantity_change: Math.abs(quantityChange),
        reason,
        reference_id: referenceId,
        reference_type: referenceType
      });

    if (movementError) throw movementError;

    // Revalidate paths
    revalidatePath('/admin/inventory');
    revalidatePath('/admin/products');

    return { success: true, message: 'Stock updated successfully' };
  } catch (error) {
    console.error('Error updating stock:', error);
    return { success: false, error: error.message };
  }
}