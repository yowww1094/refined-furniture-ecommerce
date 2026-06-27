import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Bell, Users, MessageSquare, Mail, Search, Plus, Trash2, Edit3, ClipboardList } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const [notifications] = useState([
    {
      id: 'notif1',
      title: 'Summer Sale Promotion',
      type: 'promotional',
      status: 'sent',
      sentDate: '2026-06-20',
      recipientCount: 1245,
      content: 'Get ready for our summer sale! Enjoy up to 30% off selected items.',
    },
    {
      id: 'notif2',
      title: 'Order Confirmation Update',
      type: 'transactional',
      status: 'draft',
      sentDate: null,
      recipientCount: 0,
      content: 'Your order has been confirmed and is being processed.',
    },
    {
      id: 'notif3',
      title: 'New Collection Alert',
      type: 'announcement',
      status: 'scheduled',
      sentDate: '2026-06-28',
      recipientCount: 892,
      content: 'Our new Summer Collection is now available online and in stores.',
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const notificationTypes = [
    { label: 'All Types', value: 'all' },
    { label: 'Promotional', value: 'promotional' },
    { label: 'Transactional', value: 'transactional' },
    { label: 'Announcement', value: 'announcement' },
    { label: 'Update', value: 'update' }
  ];

  const statusLabels = {
    draft: { text: 'Draft', color: 'bg-warning/20 text-warning' },
    scheduled: { text: 'Scheduled', color: 'bg-info/20 text-info' },
    sending: { text: 'Sending', color: 'bg-primary/20 text-primary' },
    sent: { text: 'Sent', color: 'bg-success/20 text-success' },
    failed: { text: 'Failed', color: 'bg-destructive/20 text-destructive' }
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notif.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || notif.type === filterType;

    return matchesSearch && matchesType;
  });

  const handleComposeNotification = () => {
    setSelectedNotification({
      id: `new_${Date.now()}`,
      title: '',
      type: 'promotional',
      status: 'draft',
      sentDate: null,
      recipientCount: 0,
      content: ''
    });
    setShowComposeModal(true);
  };

  const handleSendNotification = () => {
    // In a real app, this would send the notification via a server action
    setSelectedNotification(null);
    setShowComposeModal(false);
    // Would refresh the notifications list
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleComposeNotification} variant="primary">
            <Plus className="mr-2" /> Compose Notification
          </Button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-64"
            Lietuv
          </div>
          <div className="relative ml-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="select select-bordered w-48"
            >
              {notificationTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Notification
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Sent Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Recipients
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredNotifications.length === 0 ? (
              <tr>
                <td colspan="6" className="py-8 text-center text-muted-foreground">
                  No notifications found matching your search.
                </td>
              </tr>
            ) : (
              filteredNotifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-primary/5">
                  <td className="px-4 py-4 flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full">
                        {notification.type === 'promotional' ? (
                          <Bell className="h-4 w-4" />
                        ) : notification.type === 'transactional' ? (
                          <MessageSquare className="h-4 w-4" />
                        ) : notification.type === 'announcement' ? (
                          <Users className="h-4 w-4" />
                        ) : (
                          <Mail className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.content.substring(0, 50)}...</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm capitalize">{notification.type}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusLabels[notification.status as keyof typeof statusLabels].color}`}>
                      {statusLabels[notification.status as keyof typeof statusLabels].text}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">{notification.sentDate || '-'}</td>
                  <td className="px-4 py-4 text-sm font-medium">{notification.recipientCount}</td>
                  <td className="px-4 py-4 text-sm flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedNotification(notification)}>
                      <Eye className="h-3 w-3" /> View
                    </Button>
                    {notification.status === 'draft' && (
                      <Button variant="outline" size="sm" onClick={() => /* handleEditNotification(notification.id) */ alert('Edit not implemented')}>
                        <Edit3 className="h-3 w-3" /> Edit
                      </Button>
                    )}
                    {notification.status === 'sent' && (
                      <Button variant="outline" size="sm" onClick={() => /* handleDuplicateNotification(notification.id) */ alert('Duplicate not implemented')}>
                        <Copy className="h-3 w-3" /> Duplicate
                      </Button>
                    )}
                    {notification.status === 'draft' && (
                      <Button variant="destructive" size="sm" onClick={() => /* handleDeleteNotification(notification.id) */ alert('Delete not implemented')}>
                        <Trash2 className="h-3 w-3" /> Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredNotifications.length} of {notifications.length} notifications
        </div>
        <div className="flex space-x-2">
          <button
            disabled={true}
            className="btn btn-outline btn-sm"
          >
            Previous
          </button>
          <button
            disabled={true}
            className="btn btn-outline btn-sm"
          >
            Next
          </button>
        </div>
      </div>

      {/* Compose Notification Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl p-6 bg-background rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">
                {selectedNotification ? 'Edit Notification' : 'Compose New Notification'}
              </h2>
              <Button variant="outline" onClick={() => setShowComposeModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              handleSendNotification();
            }}>
              <div className="space-y-2">
                <label htmlFor="notificationTitle" className="text-sm font-medium mb-1">
                  Notification Title
                </label>
                <input
                  type="text"
                  id="notificationTitle"
                  defaultValue={selectedNotification?.title || ''}
                  onChange={(e) => {
                    setSelectedNotification(prev => ({
                      ...prev,
                      title: e.target.value
                    }));
                  }}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="notificationType" className="text-sm font-medium mb-1">
                  Notification Type
                </label>
                <select
                  id="notificationType"
                  defaultValue={selectedNotification?.type || 'promotional'}
                  onChange={(e) => {
                    setSelectedNotification(prev => ({
                      ...prev,
                      type: e.target.value as any
                    }));
                  }}
                  className="select select-bordered w-full"
                >
                  {notificationTypes.map(type => (
                    <option key={type.value} value={type.value} disabled={type.value === 'all'}>
                      {type.label}
                    >
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="notificationContent" className="text-sm font-medium mb-1">
                  Notification Content
                </label>
                <textarea
                  id="notificationContent"
                  defaultValue={selectedNotification?.content || ''}
                  onChange={(e) => {
                    setSelectedNotification(prev => ({
                      ...prev,
                      content: e.target.value
                    }));
                  }}
                  className="textarea textarea-bordered w-full min-h-[96px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="notificationAudience" className="text-sm font-medium mb-1">
                  Target Audience
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="audience-all"
                      checked={true}
                      disabled
                    />
                    All Customers
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="audience-vip"
                      checked={false}
                    />
                    VIP Customers
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="audience-newsletter"
                      checked={false}
                    />
                    Newsletter Subscribers
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setShowComposeModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!(selectedNotification?.title && selectedNotification?.content)}>
                  Send Notification
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}