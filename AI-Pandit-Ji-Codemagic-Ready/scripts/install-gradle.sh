#!/bin/sh
set -eu
GRADLE_VERSION="${GRADLE_VERSION:-8.7}"
if command -v gradle >/dev/null 2>&1; then
  command -v gradle
  exit 0
fi
mkdir -p "$HOME/.gradle-dist"
ARCHIVE="$HOME/.gradle-dist/gradle-${GRADLE_VERSION}-bin.zip"
DIST_DIR="$HOME/.gradle-dist/gradle-${GRADLE_VERSION}"
if [ ! -x "$DIST_DIR/bin/gradle" ]; then
  curl -L --retry 3 --fail -o "$ARCHIVE" "https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip"
  unzip -q -o "$ARCHIVE" -d "$HOME/.gradle-dist"
fi
printf '%s' "$DIST_DIR/bin/gradle"
