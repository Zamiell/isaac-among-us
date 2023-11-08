#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the repository:
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
REPO_NAME="$(basename "$DIR")"

SECONDS=0

cd "$DIR"

# Use Prettier to check formatting.
# "--log-level=warn" makes it only output errors.
npx prettier --log-level=warn --check .

# Use ESLint to lint the TypeScript.
# "--max-warnings 0" makes warnings fail in CI, since we set all ESLint errors to warnings.
# @template-ignore-next-line
# npx eslint --max-warnings 0 .
# @template-customization-start
# Since the server and the mod have different linting configs, we must lint them separately.
cd "$DIR/packages/common"
npx eslint --max-warnings 0 .
cd "$DIR/packages/server"
npx eslint --max-warnings 0 .
cd "$DIR/packages/mod"
npx eslint --max-warnings 0 .
cd "$DIR"
# @template-customization-end

# Check for unused exports.
# "--error" makes it return an error code of 1 if unused exports are found.
# @template-ignore-next-line
# npx ts-prune --error
# @template-customization-start
# We must check each package separately since they have different tsconfig.json files.
cd "$DIR/packages/common"
npx ts-prune --error --ignore "index.ts"
cd "$DIR/packages/server"
npx ts-prune --error --ignore "index.ts"
cd "$DIR/packages/mod"
npx ts-prune --error --ignore "index.ts"
cd "$DIR"
# @template-customization-end

# Use `isaac-xml-validator` to validate XML files.
# (Skip this step if Python is not currently installed for whatever reason.)
if command -v python &> /dev/null; then
  pip install isaac-xml-validator --upgrade --quiet
  # @template-ignore-next-line
  isaac-xml-validator --quiet --ignore "cutscenes.xml"
fi

# Spell check every file using CSpell.
# "--no-progress" and "--no-summary" make it only output errors.
npx cspell --no-progress --no-summary .

# Check for unused CSpell words.
npx cspell-check-unused-words

# @template-customization-start
# Check for base file updates.
npx isaacscript check --ignore ".eslintrc.cjs,build.sh,bundleEntry.ts,lint.ts,publish.sh,run.sh,tsconfig.json,tsconfig.eslint.json"
# @template-customization-end

echo "Successfully linted $REPO_NAME in $SECONDS seconds."
