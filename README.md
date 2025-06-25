# Creative Chatbot UI

This project provides a simple, browser-based chatbot that combines AI responses from the OpenRouter API with web search results from the Exa Search API. The user interface features a modern chat layout with avatars, typing indicators, and a floating search bar. Users can switch between light and dark themes and enjoy a playful onboarding animation when they first visit.

## Architecture

```
src/
├── index.html      # main page
├── styles.css      # themes and layout styling
├── main.js         # UI logic and event handlers
├── openrouter.js   # OpenRouter API wrapper
└── exaSearch.js    # Exa Search API wrapper
```

- **openrouter.js** exposes `fetchAIResponse` which sends chat history to OpenRouter and returns the assistant's message. API keys and preferred model are stored in `localStorage`.
- **exaSearch.js** provides `exaSearch` to perform web searches via Exa and return results as JSON.
- **main.js** manages chat interactions, theme switching, onboarding animation, and renders messages in the chat window.

## Setup

1. Serve the `src/` directory with any static server.
2. Store your API keys in the browser console:

```js
localStorage.setItem('openrouter_key', 'YOUR_OPENROUTER_KEY');
localStorage.setItem('exa_key', 'YOUR_EXA_API_KEY');
```

3. Optionally specify an OpenRouter model:

```js
localStorage.setItem('openrouter_model', 'openrouter/auto');
```

Open `index.html` in a browser to start chatting.
