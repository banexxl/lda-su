#!/bin/sh
# Docker secrets arrive as files in /run/secrets; each file is exported as an
# environment variable of the same name (e.g. /run/secrets/DATABASE_URL), so
# the app keeps reading process.env as usual and secrets never sit in the
# image, the compose file or `docker inspect`.
set -eu

if [ -d /run/secrets ]; then
     for f in /run/secrets/*; do
          [ -f "$f" ] || continue
          name=$(basename "$f")
          case "$name" in
               *[!A-Z0-9_]*) continue ;; # only ENV_VAR-shaped names
          esac
          export "$name=$(cat "$f")"
     done
fi

exec "$@"
