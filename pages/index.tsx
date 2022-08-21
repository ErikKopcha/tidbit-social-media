import axios from 'axios'
import { IVideo } from '../types'
import VideoCard from '../components/VideoCard/VideoCard'
import NoResults from '../components/NoResults/NoResults'

interface IProps {
  videos: IVideo[];
}

const Home = (props: IProps) => {
  const {
    videos
  } = props;

  console.log(videos)

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

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: data
    }
  }
}

export default Home
