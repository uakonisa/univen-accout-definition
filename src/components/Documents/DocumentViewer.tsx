// 📄 DocumentViewer.tsx - Preview uploaded documents inline using iframe

import React from 'react';

interface DocumentViewerProps {
  url: string;
}

export default function DocumentViewer({ url }: DocumentViewerProps) {
  if (!url) return <p className="text-sm text-gray-400">No document available.</p>;

  return (
    <div className="border rounded-lg overflow-hidden shadow-md mt-2">
      <iframe
        src={url}
        className="w-full h-[500px]"
        title="Document Preview"
        frameBorder="0"
      />
    </div>
  );
}
