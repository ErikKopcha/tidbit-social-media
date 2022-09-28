import { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import userAuthStore from '../../store/authStore';

interface IProps {
  likes: any[];
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps): JSX.Element => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = userAuthStore();

  const filterLikes = likes?.filter((like) => like._ref === userProfile?._id);

  useEffect(() => {
    setAlreadyLiked(filterLikes?.length > 0);
  }, [likes, filterLikes])

  return (
   <div className="flex gap-6">
    <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
     {alreadyLiked ? (
       <div
         onClick={handleDislike}
         className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]"
       >
        <MdFavorite className="text-lg md:text-2xl" />
       </div>
     ): (
       <div
         onClick={handleLike}
         className="bg-primary rounded-full p-2 md:p-4"
       >
        <MdFavorite className="text-lg md:text-2xl" />
       </div>
     )}
      <p className="text-md font-semibold">
        {likes?.length || 0}
      </p>
    </div>
   </div>
  )
}

export default LikeButton;