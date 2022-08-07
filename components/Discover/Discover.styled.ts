import styled from 'styled-components'

export const DiscoverWrap = styled.div`
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--mercury);
`;

export const Title = styled.div`
  margin: 10px;
  color: var(--silver-chalice);
  font-weight: 500;
`;

export const TopicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TopicItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 6px 10px;
  color: var(--black);
  border: 1px solid var(--silver-chalice);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover,
  &.active {
    color: var(--shocking-pink);
    border: 1px solid var(--shocking-pink);
  }
  
  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

