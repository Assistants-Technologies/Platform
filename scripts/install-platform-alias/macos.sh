#!/usr/bin/env bash
set -euo pipefail

# Resolve repo root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_SCRIPT="$SCRIPT_DIR/../cli.sh"

if [ ! -f "$TARGET_SCRIPT" ]; then
  echo "❌ ERROR: cli.sh not found at $TARGET_SCRIPT"
  exit 1
fi

# Ensure cli.sh is executable
chmod +x "$TARGET_SCRIPT"

# Alias line
ALIAS_CMD="alias platform=\"$TARGET_SCRIPT\""

# Add alias to zshrc
if [ -f "$HOME/.zshrc" ]; then
  if ! grep -Fxq "$ALIAS_CMD" "$HOME/.zshrc"; then
    echo "$ALIAS_CMD" >> "$HOME/.zshrc"
    echo "✅ Added alias 'platform' to ~/.zshrc"
  else
    echo "ℹ️ Alias 'platform' already exists in ~/.zshrc"
  fi
fi

# Add alias to bashrc
if [ -f "$HOME/.bashrc" ]; then
  if ! grep -Fxq "$ALIAS_CMD" "$HOME/.bashrc"; then
    echo "$ALIAS_CMD" >> "$HOME/.bashrc"
    echo "✅ Added alias 'platform' to ~/.bashrc"
  else
    echo "ℹ️ Alias 'platform' already exists in ~/.bashrc"
  fi
fi

echo ""
echo "⚡ To activate immediately, run:"
echo "    source ~/.zshrc    # if you use zsh"
echo "    source ~/.bashrc   # if you use bash"
echo ""
echo "Then you can use:"
echo "    platform up --build"
echo "    platform restart"
echo "    platform logs"