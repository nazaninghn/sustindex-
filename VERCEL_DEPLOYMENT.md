# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier works)
- Repository pushed to GitHub

## Deployment Steps

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `nazaninghn/sustindex-`
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://sustindex.onrender.com/api/v1
   ```
   
   Or use your own backend URL.

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at: `https://your-project.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - Project name? `sustindex` (or your choice)
   - Directory? `./`
   - Override settings? `N`

5. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   ```
   Enter: `https://sustindex.onrender.com/api/v1`

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Environment Variables
- Go to Project Settings → Environment Variables
- Add/Edit variables
- Redeploy for changes to take effect

### Automatic Deployments
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests

## Troubleshooting

### Build Fails
```bash
# Check build locally first
cd frontend
npm run build
```

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings in Django backend
- Ensure backend allows Vercel domain

### Missing Dependencies
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Vercel Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### .vercelignore
```
node_modules
.next
.env.local
.DS_Store
*.log
```

## Performance Optimization

### Image Optimization
- Vercel automatically optimizes images
- Use Next.js `<Image>` component

### Caching
- Static pages cached at edge
- API routes cached based on headers

### Analytics
- Enable Vercel Analytics in dashboard
- Monitor performance and usage

## Useful Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]

# Open project in browser
vercel open
```

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: https://github.com/nazaninghn/sustindex-/issues

---

**Note**: Free tier includes:
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Global CDN
- Preview deployments

For production use, consider upgrading to Pro tier for better performance and support.
