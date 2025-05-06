// 🌍 index.tsx - Public-facing searchable view for new University of Venda account structure

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { supabase } from '@/lib/supabaseClient';

export default function PublicIndexPage() {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [prefix, setPrefix] = useState('');

  useEffect(() => {
    fetchPublicAccounts();
  }, []);

  async function fetchPublicAccounts() {
    const { data } = await supabase.from('account_definitions').select('*');
    setAccounts(data);
  }

  const filtered = accounts.filter(acc => {
    const text = `${acc.account_code} ${acc.account_name} ${acc.description ?? ''} ${acc.type}`.toLowerCase();
    const matchSearch = search.trim() === '' || text.includes(search.toLowerCase());
    const matchPrefix = prefix.trim() === '' || acc.account_code.startsWith(prefix);
    const matchType = typeFilter === 'ALL' || acc.type.toUpperCase() === typeFilter.toUpperCase();
    return matchSearch && matchPrefix && matchType;
  });

  return (
    <div className="min-h-screen bg-white p-6">
      <img src="/icons/univen-icon-192.png" alt="Univen Logo" className="mx-auto mb-4 w-24 h-24" />
      <h1 className="text-2xl font-bold text-center mb-2 text-gray-700">
        📘 University of Venda Account Definitions
      </h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        The University of Venda has adopted a new account structure. You may search any part of the code, name, type, or description.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          placeholder="Search any text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded-md text-sm"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="ALL">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
          <option value="ASSET">Asset</option>
          <option value="LIABILITY">Liability</option>
          <option value="EQUITY">Equity</option>
        </select>
        <Input
          placeholder="Account code starts with (e.g. 1 or 10...)"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={[
            { Header: 'Account Code', accessor: 'account_code' },
            { Header: 'Account Name', accessor: 'account_name' },
            { Header: 'Type', accessor: 'type' },
            { Header: 'Description', accessor: 'description' },
          ]}
          data={filtered}
        />
      </div>
    </div>
  );
}
