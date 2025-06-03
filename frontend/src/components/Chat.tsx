import { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('');
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/models')
      .then(res => res.json())
      .then(data => setModels(data.map((m: any) => m.name)))
      .catch(() => setModels([]));
  }, []);

  const sendMessage = async () => {
    if (!input) return;
    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt: input })
    });
    const data = await res.json();
    if (data.response) {
      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages([...newMessages, assistantMessage]);
    }
  };

  return (
    <div className="chat-container">
      <div className="model-select">
        <label>Model:</label>
        <select value={model} onChange={e => setModel(e.target.value)}>
          <option value="">Select model</option>
          {models.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="messages">
        {messages.map((m, idx) => (
          <div key={idx} className={`message ${m.role}`}>{m.content}</div>
        ))}
      </div>
      <div className="input-area">
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
