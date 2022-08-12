#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Step 1 - Use Prettier to check formatting.
npx prettier --check .

# Step 2 - Use ESLint to lint the TypeScript.
# Since all ESLint errors are set to warnings, we set max warnings to 0 so that warnings will fail
# in CI.
# Since the server and the mod have different linting configs, we must lint them separately.
cd "$DIR/packages/common"
npx eslint --max-warnings 0 .
cd "$DIR/packages/server"
npx eslint --max-warnings 0 .
cd "$DIR/packages/mod"
npx eslint --max-warnings 0 .
cd "$DIR"

# Step 3 - Spell check every file using CSpell.
# We use no-progress and no-summary because we want to only output errors.
npx cspell --no-progress --no-summary

# Step 4 - Check for unused imports.
# The "--error" flag makes it return an error code of 1 if unused exports are found.
# We must check each package separately since they have different tsconfig.json files.
cd "$DIR/packages/common"
npx ts-prune --error --ignore "index.ts"
cd "$DIR/packages/server"
npx ts-prune --error --ignore "index.ts"
cd "$DIR/packages/mod"
npx ts-prune --error --ignore "index.ts"
cd "$DIR"

# Step 5 - Check for orphaned words.
bash "$DIR/check-orphaned-words.sh"

# Step 6 - Check for base file updates.
bash "$DIR/check-file-updates.sh"

echo "Successfully linted in $SECONDS seconds."
