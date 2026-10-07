# TASK 6.2 — VS Code Shortcuts and PEP8 Automation

## VS Code settings
The `.vscode/settings.json` file enables format-on-save, basic Python type checking and explicit save-time code actions.

## Custom shortcut
The `.vscode/keybindings.json` file maps:

`Ctrl + Alt + F` → Format Document

## Formatter and linter

```bash
pip install black ruff
black .
ruff check .
```

Install the official Python extension in VS Code as required by the lab environment.
