import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const API_ENDPOINT = "https://student-json-api.lidemy.me/comments";

const Page = styled.div`
  width: 500px;
  padding: 20px 30px;
  background-color: #ECF4F5;
  border-radius: 18px;
  margin: 60px auto;
`

const Title = styled.h1`
  color: #555;
`

const MessageForm = styled.form`
  margin-top: 20px;
  padding: 10px;
`

const MessageTextArea = styled.textarea`
  width: 100%;
  display: block;
`
const SubmitButton = styled.button`
  margin-top: 10px;
  background-color: #eee;
`

const MessageList = styled.div`
  margin-top: 10px;
`

const MessageContainer = styled.div`
 background-color: #fff;
 padding: 10px 20px;
 border-radius: 5px;

 & + & {
  margin-top: 10px;
 }
`

const MessageHead = styled.div`
  display: flex;
  align-items: center;
`

const MessageAuthor = styled.div`
  font-size: 20px;
  color: #7CCBCD;
  padding: 5px;
  margin-right: 16px;
`

const MessageTime = styled.div`
  color: #888;
`

const MessageBody = styled.div`
  font-size: 16px;
  color: #333;
  margin-top: 10px;
`

const ErrorMessage = styled.div`
  margin-top: 16px;
  color: red;
`

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node
}

function Message({ author, time, children }) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageBody>{children}</MessageBody>
    </MessageContainer>
  );
}

function App() {
  const [messages, setMessages] = useState(null);
  const [messageApiError, setMessageApiError] = useState(null);
  const [value, setValue] = useState();
  const [postMessageError, setPostMessageError] = useState();
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);

  const fetchMessages = () => {
    return fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data)
      })
      .catch(err => {
        setMessageApiError(err.message)
      })
  }

  const handleTextareaChange = e => {
    setValue(e.target.value)
  }

  const handleTextareaFocus = e => {
    setPostMessageError(null);
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    if (isLoadingPostMessage) {
      return;
    }
    setIsLoadingPostMessage(true);
    fetch('https://student-json-api.lidemy.me/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        nickname: 'sun',
        body: value,
      })
    })
      .then(res => res.json())
      .then(data => {
        setIsLoadingPostMessage(false)
        if (data.ok === 0) {
          setPostMessageError(data.message)
          return;
        }
        setValue("");
        fetchMessages()
      })
      .catch((err) => {
        setIsLoadingPostMessage(false);
        setPostMessageError(err.message);
      })
    }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <Page>
      {isLoadingPostMessage && <Loading>Loading...</Loading>}
      <Title>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextArea 
          value={value} 
          onChange={handleTextareaChange}
          onFocus={handleTextareaFocus} 
          rows={5} />
        <SubmitButton>送出留言</SubmitButton>
        {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
      </MessageForm>
      {messageApiError && (
        <ErrorMessage>
          Something went wrong.{messageApiError.toString()}
        </ErrorMessage>
      )}
      {messages && messages.length === 0 && <div>No Message</div>}
      <MessageList>
        {messages && messages.map(message => (
          <Message 
            key={message.id} 
            author={message.nickname} 
            time={new Date(message.createdAt).toLocaleString()}
          >
            {message.body}
          </Message>
        ))}
      </MessageList>
    </Page>
  )
}

export default App;
