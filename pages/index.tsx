import axios from 'axios'
import { IVideo } from '../types'
import VideoCard from '../components/VideoCard/VideoCard'
import NoResults from '../components/NoResults/NoResults'
import { BASE_URL } from '../utils';

interface IProps {
  videos: IVideo[];
}

const Home = (props: IProps) => {
  const {
    videos
  } = props;

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: IVideo) => (
          <VideoCard
            key={video._id}
            post={video}
          />
        ))
      ) : (
        <NoResults text={'No Videos'} />
      )}
    </div>
  )
}

export const getServerSideProps = async ({ query: { topic } }: { query: { topic: string } }) => {
  let res = null;

  if (topic) {
    res = await axios.get(`${BASE_URL}/api/discover/${topic}`);
    res.data.reverse();
  } else {
    res = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: res.data
    }
  }
}

export default Home
