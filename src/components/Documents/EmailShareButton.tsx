// 📤 EmailShareButton.tsx - Send document link to recipient email address

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EmailShareButtonProps {
  documentUrl: string;
}

export default function EmailShareButton({ documentUrl }: EmailShareButtonProps) {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    setSending(true);
    setSuccess(false);

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, url: documentUrl })
    });

    if (response.ok) {
      setSuccess(true);
      setEmail('');
    }
    setSending(false);
  };

  return (
    <div className="space-y-2 mt-4">
      <Input
        type="email"
        placeholder="Recipient email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSend} disabled={sending || !email}>
        {sending ? 'Sending...' : 'Share via Email'}
      </Button>
      {success && <p className="text-green-600 text-sm">Email sent successfully.</p>}
    </div>
  );
}
