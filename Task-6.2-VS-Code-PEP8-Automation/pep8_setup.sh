#!/bin/bash
# TASK 6.2 — Install formatter/linter and check Python code

python -m pip install black ruff

black .
ruff check .
