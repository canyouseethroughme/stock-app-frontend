import { Button, Input, Layout, Typography } from 'antd';
import Password from 'antd/lib/input/Password';
import { Content } from 'antd/lib/layout/layout';
import jwtDecode from 'jwt-decode';

import React, { useContext, useState } from 'react';
import UserContext from 'src/contexts/UserContext';
import { login } from '../services/users';

const { Title } = Typography;

type TokenType = {
  userId: string;
  role: 'bar' | 'delivery' | 'storage' | 'admin';
  username: string;
  barName?: string;
};

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { setUserData } = useContext(UserContext);

  const onLogin = async () => {
    if (username && password) {
      try {
        const {
          data: { token }
        } = await login({ username, password });

        const decodedToken = jwtDecode<TokenType>(token);

        setUserData && setUserData({ ...decodedToken, token });
      } catch (err) {
        console.log('err on login => ', err);
      }
    }
  };

  return (
    <Layout className='layout'>
      <Content>
        <div className='flex-column centerDiv'>
          <Title level={5}>WELCOME TO</Title>
          <Title level={3} style={{ margin: '0 0 2rem 0' }}>
            KUNE Festival Bar Stock App
          </Title>

          <Input
            placeholder='username'
            size='large'
            style={{ marginBottom: '1rem' }}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            placeholder='password'
            type='password'
            size='large'
            style={{ marginBottom: '1rem' }}
            onChange={e => setPassword(e.target.value)}
          />

          <Button
            size='large'
            type='primary'
            block
            disabled={!username || !password}
            onClick={onLogin}
          >
            LOGIN
          </Button>
        </div>
      </Content>
    </Layout>
  );
};
