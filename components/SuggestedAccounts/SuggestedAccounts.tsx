import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import userAuthStore from '../../store/authStore';
import { IUser } from '../../types';

const SuggestedAccounts = (): JSX.Element => {
  const { fetchAllUsers, allUsers } = userAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers])

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">Suggested Accounts</p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link key={user._id} href={`/profile/${user._id}`}>
            <div className="flex items-center gap-2 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
              <div className="w-9 h-9">
                <Image src={user.image} width={36} height={36} className="rounded-full" alt="user profile" layout="responsive" />
              </div>
              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                  {user.userName.replaceAll(' ', '')}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="capitalize text-gray-400 text-sm">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts;