#!/bin/bash
# Sync current branch to GitHub

OWNER="wghtkbpxwx-a11y"
REPO="Grok-model-"
BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "Syncing branch $BRANCH to GitHub..."

# For each commit not yet in GitHub, we would need to push
# Since direct git push doesn't work, we'll document this as a manual step

echo "To sync changes to GitHub, run:"
echo ""
echo "  # From your local machine:"
echo "  git remote add github-direct https://github.com/$OWNER/$REPO.git"
echo "  git push github-direct $BRANCH"
echo ""
echo "Or use GitHub CLI:"
echo "  gh repo clone $OWNER/$REPO && cd $REPO"
echo "  git fetch origin $BRANCH && git checkout $BRANCH"

