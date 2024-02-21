#!/bin/bash
############# jake didn't end up using it, but it was pretty cool
# Default to loading .env.local
ENV_FILE=".env.local"

# Check for --production flag
for arg in "$@"
do
    if [ "$arg" = "--production" ]; then
        ENV_FILE=".env.production"
        break
    fi
done

# Load the appropriate environment file
if [ -f "$ENV_FILE" ]; then
    echo "Loading environment from $ENV_FILE"
    set -a # Automatically export variables
    source "$ENV_FILE"
    set +a
else
    echo "Environment file $ENV_FILE not found"
    exit 1
fi

# Execute the command passed as arguments, skipping the first one if it's --production
if [ "$1" = "--production" ]; then
    "${@:2}"
else
    "$@"
fi
