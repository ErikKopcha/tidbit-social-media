import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import VideoCard from '../../components/VideoCard/VideoCard';
import NoResults from '../../components/NoResults/NoResults';
import { IUser, IVideo } from '../../types';
import { BASE_URL } from '../../utils';
import axios from 'axios';

interface IProps {
  data: {
    user: IUser,
    userVideos: IVideo[],
    userLikedVideos: IVideo[]
  }
}

const Profile = ({ data }: IProps): JSX.Element => {
  const {
    user,
    userVideos,
    userLikedVideos
  } = data;

  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<IVideo[]>([]);

  const videos = showUserVideos ? `border-b-2 border-black` : `text-gray-400`;
  const likes = !showUserVideos ? `border-b-2 border-black` : `text-gray-400`;

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos)
    } else {
      setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userVideos, userLikedVideos])

  return (
    <div className="w-full">
      <div className="flex gap-4 md:gap-6 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image src={user.image} width={120} height={120} className="rounded-full" alt="user profile" layout="responsive" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="md:text-2xl tracking-wider flex gap-1 items-center text-md font-bold text-primary lowercase">
            {user.userName.replaceAll(' ', '')}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-sm md:text-xl">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            onClick={() => setShowUserVideos(true)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
          >
            Videos
          </p>
          <p
            onClick={() => setShowUserVideos(false)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${likes}`}
          >
            Liked
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length ? (
            videosList.map((post: IVideo, index) => (
              <VideoCard key={index} post={post} />
            ))
          ) : (
            <NoResults text={`No ${showUserVideos ? `` : `Liked`} Videos Yet`} />
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data
    }
  }
}

export default Profile;