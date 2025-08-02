import React, { useState } from 'react';
import { Button } from 'antd';

function AddOptionForm({ addOption, options }) {
  const [inputValue, setInputValue] = useState("");  // input değeri
  const [error, setError] = useState(null);          // hata mesajı

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedOption = inputValue.trim();

    // Boş mu?
    if (!trimmedOption) {
      setError('Lütfen bir seçenek girin.');
      return;
    }

    // Aynı seçenek var mı?
    if (options.includes(trimmedOption)) {
      setError('Bu seçenek zaten eklenmiş.');
      return;
    }

    // Hepsi doğruysa:
    addOption(trimmedOption);
    setInputValue('');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setError(null);
        }}
      />
      <Button type="primary" htmlType="submit">Ekle</Button>
      {error && <div style={{ color: 'red', marginTop: 4 }}>{error}</div>}
    </form>
  );
}

export default AddOptionForm;
