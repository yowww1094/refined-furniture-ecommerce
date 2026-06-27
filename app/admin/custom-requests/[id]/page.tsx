import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { CheckCircle2, Trash2, UserPlus, MessageSquare, Mail, Clock, Upload, Settings } from 'lucide-react';
import { useState } from 'react';

export default function CustomRequestDetailPage({ params }: { params: { id: string } }) {
  // Mock custom request data - in a real app, this would come from Supabase
  const mockRequest = {
    id: 'req1',
    furnitureType: 'Dining Table',
    customerName: 'Younes Smith',
    customerEmail: 'younes@example.com',
    customerPhone: '+212 6xx xxx xxx',
    date: '2026-06-20',
    budget: { min: 15000, max: 20000, currency: 'MAD' },
    status: 'reviewing',
    materials: ['Walnut', 'Brass', 'Leather'],
    dimensions: { length: 200, width: 100, height: 75, unit: 'cm' },
    description: 'Custom dining table for 8 people with live edge, matching benches, and brass inlay details.',
    pinterestUrls: [
      'https://pin.it/abc123',
      'https://pin.it/def456'
    ],
    files: [
      { name: 'room_measurements.pdf', size: '2.4 MB', type: 'application/pdf' },
      { name: 'design_sketch.jpg', size: '1.8 MB', type: 'image/jpeg' }
    ],
    timeline: [
      { date: '2026-06-20T10:30:00Z', status: 'received', description: 'Request received', icon: 'Upload' },
      { date: '2026-06-20T14:15:00Z', status: 'reviewing', description: 'Artisan reviewing request', icon: 'Settings' }
    ],
    notes: [
      {
        id: 'note1',
        author: 'Yussef (Artisan)',
        date: '2026-06-20T16:30:00Z',
        content: 'Customer prefers darker walnut stain. Need to confirm dimensions for dining room space.',
        isInternal: true
      },
      {
        id: 'note2',
        author: 'Younes Smith (Customer)',
        date: '2026-06-20T19:45:00Z',
        content: 'Please see attached measurements and inspiration photos. Looking forward to your feedback!',
        isInternal: false
      }
    ]
  };

  const [selectedRequest, setSelectedRequest] = useState(mockRequest);
  const [newNote, setNewNote] = useState('');
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [quotationAmount, setQuotationAmount] = useState('');

  // Filter timeline and notes based on request data
  const timeline = selectedRequest.timeline || [];
  const notes = selectedRequest.notes || [];

  const handleAddNote = () => {
    if (newNote.trim()) {
      const newNoteObj = {
        id: `note${Date.now()}`,
        author: 'You (Admin)',
        date: new Date().toISOString(),
        content: newNote,
        isInternal: true
      };
      setSelectedRequest(prev => ({
        ...prev,
        notes: [...prev.notes, newNoteObj]
      }));
      setNewNote('');
    }
  };

  const handleSendQuotation = () => {
    if (quotationAmount.trim()) {
      // In a real app, this would update the request status and send notification
      setSelectedRequest(prev => ({
        ...prev,
        status: 'quotation_sent',
        timeline: [
          ...prev.timeline,
          {
            date: new Date().toISOString(),
            status: 'quotation_sent',
            description: `Quotation sent for ${quotationAmount} ${prev.budget.currency}`,
            icon: 'Mail'
          }
        ]
      }));
      setShowQuotationModal(false);
      setQuotationAmount('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">Custom Request #{(selectedRequest.id || '').slice(-3)}</h1>
        <div className="flex items-center space-x-3">
          <Link href="/admin/custom-requests" className="btn btn-outline">
            ← Back to Requests
          </Link>
          <Button onClick={() => setShowQuotationModal(true)}
                  variant={selectedRequest.status === 'quotation_sent' ? 'secondary' : 'outline'}
                  disabled={selectedRequest.status === 'quotation_sent' || selectedRequest.status === 'accepted' || selectedRequest.status === 'completed'}>
            Send Quotation
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2" /> Message Customer
          </Button>
        </div>
      </div>

      {/* Request Overview Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Request Overview</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2">Furniture Type</h3>
                <p className="text-sm text-muted-foreground">{selectedRequest.furnitureType}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Customer</h3>
                <div className="flex items-center space-x-3">
                  <UserPlus className="h-4 w-4" />
                  <div>
                    <p className="font-medium">{selectedRequest.customerName}</p>
                    <p className="text-xs text-muted-foreground">{selectedRequest.customerEmail}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Date Received</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedRequest.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Budget Range</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedRequest.budget.min.toLocaleString()} - {selectedRequest.budget.max.toLocaleString()} {selectedRequest.budget.currency}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Status</h3>
                <p className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedRequest.status === 'received' || selectedRequest.status === 'reviewing'
                    ? 'bg-primary/20 text-primary'
                    : selectedRequest.status === 'quotation_sent'
                    ? 'bg-warning/20 text-warning'
                    : selectedRequest.status === 'accepted'
                    ? 'bg-success/20 text-success'
                    : selectedRequest.status === 'in_production'
                    ? 'bg-info/20 text-info'
                    : selectedRequest.status === 'completed'
                    ? 'bg-success/20 text-success'
                    : 'bg-destructive/20 text-destructive'
                }`}>
                  {selectedRequest.status
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Materials</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedRequest.materials.map((material, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted/20 text-muted-foreground">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium mb-2">Dimensions</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedRequest.dimensions.length} × {selectedRequest.dimensions.width} × {selectedRequest.dimensions.height} {selectedRequest.dimensions.unit}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Description</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{selectedRequest.description}</p>
        </CardContent>
      </Card>

      {/* Inspiration & Files Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Inspiration & Files</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(selectedRequest.pinterestUrls || []).length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Pinterest Inspiration</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.pinterestUrls.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/20 text-primary hover:bg-primary/30"
                    >
                      Pin {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {(selectedRequest.files || []).length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Uploaded Files</h3>
                <div className="space-y-2">
                  {selectedRequest.files.map((file, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                          {file.type === 'application/pdf' ? 'PDF' : 'IMG'}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.size} • {file.type.split('/')[0].toUpperCase()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Timeline</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border-l-2 border-primary/20">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full">{event.icon}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-font-semibold">{event.status
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}</h3>
                    <time className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleString()}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Notes & Communication</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className={`flex items-start space-x-3 p-3 border-l-2 ${
                note.isInternal ? 'border-primary/20 bg-primary/5' : 'border-success/20 bg-success/5'
              } rounded-lg`}>
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full">
                    {note.isInternal ? '👥' : '👤'}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-font-semibold">{note.author}</h3>
                      <span className={`px-1 py-0.5 rounded-full text-xs ${
                        note.isInternal ? 'bg-primary/20 text-primary' : 'bg-success/20 text-success'
                      }`}>
                        {note.isInternal ? 'Internal' : 'Customer'}
                      </span>
                    </div>
                    <time className="text-xs text-muted-foreground">
                      {new Date(note.date).toLocaleString()}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">{note.content}</p>
                </div>
              </div>
            ))}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Add Note</h3>
              <form className="space-y-3" onSubmit={(e) => {
                e.preventDefault();
                handleAddNote();
              }}>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note about this request..."
                  className="textarea textarea-bordered w-full min-h-[96px]"
                />
                <div className="flex justify-end space-x-3">
                  <Button type="button" variant="outline" onClick={() => setNewNote('')}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!newNote.trim()}>
                    Add Note
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quotation Modal */}
      {showQuotationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-background rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Send Quotation</h2>
              <Button variant="outline" onClick={() => setShowQuotationModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              handleSendQuotation();
            }}>
              <div className="space-y-2">
                <label htmlFor="quotationAmount" className="text-sm font-medium mb-1">
                  Quotation Amount ({selectedRequest.budget.currency})
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    id="quotationAmount"
                    value={quotationAmount}
                    onChange={(e) => setQuotationAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="input input-bordered w-full"
                    min="0"
                    step="1"
                    required
                  />
                </div>
                {quotationAmount && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Customer budget: {selectedRequest.budget.min.toLocaleString()} - {selectedRequest.budget.max.toLocaleString()} {selectedRequest.budget.currency}
                  </p>
                )}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setShowQuotationModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!quotationAmount}>
                  Send Quotation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}