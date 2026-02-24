# GitHub Setup Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `sustindex` (or your preferred name)
3. Description: `Sustainability Assessment Platform - Django REST API + Next.js`
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, run these commands:

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sustindex.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Verify

1. Refresh your GitHub repository page
2. You should see all files uploaded
3. The README.md will be displayed on the repository homepage

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create sustindex --public --source=. --remote=origin --push
```

## Project Structure on GitHub

```
sustindex/
├── frontend/              # Next.js application
├── sustindex-/            # Django backend
├── README.md              # Project documentation
├── .gitignore             # Git ignore rules
└── package.json           # Root package file
```

## Important Notes

- The `.env` and `.env.local` files are NOT uploaded (they're in .gitignore)
- Database file `db.sqlite3` is NOT uploaded
- `node_modules/` folders are NOT uploaded
- Python `__pycache__/` folders are NOT uploaded

## Next Steps

After pushing to GitHub:

1. Add repository description and topics
2. Add a license if needed
3. Enable GitHub Pages if you want to host documentation
4. Set up GitHub Actions for CI/CD (optional)
5. Add collaborators if working in a team

## Deployment

- Backend: Already deployed on Render.com (https://sustindex.onrender.com)
- Frontend: Can be deployed on Vercel, Netlify, or other platforms

## Support

For issues or questions, open an issue on the GitHub repository.
