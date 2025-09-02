# 🚀 Development Setup Guide

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Git

## 🛠 Local Development Setup

### 1. Clone and Install

```bash
git clone https://github.com/uakonisa/univen-accout-definition.git
cd univen-accout-definition
npm install
```

### 2. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Update `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=your-resend-api-key
```

### 3. Database Setup

Run the SQL schema in your Supabase project:
```sql
-- See database/schema.sql for the complete schema
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sider)
│   ├── accounts/       # Account-related components
│   └── ui/            # Base UI components
├── pages/              # Page components
│   ├── LoginPage.tsx   # Authentication page
│   ├── DashboardPage.tsx # Main dashboard
│   └── PublicPage.tsx  # Public account viewer
├── lib/                # Utilities and configurations
│   └── supabaseClient.ts # Supabase client setup
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── utils/              # Helper functions
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Ant Design 5
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Email**: Resend.com API
- **Routing**: React Router v6

## 🔧 Development Tips

### Code Organization
- Use TypeScript for all new files
- Follow the existing folder structure
- Use Ant Design components consistently
- Implement proper error handling

### Supabase Integration
- All database queries should use the Supabase client
- Implement Row Level Security (RLS) policies
- Use real-time subscriptions where appropriate

### Styling
- Use Ant Design theme tokens
- Combine with Tailwind for custom styling
- Maintain responsive design principles

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `RESEND_API_KEY` | Resend.com API key for emails | Yes |

## 📝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **Build errors**: Check TypeScript types and imports
2. **Supabase connection**: Verify environment variables
3. **Styling issues**: Check Ant Design and Tailwind conflicts

### Getting Help

- Check the console for error messages
- Review Supabase logs for backend issues
- Ensure all dependencies are installed correctly
