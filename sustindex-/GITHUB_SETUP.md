# 🚀 GitHub Setup Guide

## Step 1️⃣: Create Repository on GitHub

1. Go to GitHub.com and login
2. Click the **"+"** button at the top right
3. Select **"New repository"**
4. Fill in the following information:
   - **Repository name**: `sustindex`
   - **Description**: `Corporate Sustainability Assessment Platform with multi-tier membership and e-learning`
   - Choose **Public** or **Private**
   - ⚠️ **Don't check anything** (no README, no .gitignore, no License)
5. Click **"Create repository"**

---

## Step 2️⃣: Connect to Repository

After creating the repository, GitHub will show you a page with commands.

### If your GitHub username is `YOUR_USERNAME`:

Run these commands in your terminal:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/sustindex.git

# Rename branch to main (optional)
git branch -M main

# Push your code
git push -u origin main
```

---

## Step 3️⃣: Complete Commands for You

```bash
# 1. Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/sustindex.git

# 2. Rename branch
git branch -M main

# 3. Push
git push -u origin main
```

---

## 🔐 If Asked for Username and Password:

### Method 1: Use Personal Access Token (Recommended)

1. Go to GitHub Settings
2. Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token
4. Give necessary permissions (repo)
5. Copy the token
6. When pushing, use the token instead of password

### Method 2: Use GitHub CLI

```bash
# Install GitHub CLI
# Download from https://cli.github.com/

# Login
gh auth login

# Push
git push -u origin main
```

---

## ✅ After Successful Push

Your repository will be available at:
```
https://github.com/YOUR_USERNAME/sustindex
```

---

## 📝 Useful Git Commands for Future

```bash
# Check status
git status

# Add new changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push changes
git push

# Pull changes (receive updates)
git pull

# View history
git log --oneline
```

---

## 🎯 Important Notes

1. ✅ `.gitignore` file added - unnecessary files won't be pushed
2. ✅ `venv/` and `db.sqlite3` are not in git
3. ✅ `__pycache__` and `*.pyc` are ignored
4. ✅ Complete and professional README.md is ready

---

## 🆘 Common Issues

### Issue: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/sustindex.git
```

### Issue: "failed to push"
```bash
git pull origin main --rebase
git push -u origin main
```

### Issue: Authentication failed
Use Personal Access Token instead of password

---

## 📦 What's Included in This Repository

- ✅ Complete Django project structure
- ✅ Multi-tier membership system (Free, Silver, Gold)
- ✅ Sustainability questionnaire with scoring
- ✅ E-learning platform for Gold members
- ✅ Multi-language support (English & Turkish)
- ✅ Responsive design for mobile and desktop
- ✅ Professional admin panel
- ✅ Complete documentation

---

Made with 💚 by Sustindex Team
