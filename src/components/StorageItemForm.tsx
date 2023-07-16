import {
  Button,
  Divider,
  InputNumber,
  notification,
  Select,
  Space,
  Typography
} from 'antd';
import Input from 'antd/lib/input/Input';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import {
  createStorageItem,
  editStorageItem,
  StorageItemType
} from '../services/storage';

interface StorageItemFormProps {
  item?: StorageItemType;
  onOk?: () => void;
  onCancel?: () => void;
}

const { Text, Title } = Typography;
const { Option } = Select;

export const StorageItemForm: React.FC<StorageItemFormProps> = ({
  item,
  onOk,
  onCancel
}) => {
  const [name, setName] = useState<string | undefined>(item?.name);
  const [quantity, setQuantity] = useState<number | undefined>(item?.quantity);
  const [measurementUnit, setMeasurementUnit] = useState<string | undefined>(
    item?.measurementUnit
  );
  const [category, setCategory] = useState<string | undefined>(item?.category);

  const queryClient = useQueryClient();

  const onCreate = async () => {
    if (name && quantity && measurementUnit && category) {
      try {
        const data = await createStorageItem({
          item: {
            name,
            quantity,
            measurementUnit,
            category
          }
        });

        notification.success({
          message: 'Item created successfully',
          placement: 'top'
        });
        queryClient.refetchQueries('storageItems');
        onCancel && onCancel();
      } catch (err) {
        notification.error({
          message: 'There was an error',
          placement: 'top'
        });
        console.log('err create storage item => ', err);
      }
    }
  };

  const onEdit = async () => {
    if (name && quantity && measurementUnit && category && item) {
      try {
        const data = await editStorageItem({
          itemId: item?._id,
          name,
          quantity,
          measurementUnit,
          category
        });
        notification.success({
          message: 'Item edited successfully',
          placement: 'top'
        });
        console.log('data => ', data);
        queryClient.refetchQueries('storageItems');
        onCancel && onCancel();
      } catch (err) {
        notification.error({
          message: 'There was an error',
          placement: 'top'
        });
        console.log('err edit storage item => ', err);
      }
    }
  };

  const onChangeNumberInput = (newValue: number | null) => {
    if (newValue) {
      return setQuantity(newValue);
    }

    return setQuantity(undefined);
  };

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
        onChange={onChangeNumberInput}
        placeholder='Quantity'
        style={{ width: '100%' }}
      />
      <Text style={{ marginTop: 15, marginBottom: 5 }}>Measurement unit: </Text>
      <Select
        placeholder='Select measurement unit'
        style={{ width: '100%' }}
        onChange={value => setMeasurementUnit(value)}
        value={measurementUnit}
      >
        <Option value='Bottle'>Bottle</Option>
        <Option value='Case of 30'>Case of 30</Option>
        <Option value='Case of 24'>Case of 24</Option>
        <Option value='Case of 20'>Case of 20</Option>
        <Option value='Case of 18'>Case of 18</Option>
        <Option value='Case'>Case</Option>
        <Option value='Keg/fustage'>Keg/fustage</Option>
      </Select>
      <Text style={{ marginTop: 15, marginBottom: 5 }}>Category: </Text>
      <Select
        value={category}
        placeholder='Select category'
        style={{ width: '100%' }}
        onChange={value => setCategory(value)}
      >
        <Option value='Spirits'>Spirits</Option>
        <Option value='Beer / Cider'>Beer / Cider</Option>
        <Option value='Mixers'>Mixers</Option>
        <Option value='Ready to drink'>Ready to drink</Option>
      </Select>

      <Divider />

      <div className='flex-row' style={{ justifyContent: 'flex-end' }}>
        <Space size={10}>
          <Button type='default' onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type='primary'
            disabled={!name || !category || !quantity || !measurementUnit}
            onClick={item ? onEdit : onCreate}
          >
            {item ? 'Save' : 'Create'}
          </Button>
        </Space>
      </div>
    </div>
  );
};
