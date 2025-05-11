import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Contacts',
    href: '/contacts',
  },
];

interface Contact {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
}

export default function Contacts({ contacts }: { contacts: Contact[] }) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this contect?')) {
      router.delete(`/contacts/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Contacts" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <Link href="/contacts/create">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Contacts
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>All Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.id}</TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.mobile}</TableCell>
                        <TableCell>{contact.address}</TableCell>
                        <TableCell>
                          <Link href={`/contacts/${contact.id}/edit`}>
                            <Button variant="outline">
                              <EditIcon className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" onClick={() => handleDelete(contact.id)}>
                            <TrashIcon className="h-4 w-4 gap-0.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
