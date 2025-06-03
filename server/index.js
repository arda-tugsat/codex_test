const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { execSync } = require('child_process');
const app = express();
app.use(cors());
app.use(express.json());

// List installed Ollama models
app.get('/api/models', (req, res) => {
  try {
    const output = execSync('ollama list --json', { encoding: 'utf8' });
    const lines = output.trim().split('\n');
    const models = lines.map(line => JSON.parse(line));
    res.json(models);
  } catch (e) {
    res.status(500).json({ error: 'Failed to list models' });
  }
});

// Generate chat response using Ollama
app.post('/api/generate', async (req, res) => {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Generation failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
