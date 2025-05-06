# 📘 University of Venda Account Definition System

A modern React + Supabase application for managing institutional account definitions (INCOME & EXPENSE) with full document upload, preview, and public search capabilities.

---

## 🛠 Features

- 🔐 Authenticated dashboard (Supabase Auth)
- 📥 Import/Export accounts
- 🧾 Add/edit/delete account definitions
- 📝 Attach notes and supporting documents
- 📄 Upload and preview documents inline
- ✉️ Share document via email using Resend.com API
- 🌍 Public read-only page with advanced search and filters

---

## 🧱 Tech Stack

- React (with TypeScript)
- Supabase (PostgreSQL, Storage, Auth)
- ShadCN UI (Tailwind UI components)
- Resend.com (Email API)

---

## 📦 Folder Structure

```
src/
├── components/
│   ├── Documents/
│   │   ├── DocumentUploader.tsx
│   │   ├── DocumentViewer.tsx
│   │   └── EmailShareButton.tsx
│   └── ui/...
├── pages/
│   ├── index.tsx        # Public page
│   ├── dashboard.tsx    # Authenticated main app
│   └── login.tsx
├── lib/
│   └── supabaseClient.ts
api/
└── send-email.js        # Resend.com integration
```

---

## 🧪 Local Development Setup

1. **Clone Repository**
   ```bash
   git clone https://your-repo-url
   cd univen-account-definition
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SMTP_USER=your-smtp-user (if nodemailer is used)
   SMTP_PASS=your-smtp-pass
   ```

4. **Set Up Supabase**
   - Run the SQL script from `/database/schema.sql`
   - Create a storage bucket named `documents` (public access enabled)

5. **Run Locally**
   ```bash
   npm run dev
   ```

---

## 🚀 Deployment

Recommended platforms: Vercel, Netlify, Supabase Hosting

- Ensure Resend.com API key (`re_...`) is configured in environment variables
- Supabase project must include auth & storage setup

---

## 📩 Email Sending

This app uses [Resend](https://resend.com/) for sending emails:

- Endpoint: `/api/send-email`
- Requires a Resend API key stored in backend env vars

---

## 📄 License

MIT License — Developed for University of Venda, South Africa 🇿🇦
