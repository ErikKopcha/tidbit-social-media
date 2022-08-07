import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../../utils/constants';

import {
  DiscoverWrap,
  Title,
  TopicList,
  TopicItem
} from './Discover.styled';

const Discover = (): JSX.Element => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <DiscoverWrap>
      <Title>Popular Topics</Title>
      <TopicList>
        {topics.map(item => (
          <Link style={{ display: 'inline-block' }} key={item.name} href={`/?topic=${item.name}`}>
            <TopicItem className={topic === item.name ? `active` : ``}>
              <span>
                {item.icon}
              </span>
              <span>
                {item.name}
              </span>
            </TopicItem>
          </Link>
        ))}
      </TopicList>
    </DiscoverWrap>
  )
}

export default Discover;