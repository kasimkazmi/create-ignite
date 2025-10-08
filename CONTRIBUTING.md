# Contributing to CREATE IGNITE

First off, thank you for considering contributing to CREATE IGNITE! 🎉

## 🤝 Ways to Contribute

- 🐛 **Report bugs** - Open an issue
- 💡 **Suggest features** - Share your ideas
- 📝 **Improve docs** - Fix typos, add examples
- 🧪 **Write tests** - Increase coverage
- ♻️ **Refactor code** - Improve code quality
- 🎨 **Add templates** - Support more frameworks

## 🚀 Getting Started

### Development Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/kasimkazmi/create-ignite.git
cd create-ignite

# 2. Install dependencies
npm install

# 3. Link for local testing
npm link

# 4. Test CLI locally
create-ignite
```

### Project Structure

```
create-ignite/
├── bin/              # CLI entry point
├── utils/            # Core utilities
├── templates/        # Project templates
├── tests/            # Unit tests
└── scripts/          # Build scripts
```

## 📝 Coding Guidelines

### Code Style

- Use ES Modules (`import`/`export`)
- Follow existing code style
- Add JSDoc comments for functions
- Use meaningful variable names
- Keep functions small and focused

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add support for Svelte
fix: resolve npm install timeout issue
docs: update README with new examples
refactor: simplify error handling logic
test: add unit tests for validators
chore: update dependencies
```

## 🔄 Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** with clear messages
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push** to your fork
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open** a Pull Request

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated if needed
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run linter
npm run lint

# Format code
npm run format
```

## 📖 Adding a New Framework

To add support for a new framework:

1. Add framework constant in `utils/constants.js`
2. Create scaffolding function in `utils/scaffolder.js`
3. Add framework dependencies in `utils/installer.js`
4. Create templates in `templates/YOUR_FRAMEWORK/`
5. Add setup logic in `utils/setupFramework.js`
6. Update README with new framework info

## 🐛 Reporting Bugs

When reporting bugs, please include:

- **Description** - Clear description of the bug
- **Steps to Reproduce** - How to reproduce the issue
- **Expected Behavior** - What should happen
- **Actual Behavior** - What actually happens
- **Environment** - Node version, OS, etc.
- **Screenshots** - If applicable

## 💡 Suggesting Features

When suggesting features:

- Check if the feature already exists
- Explain the use case
- Describe the proposed solution
- Consider alternatives
- Be open to discussion

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make CREATE IGNITE better for everyone!

---

**Questions?** Feel free to ask in [Discussions](https://github.com/kasimkazmi/create-ignite/discussions) or open an issue.

