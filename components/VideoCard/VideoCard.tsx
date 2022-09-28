import { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { IVideo } from '../../types'
import { useRef, useState } from 'react'
import { BASE_URL } from '../../utils';

interface IProps {
  post: IVideo
}

const VideoCard: NextPage<IProps> = ({ post }): JSX.Element => {
  const autoplay = true;
  const videoRef = useRef<HTMLVideoElement>(null);

  // const [isHover, setIsHover] = useState(false);
  // const [playing, setPlaying] = useState(autoplay);
  // const [isVideoMuted, setIsVideoMuted] = useState(true);

  // const onVideoPress = () => {
  //   if (playing) {
  //     videoRef?.current?.pause();
  //     setPlaying(false);
  //   } else {
  //     videoRef?.current?.play();
  //     setPlaying(true);
  //   }
  // }

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6 w-full">
      <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
        <div className="md:w-16 md:h-16 w-10 h-10">
          <Link href={`/profile/${post.postedBy._id}`}>
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
          <Link href={`/profile/${post.postedBy._id}`}>
            <div>
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-1 font-bold md:text-md text-primary">
                  {post.postedBy.userName}
                  &nbsp;
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="text-xs text-gray-500 hidden md:block lowercase">
                  {post.postedBy.userName.replaceAll(' ', '')}
                </p>
              </div>
              <p className="text-md text-gray-700 mt-1">
                {post.caption}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          // onMouseEnter={() => { setIsHover(true) }}
          // onMouseLeave={() => { setIsHover(false) }}
          className="rounded-3xl relative">
          <Link href={`${BASE_URL}/detail/${post._id}`}>
            <video
              muted={true}
              autoPlay={true}
              src={post.video.asset.url}
              ref={videoRef}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              loop
              controls
              // onClick={onVideoPress}
            ></video>
          </Link>

          {/*{isHover && (*/}
          {/*  <div className="absolute bottom-0 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 w-[100%] lg:justify-between p-3 bg-gray-100 rounded-3xl">*/}
          {/*    {playing ? (*/}
          {/*      <button onClick={onVideoPress}>*/}
          {/*        <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />*/}
          {/*      </button>*/}
          {/*    ) : (*/}
          {/*      <button onClick={onVideoPress}>*/}
          {/*        <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />*/}
          {/*      </button>*/}
          {/*    )}*/}

          {/*    {isVideoMuted ? (*/}
          {/*      <button onClick={() => setIsVideoMuted(false)}>*/}
          {/*        <HiVolumeOff className="text-black text-2xl lg:text-4xl" />*/}
          {/*      </button>*/}
          {/*    ) : (*/}
          {/*      <button onClick={() => setIsVideoMuted(true)}>*/}
          {/*        <HiVolumeUp className="text-black text-2xl lg:text-4xl" />*/}
          {/*      </button>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  )
}

export default VideoCard;