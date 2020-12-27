import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { postNew } from '../../WebAPI';
import { getAuthToken } from '../../utils';

const Root = styled.div`
  padding: 20px 70px;
`;

const PostContainer = styled.form`
  width: 70%;
  height: 80px;
`;

const PostTitle = styled.div`
  font-size: 18px;
  padding: 10px 0;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  & input {
    width: 60%;
    height: 30px;
  }
`;

const PostContent = styled.div`
  margin-top: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 260px;
  margin-top: 10px;
`;

const Button = styled.button`
  font-size: 14px;
  color: #333;
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 20px;
  text-shadow: none;
  border-style: none;
  border: 1px solid #333;
  display: block;
  float: right;
`;
const ErrorMessage = styled.div`
  color: red;
`;

function Post() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const token = getAuthToken();
  const history = useHistory();

  const handleSubmit = () => {
    setErrorMessage(null);
    if (token) {
      if (!title || !body) {
        return setErrorMessage('Please fill the empty area.');
      }
      postNew(title, body).then((response) => {
        console.log(response);
      });
      history.push('/');
    }
    return null;
  };
  return (
    <PostContainer onSubmit={handleSubmit}>
      <PostTitle>
        Title：
        {''}
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </PostTitle>
      <PostContent>New Post： </PostContent>
      <Textarea value={body} onChange={e => setBody(e.target.value)} />
      <Button>Submit</Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </PostContainer>
  );
}

export default function NewPostPage() {
  const token = getAuthToken();
  const history = useHistory();
  if (!token) {
    history.push('/');
  }
  return (
    <Root>
      <Post />
    </Root>
  );
}
