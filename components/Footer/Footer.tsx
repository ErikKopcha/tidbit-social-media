import { footerList1, footerList2, footerList3 } from '../../utils/constants';

const Footer = (): JSX.Element => {
  return (
    <div className='mt-6 hidden xl-block'>
      <List mt={false} items={footerList1} />
      <List mt items={footerList2} />
      <List mt items={footerList3} />
      <p className="text-gray-400 text-sm mt-5">{new Date().getFullYear()} TidBit</p>
    </div>
  )
}

const List = ({ items, mt }: { items: string[], mt: boolean }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${mt ? 'mt-5' : ''}`}>
      {items.map(item => (
        <p className="text-gray-400 text-sm hover:unbderline cursor-pointer" key={item}>
          {item}
        </p>
      ))}
    </div>
  )
}

export default Footer;