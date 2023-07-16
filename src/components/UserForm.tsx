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
import { createUser, UserType } from 'src/services/users';

interface UserFormProps {
  item?: UserType;
  onOk?: () => void;
  onCancel?: () => void;
}

const { Text, Title } = Typography;
const { Option } = Select;

export const UserForm: React.FC<UserFormProps> = ({ item, onOk, onCancel }) => {
  const [username, setUsername] = useState<string | undefined>(item?.username);
  const [barName, setbarName] = useState<string | undefined>(item?.barName);
  const [password, setPassword] = useState<string | undefined>(item?.password);
  const [role, setRole] = useState<UserType['role'] | undefined>(item?.role);

  const queryClient = useQueryClient();

  const onCreate = async () => {
    if (username && password && role) {
      try {
        const data = await createUser({
          username,
          password,
          role,
          barName
        });

        notification.success({
          message: 'User created successfully',
          placement: 'top'
        });
        queryClient.refetchQueries('getAllUsers-admin');
        queryClient.refetchQueries('getAllUsers-delivery');
        queryClient.refetchQueries('getAllUsers-storage');
        queryClient.refetchQueries('getAllUsers-bar');
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
    // if (name && quantity && measurementUnit && category && item) {
    //   try {
    //     const data = await editStorageItem({
    //       itemId: item?._id,
    //       name,
    //       quantity,
    //       measurementUnit,
    //       category
    //     });
    //     notification.success({
    //       message: 'Item edited successfully',
    //       placement: 'top'
    //     });
    //     console.log('data => ', data);
    //     queryClient.refetchQueries('storageItems');
    //     onCancel && onCancel();
    //   } catch (err) {
    //     notification.error({
    //       message: 'There was an error',
    //       placement: 'top'
    //     });
    //     console.log('err edit storage item => ', err);
    //   }
    // }
  };

  return (
    <div className='flex-column'>
      {item ? (
        <Title level={4}>Edit "{item.username}"</Title>
      ) : (
        <Title level={4}>Create item</Title>
      )}

      <Text style={{ marginTop: 15, marginBottom: 5 }}>Name: </Text>
      <Input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='Enter the username'
      />
      <Text style={{ marginTop: 15, marginBottom: 5 }}>Password: </Text>
      <Input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Enter the password'
      />
      <Text style={{ marginTop: 15, marginBottom: 5 }}>Select user role: </Text>
      <Select
        placeholder='Select user role'
        style={{ width: '100%' }}
        onChange={value => setRole(value)}
        value={role}
      >
        <Option value='admin'>Admin</Option>
        <Option value='storage'>Storage</Option>
        <Option value='delivery'>Delivery</Option>
        <Option value='bar'>Bar</Option>
      </Select>
      <Text style={{ marginTop: 15, marginBottom: 5 }}>Bar: </Text>
      <Select
        value={barName}
        placeholder='Select category'
        style={{ width: '100%' }}
        onChange={value => setbarName(value)}
      >
        <Option value={undefined}>None</Option>
        <Option value='Vessel'>Vessel</Option>
        <Option value='Space'>Space</Option>
        <Option value='Garden'>Garden</Option>
        <Option value='Beach'>Beach</Option>
        <Option value='Entrance'>Entrance</Option>
      </Select>

      <Divider />

      <div className='flex-row' style={{ justifyContent: 'flex-end' }}>
        <Space size={10}>
          <Button type='default' onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type='primary'
            disabled={!username || !role || !password}
            onClick={item ? onEdit : onCreate}
          >
            {item ? 'Save' : 'Create'}
          </Button>
        </Space>
      </div>
    </div>
  );
};
