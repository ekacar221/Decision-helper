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
        className='seçenek'
        type="text"
        placeholder="Yeni seçenek ekle..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="primary" htmlType="submit">Ekle</Button>
    </form>
  );
}

export default AddOptionForm;
