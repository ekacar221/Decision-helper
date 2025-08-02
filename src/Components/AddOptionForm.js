import React, { useState } from 'react';
import { Button } from 'antd';

function AddOptionForm({ addOption }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addOption(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '20px auto', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="Yeni seçenek ekle..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ flexGrow: 1, padding: '10px 12px', fontSize: 16, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <Button type="primary" htmlType="submit">Ekle</Button>
    </form>
  );
}

export default AddOptionForm;
