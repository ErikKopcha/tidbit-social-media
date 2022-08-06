import styled from 'styled-components';

export const NavbarStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  width: 100%;
  border-bottom: 2px solid var(--mercury);
`;

export const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Dancing Script', cursive;
  font-size: 22px;
  line-height: 1;
  color: var(--shocking-pink);
`;


export const Logo = styled.img`
  display: block;
  margin-right: 10px;
`;