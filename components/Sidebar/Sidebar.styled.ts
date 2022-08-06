import styled from 'styled-components'

export const ButtonToggleSidebar = styled.button`
  display: block;
  margin: 10px;
  font-size: 30px;
`;

export const SidebarContent = styled.div`
  margin: 20px 0;
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-right: 2px solid var(--mercury);
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
  justify-content: center;
  gap: 10px;
  padding: 10px;
  font-weight: 500;
  border-radius: 5px;
  color: var(--persian-rose);
  cursor: pointer;

  &:hover {
    color: var(--white);
    background-color: var(--royal-blue);
  }
`;
