#!/bin/bash

SPECTRE_ENGINE_TARGET_DIRECTORY=/Applications/spectre-engine
PREFERENCES_PATH="$SPECTRE_ENGINE_TARGET_DIRECTORY/public/preferences.json"

echo -e "Clearing previous configuration.."
rm -f $PREFERENCES_PATH

echo -e "Writing Configuration Files.."
{
  json="$1" > $PREFERENCES_PATH
  echo "$json" > $PREFERENCES_PATH
} || {
  echo -e "[ERROR] Unable to write configuration. Exiting.."
  rm -f $PREFERENCES_PATH
  exit 1
}

echo -e "Generating Application.."
{
  cd "$SPECTRE_ENGINE_TARGET_DIRECTORY"
  npm run build
  rm -f $PREFERENCES_PATH
  echo -e "Application Generated."
} || {
  echo -e "[ERROR] Unable to generate application. Exiting.."
  rm -f $PREFERENCES_PATH
  exit 1
}