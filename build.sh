#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

"$DIR/packages/common/build.sh"
"$DIR/packages/server/build.sh"
"$DIR/packages/mod/build.sh"

echo "Successfully built all packages in $SECONDS seconds."
