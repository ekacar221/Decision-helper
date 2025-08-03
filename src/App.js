import React, { useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import AddOptionForm from './Components/AddOptionForm';  // Senin form bileşenin
import { ClipLoader } from 'react-spinners';
import './App.css';

function App() {
  const [options, setOptions] = useState([]);
  const [decision, setDecision] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addOption = (newOption) => {
    const trimmedOption = newOption.trim();

    if (trimmedOption === '') {
      alert('Lütfen boş olmayan bir seçenek girin!');
      return;
    }

    if (options.includes(trimmedOption)) {
      alert('Bu seçenek zaten mevcut!');
      return;
    }

    setOptions(prev => [...prev, trimmedOption]);
  };

  const removeOption = (optionToRemove) => {
    setOptions(prevOptions => prevOptions.filter(opt => opt !== optionToRemove));
  };

  const clearOptions = () => {
    setOptions([]);
    setDecision('');
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditValue(options[index]);
  };

  const saveEdit = () => {
    if (!editValue.trim()) {
      alert('Boş değer olamaz!');
      return;
    }
    const newOptions = [...options];
    newOptions[editingIndex] = editValue.trim();
    setOptions(newOptions);
    setEditingIndex(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const makeDecision = () => {
    if (options.length === 0) {
      alert('Lütfen önce en az bir seçenek ekleyin.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setDecision(options[randomIndex]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <h1 className="animasyonluYazi">Karar Verici</h1>

      <AddOptionForm addOption={addOption} options={options} />

      <div className="option-grid">
        {options.map((option, index) => (
          <div className="option-card" key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{flexGrow: 1, marginRight: 10, fontSize: 16, padding: 6, borderRadius: 6, border: '1px solid #ccc'}}
                />
                <div className="option-actions">
                  <button onClick={saveEdit} title="Kaydet"><CheckOutlined /></button>
                  <button onClick={cancelEdit} title="İptal"><CloseOutlined /></button>
                </div>
              </>
            ) : (
              <>
                <span className="option-text">{option}</span>
                <div className="option-actions">
                  <button onClick={() => startEditing(index)} title="Düzenle"><EditOutlined /></button>
                  <button onClick={() => removeOption(option)} title="Sil"><DeleteOutlined /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="buttons-container">
        <Button type="primary" onClick={makeDecision}>Karar Ver</Button>
         <Button type="primary" onClick={makeDecision}>Tümünü Temizle</Button>
      </div>

      {loading && <div style={{textAlign: 'center', marginTop: 20}}><ClipLoader color="#36d7b7" size={50} /></div>}

      {decision && (
  <div className="decision-result">
    <h2>Seçilen Karar:</h2>
    <p>{decision}</p>
  </div>
)}
    </div>
  );
}

export default App;
