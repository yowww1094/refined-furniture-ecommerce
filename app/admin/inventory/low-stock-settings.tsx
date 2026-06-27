import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertTriangle, Bell, List, Settings, Activity, CheckCircle2, Users } from 'lucide-react';
import { useState } from 'react';

export default function LowStockSettingsPage() {
  const [settings, setSettings] = useState({
    globalAlertThreshold: 10,
    enableEmailAlerts: true,
    enableSMSAlerts: false,
    enableDashboardAlerts: true,
    alertFrequency: 'immediate',
    notificationRecipients: ['inventory@refinedfurniture.ma', 'operations@refinedfurniture.ma'],
    categoryThresholds: [
      { id: 'cat1', name: 'Living Room', threshold: 8 },
      { id: 'cat2', name: 'Bedroom', threshold: 5 },
      { id: 'cat3', name: 'Dining Room', threshold: 6 },
      { id: 'cat4', name: 'Office', threshold: 4 },
      { id: 'cat5', name: 'Outdoor', threshold: 3 }
    ]
  });

  const [editingCategory, setEditingCategory] = useState(null);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggleChange = (field, checked) => {
    setSettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSelectChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to database via server action
    alert('Low stock settings saved successfully!');
  };

  const handleAddCategoryThreshold = () => {
    const newCategory = {
      id: `cat${Date.now()}`,
      name: 'New Category',
      threshold: 5
    };
    setSettings(prev => ({
      ...prev,
      categoryThresholds: [...prev.categoryThresholds, newCategory]
    }));
    setEditingCategory(newCategory);
  };

  const handleDeleteCategoryThreshold = (id) => {
    setSettings(prev => ({
      ...prev,
      categoryThresholds: prev.categoryThresholds.filter(cat => cat.id !== id)
    }));
  };

  const handleSaveCategoryThreshold = (id, name, threshold) => {
    setSettings(prev => ({
      ...prev,
      categoryThresholds: prev.categoryThresholds.map(cat =>
        cat.id === id ? { ...cat, name, threshold: Number(threshold) } : cat
      )
    }));
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">Low Stock Alert Settings</h1>
        <Button variant="outline" onClick={() => handleAddCategoryThreshold()}>
          Add Category Threshold
        </Button>
      </div>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Global Alert Settings</h2>
        </CardHeader>
        <CardContent>
          <Form>
            <FormField
              control={settings.globalAlertThreshold}
              name="globalAlertThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Global Low Stock Threshold</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value || ''}
                      onChange={(e) => handleInputChange('globalAlertThreshold', Number(e.target.value))}
                      min="0"
                      placeholder="Default threshold for all categories"
                    />
                  </FormControl>
                  <FormMessage>
                    Default stock level below which all products trigger alerts (can be overridden per category)
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={settings.enableEmailAlerts}
              name="enableEmailAlerts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={checked => handleToggleChange('enableEmailAlerts', checked)}
                    />
                    Enable Email Alerts
                  </FormLabel>
                  <FormControl />
                  <FormMessage>
                    Send email notifications when stock falls below threshold
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={settings.enableSMSAlerts}
              name="enableSMSAlerts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={checked => handleToggleChange('enableSMSAlerts', checked)}
                    />
                    Enable SMS Alerts
                  </FormLabel>
                  <FormControl />
                  <FormMessage>
                    Send SMS notifications when stock falls below threshold
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={settings.enableDashboardAlerts}
              name="enableDashboardAlerts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={checked => handleToggleChange('enableDashboardAlerts', checked)}
                    />
                    Enable Dashboard Alerts
                  </FormLabel>
                  <FormControl />
                  <FormMessage>
                    Show notifications in admin dashboard when stock falls below threshold
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={settings.alertFrequency}
              name="alertFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alert Frequency</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || 'immediate'}
                      onValueChange={value => handleSelectChange('alertFrequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="hourly">Hourly Digest</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    How often to send low stock alerts
                  </FormMessage>
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
      </Card>

      {/* Notification Recipients */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Notification Recipients</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <h3 className="font-medium">Recipients</h3>
              <Button variant="outline" size="sm" onClick={() => /* open recipient manager */ }>
                Manage Recipients
              </Button>
            </div>
            <div className="space-y-2">
              {settings.notificationRecipients.map((email, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Mail className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{email}</p>
                    <p className="text-xs text-muted-foreground">Notification recipient</p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm" onClick={() => /* handleRemoveRecipient(email) */ alert('Remove not implemented')}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              {settings.notificationRecipients.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No recipients configured
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category-Specific Thresholds */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Category-Specific Thresholds</h2>
          <p className="text-sm text-muted-foreground">
            Override global threshold for specific product categories
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {settings.categoryThresholds.map((category) => (
              <div key={category.id} className={editingCategory && editingCategory.id === category.id ?
                "p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-primary/20" :
                "p-3 border-l-4 border-primary/20 bg-white/50 backdrop-blur-sm"}
              >
                {editingCategory && editingCategory.id === category.id ? (
                  <Form>
                    <FormField
                      control={category.name}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              value={field.value || ''}
                              onChange={(e) => {
                                setEditingCategory(prev => ({
                                  ...prev,
                                  name: e.target.value
                                }));
                              }}
                              className="input input-bordered w-full"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={category.threshold}
                      name="threshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Low Stock Threshold</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value || ''}
                              onChange={(e) => {
                                setEditingCategory(prev => ({
                                  ...prev,
                                  threshold: Number(e.target.value)
                                }));
                              }}
                              className="input input-bordered w-full"
                              min="0"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="mt-4 flex justify-end space-x-3">
                      <Button type="button" variant="outline" onClick={() => setEditingCategory(null)}>
                        Cancel
                      </Button>
                      <Button type="submit" onClick={(e) => {
                        e.preventDefault();
                        handleSaveCategoryThreshold(category.id, editingCategory.name, editingCategory.threshold);
                      }}>
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                          <List className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-xs text-muted-foreground">Category threshold settings</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                          {category.threshold} units
                        </span>
                        <Button variant="outline" size="sm" onClick={() => setEditingCategory(category)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteCategoryThreshold(category.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              )}
              {settings.categoryThresholds.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No category thresholds configured
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}