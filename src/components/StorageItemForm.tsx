import { InputNumber, Select, Typography } from 'antd';
import Input from 'antd/lib/input/Input';
import React, { useState } from 'react';
import { StorageItemType } from 'services/storage';

interface StorageItemFormProps {
  item?: StorageItemType;
  onOk?: () => void;
  onCancel?: () => void;
}

const { Text, Title } = Typography;
const { Option } = Select;

export const StorageItemForm: React.FC<StorageItemFormProps> = ({ item }) => {
  const [name, setName] = useState<string | undefined>(item?.name);
  const [quantity, setQuantity] = useState<number | undefined>(item?.quantity);
  const [measurementUnit, setMeasurementUnit] = useState<string | undefined>(
    item?.measurementUnit
  );
  const [category, setCategory] = useState<string | undefined>(item?.category);

  return (
    <div className='flex-column'>
      {item ? (
        <Title level={4}>Edit "{item.name}"</Title>
      ) : (
        <Title level={4}>Create item</Title>
      )}

      <Text style={{ marginTop: 15, marginBottom: 5 }}>Name: </Text>
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='Enter the name'
      />
      <Text style={{ marginTop: 15, marginBottom: 5 }}>Quantity: </Text>
      <InputNumber
        value={quantity}
        onChange={e => setQuantity(e)}
        placeholder='Quantity'
      />
      <Text style={{ marginTop: 15, marginBottom: 5 }}>Measurement unit: </Text>
      <Select
        placeholder='Select measurement unit'
        style={{ width: 120 }}
        onChange={value => setMeasurementUnit(value)}
        value={measurementUnit}
      >
        <Option value='bottle'>Bottle</Option>
        <Option value='case'>Case</Option>
      </Select>
      <Text style={{ marginTop: 15, marginBottom: 5 }}>Category: </Text>
      <Select
        value={category}
        placeholder='Select category'
        style={{ width: 120 }}
        onChange={value => setCategory(value)}
      >
        <Option value='spirits'>Spirits</Option>
        <Option value='beer'>Beer</Option>
        <Option value='soda'>Soda</Option>
      </Select>
    </div>
  );
};
