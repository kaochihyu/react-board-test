import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import AuthContext from '../../contexts';
import { setAuthToken } from '../../utils';

const HeaderContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 70px;
  background-color: #fff;
  box-sizing: border-box;
`;

const Brand = styled(Link)`
  color: black;
  font-size: 32px;
  text-decoration: none;
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled(Link)`
  padding: 10px 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${props => props.$active 
    && `
      text-decoration: underline rgba(0, 0, 0, 0.2);
    `}

  ${props => props.register 
    && `
      border-radius: 6px;
      background-color: rgba(84, 131, 215, 1);
      color: #fff;
      transition: 0.5s;

      &:hover {
        background-color: #6C9BED;
      }
    `}
`;

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  return (
    <HeaderContainer>
      <div>
        <Brand to="/" $active={location.pathname === '/'}>
          Large
        </Brand>
      </div>
      <NavbarList>
        <Nav to="/" $active={location.pathname === '/'}>
          Home
        </Nav>
        <Nav to="/about" $active={location.pathname === '/about'}>
          About
        </Nav>
        {user && (
          <Nav to="/new-post" $active={location.pathname === '/new-post'}>
            Post Story
          </Nav>
        )}
        {user && <Nav onClick={handleLogout}>Logout</Nav>}
        {!user && (
          <Nav to="/login" $active={location.pathname === '/login'}>
            Login
          </Nav>
        )}
        {!user && (
          <Nav to="/register" register>
            Get Started
          </Nav>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
