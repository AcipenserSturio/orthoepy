#!/usr/bin/env sh

# Abort on errors
set -e

# Build
yarn build

# Navigate into the build output directory
cd dist

# Push build to the GitHub Pages
git init
git add -A
git commit -m 'Deploy'
git push -f git@github.com:suhary/russian.git master:gh-pages

# Navigate back
cd -
