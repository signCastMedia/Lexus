import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: calc(
    100vh - 2 * (100px + 40px)
  ); /* Subtracting the height of navbar and footer */
  display: flex;
  align-items: center;
  justify-content: center;

  border:solid 2px red;

`;

