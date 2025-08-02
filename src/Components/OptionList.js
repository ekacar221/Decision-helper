import React from 'react';
import { List, Button } from 'antd';

function OptionList({
  options,
  removeOption,
  editingIndex,
  editValue,
  setEditValue,
  startEditing,
  saveEdit,
  cancelEdit
}) {
  return (
    <List
      bordered
      dataSource={options}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            editingIndex === index ? (
              <>
                <Button type="text" onClick={saveEdit}>Kaydet</Button>
                <Button type="text" onClick={cancelEdit}>İptal</Button>
              </>
            ) : (
              <>
                <Button type="text" onClick={() => startEditing(index)}>Düzenle</Button>
                <Button type="text" danger onClick={() => removeOption(item)}>Sil</Button>
              </>
            )
          ]}
        >
          {editingIndex === index ? (
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              style={{ width: '100%' }}
            />
          ) : (
            item
          )}
        </List.Item>
      )}
    />
  );
}

export default OptionList;
