import React, { useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import AddOptionForm from './Components/AddOptionForm';
import OptionList from './Components/OptionList';
import { ClipLoader } from 'react-spinners';

function App() {
  const [options, setOptions] = useState([]);
  const [decision, setDecision] = useState('');
  const removeOption = (optionToRemove) => {
  setOptions(prevOptions => prevOptions.filter(opt => opt !== optionToRemove));
};
const clearOptions = () => {
  setOptions([]);
};
const [error, setError] = useState('');
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

  setOptions(prevOptions => [...prevOptions, trimmedOption]);
};
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditValue(options[index]);
  };

  // Düzenleme kaydetme fonksiyonu
  const saveEdit = () => {
    if (!editValue.trim()) {
      alert("Boş değer olamaz!");
      return;
    }
    const newOptions = [...options];
    newOptions[editingIndex] = editValue.trim();
    setOptions(newOptions);
    setEditingIndex(null);
    setEditValue('');
  };

  // Düzenleme iptal fonksiyonu
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };
  const makeDecision = () => {
  if (options.length === 0) {
    alert('Lütfen önce en az bir seçenek ekleyin.');
    return;
  }

  setLoading(true); // Yükleme başlıyor

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * options.length);
    setDecision(options[randomIndex]);
    setLoading(false); // Yükleme bitiyor
  }, 2000); // 2 saniyelik yükleme animasyonu
};
  const handleDeleteOption = (indexToRemove) => {
    setOptions(prevOptions => prevOptions.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div>
      <h1>Karar Verici</h1>
          <AddOptionForm addOption={addOption} options={options} />
       <OptionList
  options={options}
  removeOption={removeOption}
  editingIndex={editingIndex}
  editValue={editValue}
  setEditValue={setEditValue}
  startEditing={startEditing}
  saveEdit={saveEdit}
  cancelEdit={cancelEdit}
/>

      <Button type="primary" onClick={makeDecision}>Karar Ver</Button>
      {loading && <ClipLoader color="#36d7b7" size={50} />}
      <button onClick={clearOptions}>Tümünü Temizle</button>
      {decision && (
        <div>
          <h2>Seçilen Karar:</h2>
          <p>{decision}</p>
        </div>
      )}
    </div>
  );
}

export default App;
