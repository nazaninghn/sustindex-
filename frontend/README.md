# Sustindex Frontend - Next.js

Modern, beautiful frontend for Sustindex sustainability assessment platform built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Backend Django server running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── HeroSection.tsx     # Hero section with dashboard preview
│   ├── FeaturesSection.tsx # Features showcase
│   ├── MethodologySection.tsx # Assessment methodology
│   └── Footer.tsx          # Footer
├── public/                 # Static assets
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Dependencies
```

## 🎨 Features

- ⚡ **Next.js 14** with App Router
- 🎭 **Framer Motion** for smooth animations
- 🎨 **Tailwind CSS** for styling
- 📱 **Fully Responsive** design
- 🌐 **Multi-language** support (EN/TR)
- 🔗 **API Integration** ready with Django backend

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production:
```env
NEXT_PUBLIC_API_URL=https://sustindex.onrender.com/api/v1
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🏗️ Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

## 🎯 Current Implementation

✅ Home page with:
- Modern navigation bar
- Hero section with animated dashboard preview
- Features showcase
- Methodology explanation
- Footer

🔗 Links to Django backend for:
- Login (`/en/accounts/login/`)
- Register (`/en/accounts/register/`)

## 📝 Next Steps

To complete the frontend:

1. **Authentication Pages**
   - Login page with JWT
   - Registration page
   - Password reset

2. **Dashboard**
   - User profile
   - Attempts history
   - Score visualization

3. **Questionnaire**
   - Survey selection
   - Question flow
   - Answer submission
   - Results page

4. **API Integration**
   - Axios client setup
   - Authentication hooks
   - Data fetching with SWR

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios (ready to use)

## 📦 Dependencies

```json
{
  "next": "14.1.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^11.0.3",
  "lucide-react": "^0.316.0",
  "axios": "^1.6.5",
  "tailwindcss": "^3.3.0",
  "typescript": "^5"
}
```

## 🎨 Design System

### Colors
- Primary: `#1F7A63` (Green)
- Neutral: `#2E2E2E` (Dark Gray)
- Accent: `#4C6EF5` (Blue)
- Success: `#28A745` (Green)
- Warning: `#FF6B35` (Orange)
- Gold: `#FFD700` (Gold)

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Integration with Django Backend

The frontend connects to Django backend at:
- Development: `http://localhost:8000`
- Production: `https://sustindex.onrender.com`

Backend provides:
- REST API at `/api/v1/`
- Authentication endpoints
- Survey and questionnaire data
- User management

## 📄 License

Same as main project
