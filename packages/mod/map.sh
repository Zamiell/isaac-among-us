#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

"$DIR/../../../BOIStageAPI15/basementrenovator/scripts/Executables/XMLToLua.exe" "$DIR/src/data/map.xml"
# (the "XMLToLua.exe" file has a success message)
