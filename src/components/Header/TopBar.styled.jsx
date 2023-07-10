import styled from "styled-components";

export const Navbar = styled.div`
  position: sticky;
  top: 0;
  background-color: #000000;
  color: white;
  display: flex;
  justify-content: space-between;
  padding:10px 1.2rem;
`;

export const Tabs = styled.div`
  color: white;
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Logo = styled.img`
  color: white;
  cursor: pointer;
`;

export const MenuItem = styled.div`
  color: #fff;
  text-align: center;
  font-family: Proxima Nova;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  text-transform: uppercase;
`;
