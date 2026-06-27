import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from '@/lib/i18n';

export default function AddressesPage() {
  const { t } = useTranslations();
  const [addresses, setAddresses] = useState([
    {
      id: 'addr1',
      label: 'Home',
      name: 'Younes Smith',
      street: '123 Rue de la Kasbah',
      apartment: 'Apt 4B',
      city: 'Marrakech',
      postalCode: '40000',
      country: 'Morocco',
      phone: '+212 6xx xxx xxx',
      isDefault: true
    },
    {
      id: 'addr2',
      label: 'Office',
      name: 'Younes Smith',
      street: '456 Avenue Mohammed V',
      apartment: '',
      city: 'Casablanca',
      postalCode: '20000',
      country: 'Morocco',
      phone: '+212 6xx xxx xxx',
      isDefault: false
    }
  ]);

  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    label: '',
    name: '',
    street: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'Morocco',
    phone: ''
  });

  const handleSaveAddress = (addressData) => {
    if (editingAddress) {
      // Update existing address
      setAddresses(prev =>
        prev.map(addr =>
          addr.id === editingAddress.id ? { ...editingAddress, ...addressData } : addr
        )
      );
      setEditingAddress(null);
    } else {
      // Add new address
      const newAddressObj = {
        id: `addr${Date.now()}`,
        ...addressData
      };
      setAddresses(prev => [...prev, newAddressObj]);
    }
    // Reset form
    setNewAddress({
      label: '',
      name: '',
      street: '',
      apartment: '',
      city: '',
      postalCode: '',
      country: 'Morocco',
      phone: ''
    });
  };

  const handleDeleteAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">{t('addresses.title')}</h1>
        <Button onClick={() => setNewAddress({
          label: '',
          name: '',
          street: '',
          apartment: '',
          city: '',
          postalCode: '',
          country: 'Morocco',
          phone: ''
        })}>
          {t('addresses.addAddress')}
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('addresses.noAddresses')}</p>
          <Button onClick={() => setNewAddress({
            label: '',
            name: '',
            street: '',
            apartment: '',
            city: '',
            postalCode: '',
            country: 'Morocco',
            phone: ''
          })} className="mt-4">
            {t('addresses.addFirstAddress')}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map(address => (
            <Card key={address.id} className="border relative">
              <CardHeader className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">{address.label}</h3>
                    <p className="text-sm text-muted-foreground">{address.isDefault ? t('addresses.defaultAddress') : ''}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!editingAddress || editingAddress.id !== address.id ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingAddress(address)}
                        className="p-1"
                      >
                        {t('actions.edit')}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteAddress(address.id)}
                        className="p-1"
                      >
                        {t('actions.delete')}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingAddress(null)}
                      className="p-1"
                    >
                      {t('actions.cancel')}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingAddress && editingAddress.id === address.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const addressData = {
                        label: formData.get('label') as string,
                        name: formData.get('name') as string,
                        street: filterValue);
          },
          [filterValue]
        );
      }, []);

      const filteredResults = filteredReports.slice(0, currentPage * PAGE_SIZE);

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Reports</h1>
            <Button onClick={() => {
                setOpenModal(true);
            }}>
          Add Report
        </Button>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium">
                    Stage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium">
                    Updated
                  </th>
                  <th scope="col" className="relative">
                    <div className="flex flex-col py-3">
                      <div className="-mr-2 flex items-center px-2">
                        Actions
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((report) => (
                  <tr
                    key={report.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {report.title}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {new Date(report.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="View report"
                          onClick={() => {
                            setSelectedReport(report);
                            setOpenModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4 text-gray-500 hover:text-gray-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Edit report"
                          onClick={() => {
                            setEditingReport(report);
                            setOpenModal(true);
                          }}
                        >
                          <Pencil className="h-4 w-4 text-gray-500 hover:text-gray-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Delete report"
                          onClick={() => {
                            setDeletingReportId(report.id);
                            setIsDeleting(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-gray-500 hover:text-gray-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredReports.length === 0 && filteredReports.length >= 0 && (
                  <tr>
                    <td className="px-6 py-4 text-center text-gray-500" colSpan={6}>
                      No reports found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              Showing {Math.min(filteredReports.length, currentPage * PAGE_SIZE)} of {
                filteredReports.length
              } reports
            </span>
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  setPage(Math.max(1, currentPage - 1));
                }}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  setPage(Math.min(totalPages, currentPage + 1));
                }}
                disabled={currentPage === totalPages}
              >
                Next
            </div>
          </div>

          {/* Add Report Modal */}
          <Dialog
            asChild
            open={openModal}
            onOpenChange={setOpenModal}
          >
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Add Report</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Create a new report for your project.
              </DialogDescription>
              <Divider className="my-4" />
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="title">Report Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter report title"
                    {...register('title')}
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label htmlFor="description">Report Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter report description"
                    rows={4}
                    {...register('description')}
                    className={errors.description ? 'border-destructive' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {!editingAddress || editingAddress.id !== address.id ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingAddress(address)}
                        className="p-1"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteAddress(address.id)}
                        className="p-1"
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingAddress(null)}
                      className="p-1"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingAddress && editingAddress.id === address.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const addressData = {
                        label: formData.get('label') as string,
                        name: formData.get('name') as string,
                        street: formData.get('street') as string,
                        apartment: formData.get('apartment') as string,
                        city: formData.get('city') as string,
                        postalCode: formData.get('postalCode') as string,
                        country: formData.get('country') as string,
                        phone: formData.get('phone') as string
                      };
                      handleSaveAddress(addressData);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`label-${address.id}`} className="text-sm font-medium mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          id={`label-${address.id}`}
                          value={editingAddress.label || ''}
                          onChange={(e) => setEditingAddress(prev => ({...prev, label: e.target.value}))}
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor={`name-${address.id}`} className="text-sm font-medium mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id={`name-${address.id}`}
                          value={editingAddress.name || ''}
                          onChange={(e) => setEditingAddress(prev => ({...prev, name: e.target.value}))}
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor={`street-${address.id}`} className="text-sm font-medium mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id={`street-${address.id}`}
                          value={editingAddress.street || ''}
                          onChange={(e) => setEditingAddress(prev => ({...prev, street: e.target.value}))}
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor={`apartment-${address.id}`} className="text-sm font-medium mb-1">
                          Apartment/Unit (optional)
                        </label>
                        <input
                          type="text"
                          id={`apartment-${address.id}`}
                          value={editingAddress.apartment || ''}
                          onChange={(e) => setEditingAddress(prev => ({...prev, apartment: e.target.value}))}
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`city-${address.id}`} className="text-sm font-medium mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id={`city-${address.id}`}
                            value={editingAddress.city || ''}
                            onChange={(e) => setEditingAddress(prev => ({...prev, city: e.target.value}))}
                            className="input input-bordered w-full"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor={`postalCode-${address.id}`} className="text-sm font-medium mb-1">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            id={`postalCode-${address.id}`}
                            value={editingAddress.postalCode || ''}
                            onChange={(e) => setEditingAddress(prev => ({...prev, postalCode: e.target.value}))}
                            className="input input-bordered w-full"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-end space-x-3">
                        <div>
                          <label htmlFor={`country-${address.id}`} className="text-sm font-medium mb-1 block">
                            Country
                          </label>
                          <input
                            type="text"
                            id={`country-${address.id}`}
                            value={editingAddress.country || 'Morocco'}
                            onChange={(e) => setEditingAddress(prev => ({...prev, country: e.target.value}))}
                            className="input input-bordered w-full"
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label htmlFor={`phone-${address.id}`} className="text-sm font-medium mb-1 block">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id={`phone-${address.id}`}
                            value={editingAddress.phone || ''}
                            onChange={(e) => setEditingAddress(prev => ({...prev, phone: e.target.value}))}
                            className="input input-bordered w-full"
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditingAddress(null)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          Save Address
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>{address.name}</strong>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.street}
                        {address.apartment ? `, ${address.apartment}` : ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.postalCode}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.country}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.phone}
                      </p>
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}