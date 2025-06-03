# ChatbotUI Skeleton

This repository contains a minimal example of a chatbot interface built with React and Vite on the frontend and an Express server that proxies requests to the local Ollama API.

## Getting Started

1. Install dependencies for both the frontend and server:
   ```bash
   cd frontend && npm install
   cd ../server && npm install
   ```
2. Start the backend server:
   ```bash
   node index.js
   ```
3. In another terminal run the frontend:
   ```bash
   cd frontend && npm run dev
   ```
4. Open the browser at `http://localhost:5173`.

The settings page allows selecting an installed model returned by `ollama list`.

This is only a basic foundation; integrations with services like Gmail, Google Drive and others are left as future work.
