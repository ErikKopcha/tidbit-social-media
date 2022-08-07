import { footerList1, footerList2, footerList3 } from '../../utils/constants';
import {
  FooterWrap,
  ListBox,
  ListItem,
  DateInfo
} from './Footer.styled';

const Footer = (): JSX.Element => {
  return (
    <FooterWrap>
      <List mt={false} items={footerList1} />
      <List mt items={footerList2} />
      <List mt items={footerList3} />
      <DateInfo>{new Date().getFullYear()} TidBit</DateInfo>
    </FooterWrap>
  )
}

const List = ({ items, mt }: { items: string[], mt: boolean }) => {
  return (
    <ListBox mt={mt}>
      {items.map(item => (
        <ListItem>{item}</ListItem>
      ))}
    </ListBox>
  )
}

export default Footer;