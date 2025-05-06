// 📊 dashboard.tsx - Protected dashboard for logged-in users

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import DocumentUploader from '@/components/Documents/DocumentUploader';
import DocumentViewer from '@/components/Documents/DocumentViewer';
import EmailShareButton from '@/components/Documents/EmailShareButton';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [documentUrl, setDocumentUrl] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) router.push('/login');
    else fetchAccounts();
  }, [user]);

  async function fetchAccounts() {
    const { data } = await supabase.from('account_definitions').select('*');
    setAccounts(data);
  }

  const filteredAccounts = accounts.filter(acc =>
    acc.account_code.includes(search) ||
    acc.account_name.toLowerCase().includes(search.toLowerCase()) ||
    acc.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between mb-4">
        <Input
          className="w-1/2"
          placeholder="Search by code, name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={signOut}>Logout</Button>
      </div>

      <DataTable
        columns={[
          { Header: 'Code', accessor: 'account_code' },
          { Header: 'Name', accessor: 'account_name' },
          { Header: 'Type', accessor: 'type' },
          { Header: 'Description', accessor: 'description' },
          {
            Header: 'Actions',
            Cell: ({ row }) => (
              <Button onClick={() => setSelectedAccount(row.original)}>View / Upload</Button>
            )
          }
        ]}
        data={filteredAccounts}
      />

      {selectedAccount && (
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-2">Documents for: {selectedAccount.account_name}</h3>
          <DocumentUploader
            accountId={selectedAccount.id}
            onUpload={(url) => setDocumentUrl(url)}
          />
          <DocumentViewer url={documentUrl} />
          <EmailShareButton documentUrl={documentUrl} />
        </div>
      )}
    </div>
  );
}
