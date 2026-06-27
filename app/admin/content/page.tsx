import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Plus, Trash2, Edit3, FileText, Bell, Users } from 'lucide-react';
import { useState } from 'react';

export default function ContentPage() {
  // Simplified content management - in reality this would be more complex
  const [contentItems] = useState([
    {
      id: 'cont1',
      title: 'Welcome Banner',
      type: 'Banner',
      location: 'Home Page',
      status: 'active',
      updated: '2026-06-20',
    },
    {
      id: 'cont2',
      title: 'About Us Section',
      type: 'Text Block',
      location: 'About Page',
      status: 'active',
      updated: '2026-06-15',
    },
    {
      id: 'cont3',
      title: 'Contact Information',
      type: 'Contact Info',
      location: 'Footer',
      status: 'active',
      updated: '2026-06-10',
    },
    {
      id: 'cont4',
      title: 'Promotional Popup',
      type: 'Popup',
      location: 'Site-wide',
      status: 'scheduled',
      updated: '2026-06-25',
      schedule: '2026-07-01 to 2026-07-15',
    },
    {
      id: 'cont5',
      title: 'FAQ Update',
      type: 'FAQ Item',
      location: 'FAQ Page',
      status: 'draft',
      updated: '2026-06-18',
    }
  ]);

  const [selectedContent, setSelectedContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || item.type === filterType;

    return matchesSearch && matchesType;
  });

  const handleDeleteContent = (id) => {
    if (window.confirm('Are you sure you want to delete this content item?')) {
      // In a real app, this would call a server action
    }
  };

  const contentTypes = [
    { label: 'All Types', value: 'all' },
    { label: 'Banner', value: 'Banner' },
    { label: 'Text Block', value: 'Text Block' },
    { label: 'Contact Info', value: 'Contact Info' },
    { label: 'Popup', value: 'Popup' },
    { label: 'FAQ Item', value: 'FAQ Item' },
    { label: 'Testimonial', value: 'Testimonial' },
    { label: 'Blog Post', value: 'Blog Post' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">Content Management</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/admin/content/create" className="btn btn-primary">
            <Plus className="mr-2" /> Add Content
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-64"
            />
          </div>
          <div className="relative ml-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="select select-bordered w-48"
            >
              {contentTypes.map(type => (
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
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Updated
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredContent.length === 0 ? (
              <tr>
                <td colspan="6" className="py-8 text-center text-muted-foreground">
                  No content found matching your search.
                </td>
              </tr>
            ) : (
              filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5">
                  <td className="px-4 py-4 text-sm font-medium">{item.title}</td>
                  <td className="px-4 py-4 text-sm">{item.type}</td>
                  <td className="px-4 py-4 text-sm">{item.location}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      item.status === 'active'
                        ? 'bg-success/20 text-success'
                        : item.status === 'scheduled'
                        ? 'bg-info/20 text-info'
                        : item.status === 'draft'
                        ? 'bg-warning/20 text-warning'
                        : item.status === 'inactive'
                        ? 'bg-muted/20 text-muted'
                        : 'bg-destructive/20 text-destructive'
                    }`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">{item.updated}</td>
                  <td className="px-4 py-4 text-sm flex items-center space-x-3">
                    <Link href={`/admin/content/${item.id}`} className="btn btn-outline btn-sm p-2">
                      <Eye className="h-4 w-4" /> View
                    </Link>
                    <Link href={`/admin/content/${item.id}/edit`} className="btn btn-outline btn-sm p-2">
                      <Edit3 className="h-4 w-4" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteContent(item.id)}
                      className="btn btn-outline btn-sm p-2 text-destructive hover:bg-destructive/20"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredContent.length} of {contentItems.length} content items
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
    </div>
  );
}