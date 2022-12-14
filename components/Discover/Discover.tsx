import React, { useEffect, useState } from 'react'
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../../utils/constants';

const Discover: NextPage = () => {
  const router = useRouter();
  const { topic } = router.query;

  const [currentTopic, setCurrentTopic] = useState(topic);

  useEffect(() => {
    setCurrentTopic(topic);
  }, [topic]);

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              onClick={() => { setCurrentTopic(item.name) }}
              className={`
                ${
                  currentTopic === item.name ? 
                  `xl:border-[#F51997] text-[#F51997]` :
                  `xl:border-gray-300 text-black`
                } 
                text-sm xl:border-2 hover:bg-primary px-4 py-2 rounded xl:rounded-full 
                flex items-center gap-2 justify-center cursor-pointer
              `}
            >
              <span className='font-bold text-xl xl:text-md '>
                {item.icon}
              </span>
              <span className={`font-medium hidden xl:block capitalize`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;