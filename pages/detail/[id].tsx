import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { IVideo } from '../../types';
import userAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

interface IProps {
  postDetails: IVideo
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [comment, setComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();

  const { userProfile }: any = userAuthStore();

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });

      setPost({
        ...post,
        likes: data.likes
      })
    }
  }

  const addComment = async (e: any) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      });

      setPost({ ...post, comments: data.comments });
      setComment('');
      setIsPostingComment(false);
    }
  }

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white sm-flex-col">
      <div className="relative flex-2 w-[70%] flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center sm-w-100">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p>
            <MdOutlineCancel
              onClick={() => { router.back() }}
              className="text-white text-[35px] cursor-pointer"
            />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              onClick={() => {}}
              ref={videoRef}
              src={post.video.asset.url}
              controls
              loop
              autoPlay={true}
              muted={true}
              className="h-full cursor-pointer"
            ></video>
          </div>
        </div>
      </div>
      <div className="relative w-[30%] sm-w-100">
        <div className="lg:mt-20 mt-10 px-6">
          <div className="flex gap-3 cursor-pointer font-semibold rounded items-center">
            <div className="md:w-20 md:h-20 w-16 h-16">
              <Link href="/">
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className="flex flex-col">
                  <p className="flex items-center gap-1 font-bold md:text-md text-primary">
                    {post.postedBy.userName}
                    &nbsp;
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-md text-gray-600 ">
              {post.caption}
            </p>

            <div className="mt-2">
              {userProfile && (
                <LikeButton
                  likes={post.likes}
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          {userProfile && (
            <Comments
              comment={comment}
              comments={post.comments}
              setComment={setComment}
              addComment={addComment}
              isPostingComment={isPostingComment}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data }
  }
}

export default Detail;