# Next.js Frontend Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Create Next.js Project

```bash
# Create new Next.js app with TypeScript
npx create-next-app@latest sustindex-frontend --typescript --tailwind --app --eslint

cd sustindex-frontend
```

## Install Required Packages

```bash
# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-label
npm install class-variance-authority clsx tailwind-merge lucide-react

# Form handling
npm install react-hook-form @hookform/resolvers zod

# API & State Management
npm install axios swr
npm install zustand

# Charts for dashboard
npm install recharts

# Date handling
npm install date-fns
```

## Project Structure

```
sustindex-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── questionnaire/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── results/
│   │       └── [id]/
│   │           └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── questionnaire/
│   │   ├── QuestionCard.tsx
│   │   └── ProgressBar.tsx
│   └── dashboard/
│       ├── ScoreCard.tsx
│       └── RecommendationsList.tsx
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── utils.ts
├── types/
│   └── index.ts
└── public/
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production:
```env
NEXT_PUBLIC_API_URL=https://sustindex.onrender.com/api/v1
NEXT_PUBLIC_SITE_URL=https://your-nextjs-domain.com
```

## API Client Setup

Create `lib/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`,
          { refresh: refreshToken }
        );
        
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

## Type Definitions

Create `types/index.ts`:

```typescript
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  membership_type: 'free' | 'silver' | 'gold';
  company_name: string;
  phone: string;
  created_at: string;
}

export interface Survey {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  total_questions: number;
  allow_multiple_attempts: boolean;
  show_results_immediately: boolean;
}

export interface Question {
  id: number;
  survey: number;
  category: number;
  category_name: string;
  text: string;
  order: number;
  allow_multiple: boolean;
  attachment?: string;
  choices: Choice[];
}

export interface Choice {
  id: number;
  text: string;
  score: number;
  order: number;
}

export interface QuestionnaireAttempt {
  id: number;
  user: number;
  user_name: string;
  survey: number;
  survey_name: string;
  started_at: string;
  completed_at?: string;
  is_completed: boolean;
  total_score: number;
  environmental_score: number;
  social_score: number;
  governance_score: number;
  overall_grade: string;
  recommendations: Recommendation[];
}

export interface Recommendation {
  category: string;
  priority: string;
  suggestion: string;
}
```

## Authentication Hook

Create `lib/auth.ts`:

```typescript
import { useState, useEffect } from 'react';
import api from './api';
import { User } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const response = await api.get('/users/me/');
        setUser(response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const response = await api.post('/auth/token/', { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    await checkAuth();
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return { user, loading, login, logout, checkAuth };
};
```

## Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Deployment Options

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

## Design System

Use shadcn/ui for consistent, beautiful components:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add tabs
```

## Key Features to Implement

1. **Authentication Pages**
   - Login form with JWT token handling
   - Registration form with validation
   - Password reset flow

2. **Dashboard**
   - User profile overview
   - Recent attempts list
   - Score visualization with charts
   - Recommendations display

3. **Questionnaire Flow**
   - Survey selection
   - Question-by-question interface
   - Progress tracking
   - Answer submission
   - Results page with detailed breakdown

4. **Responsive Design**
   - Mobile-first approach
   - Tablet and desktop layouts
   - Touch-friendly interactions

5. **Performance**
   - Server-side rendering (SSR)
   - Static generation where possible
   - Image optimization
   - Code splitting

## Next Steps

1. Set up the Next.js project
2. Configure Tailwind CSS theme
3. Install shadcn/ui components
4. Create authentication pages
5. Build dashboard layout
6. Implement questionnaire flow
7. Add charts and visualizations
8. Test API integration
9. Deploy to Vercel/Netlify
