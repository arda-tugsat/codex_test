import { fetchAIResponse } from './openrouter.js';
import { exaSearch } from './exaSearch.js';

const chatWindow = document.getElementById('chat-window');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const themeSwitch = document.getElementById('theme-switch');
const chatContainer = document.getElementById('chat-container');
const searchBar = document.getElementById('search-bar');
const onboarding = document.getElementById('onboarding');

let messages = [];
let currentModel = localStorage.getItem('openrouter_model') || 'openrouter/auto';

function addMessage(content, sender = 'bot') {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerHTML = `
        <div class="avatar">${sender === 'user' ? '🧑' : '🤖'}</div>
        <div class="content">${content}</div>
    `;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    addMessage(text, 'user');
    messages.push({ role: 'user', content: text });
    addMessage('<em>Typing...</em>');
    try {
        const reply = await fetchAIResponse(messages, currentModel);
        messages.push({ role: 'assistant', content: reply });
        chatWindow.lastChild.remove(); // remove typing indicator
        addMessage(reply, 'bot');
    } catch (err) {
        chatWindow.lastChild.remove();
        addMessage(`Error: ${err.message}`, 'bot');
    }
}

async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    searchInput.value = '';
    addMessage(`Searching for "${query}"...`, 'bot');
    try {
        const results = await exaSearch(query);
        const content = results.items.slice(0, 3).map(r => `<p><a href="${r.url}" target="_blank">${r.title}</a></p>`).join('');
        addMessage(content, 'bot');
    } catch (err) {
        addMessage(`Search error: ${err.message}`, 'bot');
    }
}

sendBtn.addEventListener('click', handleUserMessage);
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleUserMessage();
});
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
});

themeSwitch.addEventListener('click', () => {
    chatContainer.classList.toggle('dark');
});

// Show onboarding once per session
if (!sessionStorage.getItem('visited')) {
    onboarding.classList.remove('hidden');
    setTimeout(() => onboarding.classList.add('hidden'), 3000);
    sessionStorage.setItem('visited', 'true');
}
