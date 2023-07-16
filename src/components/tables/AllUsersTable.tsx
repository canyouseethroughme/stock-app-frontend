import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { UserType } from 'src/services/users';
import { useGetUsers } from 'src/hooks/useGetUsers';

interface UsersTableProps {
  role?: UserType['role'];
}

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
  }
];

export const UsersTable: React.FC<UsersTableProps> = ({ role }) => {
  const users = useGetUsers({ role: role });

  return (
    <Table<UserType> dataSource={users?.data?.data?.users} columns={columns} />
  );
};
