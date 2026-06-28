import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/utils/structured-data';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * Shop-level JSON-LD: BreadcrumbList for the shop section root.
   * Covers /shop and any nested routes (e.g. /shop/category/[slug]).
   * Category- and product-specific breadcrumbs are added by their own pages.
   */
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Shop', href: '/shop' },
        ])}
        id="ld-shop-breadcrumb"
      />
      {children}
    </>
  );
}
