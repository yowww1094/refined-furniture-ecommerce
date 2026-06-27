import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Phone, Globe, Mail, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    whatsappNumber: '+212 6xx xxx xxx',
    defaultLocale: 'en',
    contactEmail: 'info@refinedfurniture.ma',
    contactPhone: '+212 5xx xxx xxx',
    businessHours: '9:00 AM - 7:00 PM',
    address: '123 Rue de la Kasbah, Marrakech, Morocco',
    facebook: 'https://facebook.com/refinedfurniture',
    instagram: 'https://instagram.com/refinedfurniture',
    twitter: 'https://twitter.com/refinedfurniture',
    whatsappEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false
  });

  const [editedSettings, setEditedSettings] = useState(settings);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (key, value) => {
    setEditedSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleToggleChange = (key, checked) => {
    setEditedSettings(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would call a server action to save settings
    setSettings(editedSettings);
    setIsEditing(false);
    alert('Settings saved successfully!');
  };

  const handleCancelEdit = () => {
    setEditedSettings(settings);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex items-center space-x-3">
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Settings
            </Button>
          )}
          {isEditing && (
            <>
              <Button onClick={handleCancelEdit} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSaveSettings}>
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Business Information</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">WhatsApp Number</h3>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedSettings.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="+212 6xx xxx xxx"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{settings.whatsappNumber}</p>
                )}
              </div>
              <div>
                <h3 className="font-medium mb-2">Default Language</h3>
                {isEditing ? (
                  <select
                    value={editedSettings.defaultLocale}
                    onChange={(e) => handleInputChange('defaultLocale', e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="ar">Arabic</option>
                  </select>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {settings.defaultLocale === 'en' ? 'English' :
                     settings.defaultLocale === 'fr' ? 'French' : 'Arabic'}
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-medium mb-2">Contact Email</h3>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedSettings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="info@yourbusiness.com"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{settings.contactEmail}</p>
                )}
              </div>
              <div>
                <h3 className="font-medium mb-2">Contact Phone</h3>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedSettings.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="+212 5xx xxx xxx"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{settings.contactPhone}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium mb-2">Business Address</h3>
                {isEditing ? (
                  <textarea
                    value={editedSettings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="textarea textarea-bordered w-full min-h-[80px]"
                    placeholder="Enter your business address"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{settings.address}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium mb-2">Business Hours</h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedSettings.businessHours}
                    onChange={(e) => handleInputChange('businessHours', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="9:00 AM - 7:00 PM"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{settings.businessHours}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Social Media Links</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2">Facebook</h3>
                {isEditing ? (
                  <input
                    type="url"
                    value={editedSettings.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="https://facebook.com/yourpage"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground break-word">{settings.facebook}</p>
                )}
              </div>
              <div>
                <h3 className="font-medium mb-2">Instagram</h3>
                {isEditing ? (
                  <input
                    type="url"
                    value={editedSettings.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="https://instagram.com/yourpage"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground break-word">{settings.instagram}</p>
                )}
              </div>
              <div>
                <h3 className="font-medium mb-2">Twitter/X</h3>
                {isEditing ? (
                  <input
                    type="url"
                    value={editedSettings.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="https://twitter.com/yourpage"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground break-word">{settings.twitter}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Notification Preferences</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="whatsapp-notifications"
                checked={editedSettings.whatsappEnabled}
                onChange={(e) => handleToggleChange('whatsappEnabled', e.target.checked)}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                disabled={!isEditing}
              />
              <label htmlFor="whatsapp-notifications" className="ml-2 text-sm font-medium">
                Enable WhatsApp Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="email-notifications"
                checked={editedSettings.emailNotifications}
                onChange={(e) => handleToggleChange('emailNotifications', e.target.checked)}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                disabled={!isEditing}
              />
              <label htmlFor="email-notifications" className="ml-2 text-sm font-medium">
                Enable Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sms-notifications"
                checked={editedSettings.smsNotifications}
                onChange={(e) => handleToggleChange('smsNotifications', e.target.checked)}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                disabled={!isEditing}
              />
              <label htmlFor="sms-notifications" className="ml-2 text-sm font-medium">
                Enable SMS Notifications
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">System Settings</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="maintenance-mode"
                checked={editedSettings.maintenanceMode}
                onChange={(e) => handleToggleChange('maintenanceMode', e.target.checked)}
                className="h-4 w-4 text-destructive rounded border-gray-300 focus:ring-destructive"
                disabled={!isEditing}
              />
              <label htmlFor="maintenance-mode" className="ml-2 text-sm font-medium">
                Enable Maintenance Mode
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}