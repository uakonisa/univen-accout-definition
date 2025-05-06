// 📄 DocumentUploader.tsx - Upload docs to Supabase Storage and associate with accounts

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DocumentUploader({ accountId, onUpload }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !accountId) return;
    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const filePath = `account-documents/${accountId}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from('documents').upload(filePath, file);

    if (error) {
      alert('Error uploading file');
    } else {
      const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
      if (onUpload) onUpload(data.publicUrl);
    }

    setUploading(false);
    setFile(null);
  };

  return (
    <div className="space-y-2">
      <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload Document'}
      </Button>
    </div>
  );
}
