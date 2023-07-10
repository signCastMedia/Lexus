import styled from "styled-components";

export const Navbar = styled.div`
  position: sticky;
  top: 0; 
  background: #252C30;
   display: flex; 
  justify-content: space-between;
  align-items: center; 
  padding: 14px 68px 14px 0px;

`;

export const Tabs = styled.div`
display: flex;
padding: 10px;
justify-content: center;
align-items: center;
gap: 50px;

  
`;

export const Logo = styled.img`
  color: white;
  cursor: pointer;
  width: 322px;
height: 38px;
padding:0px 68px;

  
`;

export const MenuItem = styled.div`
color: #FFF;
text-align: center;
font-family: Proxima Nova;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 28px;
text-transform: uppercase;
cursor: pointer;


`;
