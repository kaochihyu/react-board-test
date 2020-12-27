import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  padding: 20px 70px;
`;

const PostContainer = styled.div`
  width: 100%;
  height: 80px;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled.div`
  width: 100%;
  font-size: 72px;
  padding: 50px 0;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.9);
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.9);
  text-align: center;
`;

const AboutContent = styled.div`
  display: block;
  color: rgba(0, 0, 0, 0.8);
  width: 50%;
  border-right: 1px solid rgba(0, 0, 0, 0.9);
  font-size: 28px;
  padding: 30px;
`;
const SomeArea = styled.div`
  font-size: 72px;
  color: rgba(0, 0, 0, 0.9);
  background-color: #9bffbc;
  border-top: 1px solid rgba(0, 0, 0, 0.9);
  padding: 30px;
  text-align: center;
`;

const SomeText = styled.div`
  font-size: 20px;
  padding: 10px 25%;
  text-align: justify;
`;

function Post() {
  const content = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  `;
  return (
    <PostContainer>
      <PostTitle>Every idea needs a Large medium.</PostTitle>
      <AboutContent>
        {content}
        <br />
        <br />
        {content}
      </AboutContent>
      <SomeArea>
        A faking network
        <br />
        of no one.
        <SomeText>{content}</SomeText>
      </SomeArea>
    </PostContainer>
  );
}

export default function PostPage() {
  return (
    <Root>
      <Post />
    </Root>
  );
}
