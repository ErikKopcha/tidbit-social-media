import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout  } from '@react-oauth/google';
import { createOrGetUser } from '../../utils';
import userAuthStore from '../../store/authStore';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';

import logo from '../../assets/images/logo.png';

const Navbar = () => {
  const { userProfile, addUser, removeUser } = userAuthStore();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  }

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[50px]'>
          <Image
            className='cursor-pointer'
            src={logo}
            alt='logo'
            layout='responsive'
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type='text'
            placeholder="Search accounts and videos"
            className="bg-primary py-3 pl-5 pr-14 md:text-md font-medium border-2  border-gray-100 focus:outline-none focus:border-gray-300 w-[300px] md:w[350px] rounded-full"
          />
          <button
            type="submit"
            style={{ borderLeft: '2px solid', top: '50%', transform: 'translateY(-48%)' }}
            className="absolute md:right-5 right-6 border-gray-300 pl-2 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className="flex gap-5">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className='rounded-full cursor-pointer'
                    src={userProfile.image}
                    alt='profile photo'
                  />
                </>
              </Link>
            )}
            <button
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              type="button"
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('error')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;