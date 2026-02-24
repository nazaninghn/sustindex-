# Contributing to SustIndex

Thank you for your interest in contributing to SustIndex! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## 🚀 Getting Started

### Prerequisites

- Python 3.10+ for backend
- Node.js 18+ for frontend
- Git for version control
- PostgreSQL (optional, for production-like development)

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sustindex-.git
   cd sustindex-
   ```

2. **Backend Setup**
   ```bash
   cd sustindex-
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.local.example .env.local
   # Edit .env.local with your backend URL
   npm run dev
   ```

## 🔄 Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

### Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our [coding standards](#coding-standards)

3. Test your changes:
   ```bash
   # Backend
   cd sustindex-
   python manage.py test
   
   # Frontend
   cd frontend
   npm run lint
   npm run build
   ```

4. Commit your changes with a [clear message](#commit-messages)

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a Pull Request

## 📝 Coding Standards

### Python (Backend)

- Follow [PEP 8](https://pep8.org/) style guide
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Keep functions small and focused
- Write tests for new features

Example:
```python
def calculate_esg_score(attempt):
    """
    Calculate ESG scores for a questionnaire attempt.
    
    Args:
        attempt: QuestionnaireAttempt instance
        
    Returns:
        dict: Dictionary with environmental, social, and governance scores
    """
    # Implementation
    pass
```

### TypeScript/React (Frontend)

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and reusable
- Use meaningful prop names

Example:
```typescript
interface ScoreCardProps {
  title: string;
  score: number;
  icon: string;
  color: string;
}

export function ScoreCard({ title, score, icon, color }: ScoreCardProps) {
  // Implementation
}
```

### General Guidelines

- Write self-documenting code
- Add comments for complex logic
- Keep files under 500 lines
- Remove unused imports and code
- Use consistent formatting

## 💬 Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Build process or auxiliary tool changes

### Examples

```
feat(questionnaire): add notes field to answers

- Add notes TextField to Answer model
- Update serializers to include notes
- Add textarea component in frontend

Closes #123
```

```
fix(auth): resolve token refresh issue

The refresh token was not being properly stored in localStorage,
causing users to be logged out prematurely.

Fixes #456
```

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventions
- [ ] No merge conflicts with main branch

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited in the changelog

## 🐛 Reporting Bugs

### Before Reporting

- Check if the bug has already been reported
- Verify the bug exists in the latest version
- Collect relevant information

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Python version: [e.g., 3.12]
- Node version: [e.g., 20.10]

**Additional context**
Any other relevant information
```

## 💡 Feature Requests

We welcome feature requests! Please:

1. Check if the feature has already been requested
2. Clearly describe the feature and its benefits
3. Provide examples or mockups if possible
4. Explain why this feature would be useful

## 📚 Documentation

- Update README.md for user-facing changes
- Update API_DOCUMENTATION.md for API changes
- Update ARCHITECTURE.md for architectural changes
- Add inline code comments for complex logic

## 🧪 Testing

### Backend Tests

```bash
cd sustindex-
python manage.py test

# Run specific test
python manage.py test questionnaire.tests.TestQuestionnaireAPI

# With coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend Tests

```bash
cd frontend
npm run lint
npm run build
```

## 📞 Getting Help

- Open an issue for bugs or feature requests
- Check existing documentation
- Review closed issues for similar problems

## 🎉 Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Credited in release notes
- Added to contributors list (if significant contribution)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to SustIndex! 🌱
