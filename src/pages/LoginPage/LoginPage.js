import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { login, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils';
import AuthContext from '../../contexts';

const Form = styled.form`
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 400px;
  margin: 50px;
`;

const Title = styled.div`
  font-size: 24px;
  margin: 20px 0;
`;

const Username = styled.div`
  margin-bottom: 20px;
`;
const Password = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 18px;
  margin-top: 40px;
  padding: 10px 20px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: rgba(225, 0, 0, 0.5);
  font-weight: 600;
`;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = () => {
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push('/');
        return null;
      });
      return null;
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Title>Welcome Back</Title>
      <Username>
        Username:
        {''}
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </Username>
      <Password>
        Password:
        {''}
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Password>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button>Login</Button>
    </Form>
  );
}
