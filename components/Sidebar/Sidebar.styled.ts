import styled from 'styled-components'

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  margin: 20px 0;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border-right: 2px solid var(--mercury);
`;

export const ButtonToggleSidebar = styled.button`
  display: block;
  margin: 10px;
  font-size: 30px;
`;

export const SidebarNavigation = styled.div`
  padding-bottom: 10px;
  border-bottom: 2px solid var(--mercury);
  
  svg {
    font-size: 25px;
  }
  
  p {
    font-size: 20px;
  }
`;

export const NormalizeLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
  font-weight: 500;
  border-radius: 5px;
  color: var(--persian-rose);
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    color: var(--white);
    background-color: var(--persian-rose);
  }
`;

export const LogInWrap = styled.div`
  padding: 20px 0;
`;

export const ButtonGoogleLogin = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  width: 100%;
  background-color: var(--white);
  font-size: 20px;
  color: var(--persian-rose);
  font-weight: 500;
  border: 1px solid var(--persian-rose);
  border-radius: 5px;
  
  &:hover {
    color: var(--white);
    background-color: var(--persian-rose);
  }
`;
