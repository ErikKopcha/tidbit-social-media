import styled from 'styled-components';

interface ListBoxProps {
  mt: boolean
}

export const FooterWrap = styled.div`
  p {
    color: var(--silver)
  }
`;

export const ListBox = styled.div<ListBoxProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: ${props => props.mt ? `25px` : ``};
`;

export const ListItem = styled.p`
  cursor: pointer;
  
  &:hover {
  text-decoration: underline;
  }
`;

export const DateInfo = styled.p`
  margin-top: 25px;
`;