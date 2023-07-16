import { Modal, Table, notification } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { UserType, deleteUser } from 'src/services/users';
import { useGetUsers } from 'src/hooks/useGetUsers';
import { DeleteOutlined } from '@ant-design/icons';
import { useQueryClient } from 'react-query';

interface UsersTableProps {
  role?: UserType['role'];
}

export const UsersTable: React.FC<UsersTableProps> = ({ role }) => {
  const users = useGetUsers({ role: role });
  const queryClient = useQueryClient();

  const columns: ColumnsType<UserType> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'name',
      render: text => <a>{text}</a>,
      sorter: (a, b) =>
        a.username.toLowerCase().localeCompare(b.username.toLowerCase()),
      width: '15%'
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Bar name',
      dataIndex: 'barName',
      key: 'barName',
      sorter: (a, b) =>
        a.barName && b.barName ? a?.barName.localeCompare(b?.barName) : 1,
      width: '20%'
    },
    {
      title: 'Action',
      key: 'action',
      render: item => (
        <div className='flex-row'>
          <DeleteOutlined
            onClick={() => onDeleteItem(item._id)}
            height={40}
            width={40}
            style={{ fontSize: 20 }}
          />
        </div>
      )
    }
  ];

  const onDeleteItem = async (itemId: string) => {
    console.log(
      '🚀 ~ file: AllUsersTable.tsx:62 ~ onDeleteItem ~ itemId:',
      itemId
    );
    try {
      await deleteUser(itemId);
      notification.success({
        message: 'Item deleted successfully',
        placement: 'top'
      });
      queryClient.refetchQueries('getAllUsers-admin');
      queryClient.refetchQueries('getAllUsers-delivery');
      queryClient.refetchQueries('getAllUsers-storage');
      queryClient.refetchQueries('getAllUsers-bar');
    } catch (err) {
      console.log('err delete item => ', err);
      notification.error({
        message: 'There was an error',
        placement: 'top'
      });
    }
  };
  return (
    <Table<UserType> dataSource={users?.data?.data?.users} columns={columns} />
  );
};
