import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import AboutPage from '../../pages/AboutPage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import HomePage from '../../pages/HomePage';
import PostPage from '../../pages/PostPage';
import NewPostPage from '../../pages/NewPostPage';
import Header from '../Header';
import AuthContext from '../../contexts';
import { getMe } from '../../WebAPI';
import { getAuthToken } from '../../utils';

const Root = styled.div`
  padding-top: 100px;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = getAuthToken();

  // 有 TOKEN 才 CALL API
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
          setIsLoading(false);
        }
      });
    } 
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          {!isLoading && <Header />}
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/posts/:id">
              <PostPage />
            </Route>
            <Route exact path="/new-post">
              <NewPostPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
