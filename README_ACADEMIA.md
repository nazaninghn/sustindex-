# 🌱 SustIndex Academia - Frontend Repository

This repository contains the **Next.js frontend** for the SustIndex sustainability assessment platform.

> **Note**: This is an alternative/academic version. The main full-stack repository is at [nazaninghn/sustindex-](https://github.com/nazaninghn/sustindex-)

## 🔗 Repository Structure

- **Backend (Django)**: [nazaninghn/sustindex-](https://github.com/nazaninghn/sustindex-) - Main repository with both backend and frontend
- **Frontend Only**: This repository - Alternative frontend-only version for academic/demo purposes

## 📦 What's in This Repository

This repository contains:
- Next.js 14 frontend application
- TypeScript configuration
- Tailwind CSS styling
- API client for connecting to backend
- All frontend pages and components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Backend API running (see [backend repository](https://github.com/nazaninghn/sustindex-))

### Installation

```bash
# Clone this repository
git clone https://github.com/nazaninghn/sustindex-academia.git
cd sustindex-academia

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local and set your backend URL
# NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Run development server
npm run dev
```

The application will be available at http://localhost:3000

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
# Backend API URL (include /api/v1 path)
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# For production
# NEXT_PUBLIC_API_URL=https://your-backend-url.com/api/v1
```

## 📚 Documentation

For complete documentation, see the main repository:
- [Architecture](https://github.com/nazaninghn/sustindex-/blob/main/ARCHITECTURE.md)
- [API Documentation](https://github.com/nazaninghn/sustindex-/blob/main/sustindex-/API_DOCUMENTATION.md)
- [Database Schema](https://github.com/nazaninghn/sustindex-/blob/main/DATABASE_SCHEMA.md)

## 🎯 Features

- 12 responsive pages
- JWT authentication with auto-refresh
- Interactive questionnaire with progress tracking
- File upload interface
- Real-time form validation
- ESG scores visualization
- Assessment history
- User profile management

## 🛠️ Tech Stack

- Next.js 14.1.0
- React 18
- TypeScript 5
- Tailwind CSS 3.4
- Axios 1.6
- Font Awesome 6

## 📝 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🔗 Related Links

- **Main Repository**: https://github.com/nazaninghn/sustindex-
- **Backend API**: https://sustindex.onrender.com
- **API Documentation**: https://sustindex.onrender.com/api/v1/swagger/

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 🤝 Contributing

This is an academic/demo repository. For contributions, please use the main repository:
https://github.com/nazaninghn/sustindex-

## 📧 Contact

For questions or issues, please open an issue in the main repository.

---

**Note**: This repository is maintained as a frontend-only version for academic and demonstration purposes. For the complete full-stack application with both backend and frontend, please use the main repository at [nazaninghn/sustindex-](https://github.com/nazaninghn/sustindex-).
