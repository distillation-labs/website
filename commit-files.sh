#!/bin/bash

# Script to commit files one by one (including files inside directories)
# Usage: ./commit-files.sh [commit-message-prefix]
# Example: ./commit-files.sh "Initial commit"

set -e

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
fi

COMMIT_PREFIX="${1:-Add}"

# Get all files (not directories) using find, respecting .gitignore
FILES=$(git ls-files --others --exclude-standard | sort)

if [ -z "$FILES" ]; then
  echo "No files to commit."
  exit 0
fi

TOTAL=$(echo "$FILES" | wc -l | tr -d ' ')
echo "Found $TOTAL files to commit:"
echo "$FILES"
echo ""
echo "Starting individual commits..."
echo ""

COUNT=0

while IFS= read -r file; do
  COUNT=$((COUNT + 1))
  echo "[$COUNT/$TOTAL] Committing: $file"
  
  git add "$file"
  
  # Use full relative path for commit message
  COMMIT_MSG="$COMMIT_PREFIX: $file"
  
  git commit -m "$COMMIT_MSG" || echo "  (skipped - already committed or no changes)"
  echo "  ✓ Committed: $COMMIT_MSG"
  echo ""
done <<< "$FILES"

echo "Done! All $COUNT files committed individually."
echo ""
echo "To push: git remote add origin <url> && git push -u origin main"
