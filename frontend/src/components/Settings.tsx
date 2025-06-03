import { useState, useEffect } from 'react';

export default function Settings() {
  const [models, setModels] = useState<string[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/models')
      .then(res => res.json())
      .then(data => setModels(data.map((m: any) => m.name)))
      .catch(() => setModels([]));
  }, []);

  return (
    <div className="settings">
      <h2>Settings</h2>
      <label>Select Model</label>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="">Select model</option>
        {models.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}
