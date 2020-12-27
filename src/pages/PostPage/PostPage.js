import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getPost } from '../../WebAPI';

const Root = styled.div`
  padding: 20px 70px;
`;

const PostContainer = styled.div`
  width: 70%;
  height: 80px;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled.div`
  font-size: 24px;
  padding: 10px 0;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
`;

const PostDate = styled.div`
  display: block;
  color: rgba(0, 0, 0, 0.3);
`;

const PostContent = styled.div`
  margin-top: 20px;
  line-height: 1.5;
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      <PostContent>{post.body}</PostContent>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default function PostPage() {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getPost(id).then(WebApiPost => setPost(WebApiPost));
  }, []);

  return (
    <Root>
      <Post post={post} />
    </Root>
  );
}
