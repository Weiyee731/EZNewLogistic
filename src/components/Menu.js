import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { isStringNullOrEmpty } from "../Repository/Helper";
import LogoutIcon from '@mui/icons-material/Logout';
const COLORS = {
  primaryDark: "#023047",
  primaryLight: "#8ECAE6",
  white: "#FFFFFF",
  secondary: '#fb8500',
};

const MenuLabel = styled.label`
  background-color: ${COLORS.white};
  position: fixed;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  cursor: pointer;
  z-index: 1000;
  // box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;
  top: 10px; 
  left: 15px;
`;

const NavBackground = styled.div`
  position: fixed;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.3s;
  top: 10px; 
  left: 10px;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : COLORS.primaryDark)};
  width: 25px;
  height: 2px;
  display: inline-block;
  margin-top: 1.8rem;
  transition: all 0.3s;

  &::before,
  &::after {
    content: "";
    background-color: ${COLORS.primaryDark};
    width: 25px;
    height: 2px;
    display: inline-block;

    position: absolute;
    left: 0;
    transition: all 0.3s;
  }

  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};

    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }

  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.75rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "0.75rem")};
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 10px; 
  left: 15px;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  display: ${(props) => (props.clicked ? "inline" : "none")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: 2rem;
  font-weight: 300;
  text-decoration: none;
  color: ${COLORS.primaryLight};
  padding: 1rem 1rem;

  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;

  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }
`;

function HamburgerMenu() {
  const [click, setClick] = useState(false);
  const { auth, setAuth } = useAuth()
  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    setAuth({})
    localStorage.setItem("user", "")
    handleClick()
  }

  return (
    <>
      <MenuLabel htmlFor="navi-toggle" onClick={handleClick} style={{ margin: '10px' }}>
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation clicked={click}>
        <List>
          <li>
            <ItemLink onClick={handleClick} to="/">
              Home
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/pricing">
              Pricing
            </ItemLink>
          </li>

          <li>
            <ItemLink onClick={handleClick} to={auth.UserID !== null ? "/profile" : "/login"}>
              Profile
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/faq/0">
              FAQ
            </ItemLink>
          </li>
          {
            !isStringNullOrEmpty(auth?.UserID) && !isStringNullOrEmpty(auth?.Username) &&
            <li>
              <ItemLink onClick={handleLogout} to="/">
                Logout <LogoutIcon size="large" sx={{ fontSize: 30 }} />
              </ItemLink>
            </li>
          }
        </List>
      </Navigation>
    </>
  );
}

export default HamburgerMenu;