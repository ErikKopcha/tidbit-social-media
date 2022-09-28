import axios from 'axios';
import { BASE_URL } from '../../utils';
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import VideoCard from '../../components/VideoCard/VideoCard';
import NoResults from '../../components/NoResults/NoResults';
import { IUser, IVideo } from '../../types';
import { GoVerified } from 'react-icons/go';
import userAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: IVideo[] }): JSX.Element => {
  const [isAccounts, setIsAccounts] = useState(true);

  const router = useRouter();
  const { searchTerm }: any = router.query;

  const { allUsers } = userAuthStore();

  const accounts = isAccounts ? `border-b-2 border-black` : `text-gray-400`;
  const isVideos = !isAccounts ? `border-b-2 border-black` : `text-gray-400`;

  const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  // useEffect(() => {
  //   if (showUserVideos) {
  //     setVideosList(userVideos)
  //   } else {
  //     setVideosList(userLikedVideos)
  //   }
  // }, [showUserVideos, userVideos, userLikedVideos])

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-6 border-b-2 border-gray-200 bg-white w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
        >
          Accounts
        </p>
        <p
          onClick={() => setIsAccounts(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div>
          {searchedAccounts.length ? (
            searchedAccounts.map((user: IUser, index) => (
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
            ))
          ) : (
            <NoResults
              text={`No accounts results for "${searchTerm}"`}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 md:justify-start">
          {videos?.length ? (
            videos.map((video: IVideo, index) => (
              <VideoCard post={video} key={index} />
            ))
          ) : (
            <NoResults
              text={`No video results for "${searchTerm}"`}
            />
          )}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data
    }
  }
}

export default Search;