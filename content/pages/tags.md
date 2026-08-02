---
title: Useful Tags & Snippets
description: Quick-reference tags and code snippets commonly used in our help channels, triggered via bot commands.
icon: tag
lastUpdated: February 2026
---

> These are some of the most commonly used tags in our server. You can trigger them using our bot commands for quick, helpful responses.

## General Python

### args-kwargs

These special parameters allow functions to take arbitrary amounts of positional (`*args`) and keyword (`**kwargs`) arguments. The names are convention, but the asterisks are what matter.

### async-await

Python provides the ability to run multiple tasks and coroutines simultaneously with the use of the `asyncio` library. This is crucial for Discord bots to remain responsive.

### codeblock

Please use codeblocks when sharing code!

```python
print("Hello World")
```

This makes your code readable and colorful.

### pep8

PEP 8 is the official style guide for Python. It includes guidelines for naming variables (`snake_case`), classes (`CamelCase`), and formatting code to be readable.

### venv -> Virtual Environments

Always use a virtual environment for your projects! It keeps dependencies isolated:

```bash
python -m venv .venv
```

---

## Discord.py / Nextcord

### intents

Intents are a feature of Discord that tells the gateway exactly which events to send your bot. You must enable them in the Developer Portal **and** in your code.

### cogs

Cogs allow you to organize your bot's commands into different files (classes). This is essential for keeping large bots maintainable.

---

## Common Pitfalls

### mutable-default-args

Avoid using mutable objects (like lists or dicts) as default arguments in functions. They are created only *once* when the function is defined, not every time it runs.

### xy-problem

Please ask about your *actual problem*, not just the solution you are attempting. Often there is a better way to solve the root issue.

> For a deeper explanation, see [xyproblem.info](https://xyproblem.info/).
