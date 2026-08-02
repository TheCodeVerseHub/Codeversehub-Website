---
title: Contribution Guide
description: Everything you need to know about contributing to CodeVerse Hub open-source projects from first issue to merged PR.
icon: hand-heart
lastUpdated: March 2026
---

> Thank you for your interest in contributing to **The CodeVerse Hub**. Every line of code, documentation fix, or bug report makes a difference. We welcome all contributors regardless of experience level.

---

## Table of Contents

- [Who Can Contribute](#who-can-contribute)
- [Repositories](#repositories)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code Style](#code-style)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Documentation Contributions](#documentation-contributions)
- [Contributor Recognition](#contributor-recognition)
- [Code of Conduct](#code-of-conduct)

---

## Who Can Contribute

Anyone can contribute. You do not need years of experience or a computer science degree.

- **Beginners** -> good first issues are labelled `good first issue`
- **Experienced devs** -> tackle open bugs and feature requests
- **Designers** -> improve UI/UX, icons, and assets
- **Writers** -> fix typos, improve docs, or write guides
- **DevOps** -> help with CI/CD, workflows, and automation

> If you're unsure where to start, hop into our [Discord server](https://discord.gg/3xKFvKhuGR) and ask in `#contributing`.

---

## Repositories

| Repository | Description | Stack |
|---|---|---|
| [cvh_web](https://github.com/TheCodeVerseHub/cvh_web) | This website | Next.js, TypeScript, Tailwind |
| [CodeVerse-Bot](https://github.com/TheCodeVerseHub/CodeVerse-Bot) | Main Discord bot | Python, discord.py |
| [Eigen-Bot](https://github.com/TheCodeVerseHub/Eigen-Bot) | Utility & moderation bot | Python |
| [ModMail-Bot](https://github.com/TheCodeVerseHub/ModMail-Bot) | Community modmail system | Python |
| [CodeVerseLinuxDistro](https://github.com/TheCodeVerseHub/CodeVerseLinuxDistro) | CVH Linux distribution | Shell, configs |

---

## Getting Started

### 1. Find something to work on

- Browse [open issues](https://github.com/TheCodeVerseHub) across our repositories
- Look for labels: `good first issue`, `bug`, `enhancement`, `documentation`
- Comment on an issue to claim it before starting work

### 2. Fork and clone

```bash
# Fork via GitHub UI, then:
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME
```

### 3. Set up the upstream remote

```bash
git remote add upstream https://github.com/TheCodeVerseHub/REPO_NAME.git
git fetch upstream
```

### 4. Install dependencies

Follow the instructions in each repo's `README.md`. For this website:

```bash
npm install
npm run dev
```

### 5. Create a branch

```bash
git checkout -b type/short-description
# Examples:
# fix/navbar-mobile-overflow
# feat/dark-mode-toggle
# docs/update-resources-page
```

---

## Development Workflow

```bash
# Keep your fork up to date
git fetch upstream
git rebase upstream/master

# Make your changes, then stage and commit
git add .
git commit -m "feat: add language switcher to terminal widget"

# Push and open a pull request
git push origin feat/language-switcher
```

> Never commit directly to `master`. Always use a feature branch.

---

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description
```

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, whitespace |
| `refactor` | Code cleanup without behaviour change |
| `test` | Adding or fixing tests |
| `chore` | Tooling, CI, dependencies |

**Examples:**

```
feat(bot): add /ping command
fix(web): resolve hydration error on stats page
docs: update contributing guide
chore: bump next to 15.2
```

---

## Pull Request Guidelines

Before submitting:

- [ ] Your branch is rebased onto the latest `upstream/master`
- [ ] Your code builds without errors (`npm run build` or equivalent)
- [ ] Existing tests pass (if any)
- [ ] You've added/updated docs if needed
- [ ] PR title follows the commit convention
- [ ] PR description explains **what**, **why**, and links the related issue

**PR template:**

```markdown
## What does this PR do?

## Related Issue
Closes #

## Screenshots (if UI change)

## Checklist
- [ ] Builds successfully
- [ ] No unrelated changes
- [ ] Follows code style
```

> Reviewers may request changes. This is normal and part of the process please don't take it personally.

---

## Code Style

- Follow the style of the existing codebase
- Run the linter before committing: `npm run lint`
- Use meaningful variable names avoid `x`, `tmp`, `data` on their own
- Keep functions small and focused
- Comment non-obvious logic, but prefer readable code over comments
- No commented-out dead code in PRs

For Python repos:
- Follow [PEP 8](https://pep8.org/)
- Use type hints where practical

For TypeScript/Next.js:
- Prefer functional components and hooks
- Use `const` over `let` where possible
- Keep components under ~200 lines split if larger

---

## Reporting Bugs

1. Check if the bug is already reported in Issues
2. If not, open a new issue using the **Bug Report** template
3. Include:
   - Steps to reproduce
   - Expected behaviour
   - Actual behaviour
   - Screenshots or logs if applicable
   - Environment details (OS, browser, Node version, etc.)

---

## Suggesting Features

1. Open an issue using the **Feature Request** template
2. Clearly describe:
   - The problem you're solving
   - Your proposed solution
   - Alternative approaches you considered
3. Wait for maintainer approval before building to avoid wasted effort

---

## Documentation Contributions

Documentation lives in `content/pages/` as Markdown files. To improve docs:

- Fix typos, grammar, or unclear wording
- Add missing steps or examples
- Keep language clear and beginner-friendly
- Use code blocks with language identifiers

```markdown
\```python
print("Use language identifiers!")
\```
```

---

## Contributor Recognition

All meaningful contributions are:

- **Credited** in the project's changelog
- **Recognised** on our website's contributors section (coming soon)
- **Rewarded** with the `@Contributors` role on the CodeVerse Hub Discord

We believe every contribution even a typo fix matters.

---

## Code of Conduct

All contributors are expected to follow our [Code of Conduct](/pages/code-of-conduct).

TL;DR:
- Be kind and respectful
- No harassment, gatekeeping, or elitism
- Constructive criticism only
- We're all here to learn and build

Violations may result in removal from the project and the Discord server.

---

## Questions?

- Open a **GitHub Discussion** in the relevant repository
- Ask in the `#contributing` channel on [Discord](https://discord.gg/3xKFvKhuGR)

> We're happy to help. Don't be afraid to ask.
