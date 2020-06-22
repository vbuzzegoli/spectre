#!/bin/bash

echo -e "Checking Spectre engine.."

SPECTRE_ENGINE_TARGET_DIRECTORY=/Applications/spectre-engine

# Check git
echo -e "Checking Git.."
command -v git || { 
  echo -e "Git not found. Installing git.."
  command -v brew || {
    echo -e "Installing homebrew.."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
  }
  echo -e "Resuming git installation.."
  brew install git
  git config --global user.name "Anonymous User"
  git config --global user.email "undefined@example.com"
  echo -e "Git installed successfully."
}
echo -e "Git ready."

# Check node
echo -e "Checking Node.."
command -v node || { 
  echo -e "Node not found. Installing node.."
  command -v brew || {
    echo -e "Installing homebrew.."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
  }
  echo -e "Resuming node installation.."
  brew install node
  echo -e "Node installed successfully."
}
echo -e "Node ready."

# Check engine
if [ -d "$SPECTRE_ENGINE_TARGET_DIRECTORY" ]; then
  echo -e "Spectre Engine ready."
else
  echo -e "Spectre Engine not found. Installing Spectre Engine.."
  git clone https://github.com/vbuzzegoli/spectre-engine.git "$SPECTRE_ENGINE_TARGET_DIRECTORY"
  cd "$SPECTRE_ENGINE_TARGET_DIRECTORY"
  npm install
  echo -e "Spectre Engine installed successfully."
fi


