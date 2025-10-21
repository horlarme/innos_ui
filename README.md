# Innoscripta UI

## Setting Up Development Environment
### Getting Started
```shell
curl -fsSL https://bun.sh/install | bash # On Linux/MacOS
powershell -c "irm bun.sh/install.ps1 | iex" # On Windows

cd into-app-root-directory
cp .env.example .env # Make sure to set env variables 
bun install # Install Dependencies
bun run dev # Start development server  
```

## Product Environment (Using Docker)
```shell
# Make sure docker is already installed
docker compose up --build --remove-orphans app # Use --detach option to run in background
```
