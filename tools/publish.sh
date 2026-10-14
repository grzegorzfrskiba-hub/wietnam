#!/bin/bash
# Prepares the public page for GitHub Pages: runs the tests, builds the page and puts site2/out/pages into docs/ (with
# .nojekyll, so Pages serves the files as they are), the folder Pages serves from the branch main. Nothing is sent: the
# commit of docs/ and git push are steps of their own, the push only with the owner's consent.
#   bash tools/publish.sh          then git add docs && git commit, and git push with consent
set -euo pipefail
cd "$(dirname "$0")/.."
bash tests/run.sh > /dev/null
python3 site2/build.py
rm -rf docs
cp -R site2/out/pages docs
touch docs/.nojekyll
echo "publish.sh: docs/ ready ($(du -sh docs | cut -f1)); next: git add docs && git commit, then git push with consent"
