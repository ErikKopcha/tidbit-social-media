import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import userAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { topics } from '../utils/constants';

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const router = useRouter();

  const { userProfile }: { userProfile: any } = userAuthStore();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);

      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
        });
    } else {
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (
      caption &&
      videoAsset?._id &&
      topic
    ) {
      setSavingPost(true);

      await axios.post('http://localhost:3000/api/post', {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic,
      });

      router.push('/');
    }
  }

  return (
    <div className="flex w-full h-full absolute left-0 right-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="w-[80%] bg-white rounded-lg xl:h-[80vh] flex gap-20 flex-wrap justify-center items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">Post a video to your account</p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 min-w-[260px] min-h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] max-w-[100%] mt-16 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label htmlFor="upload-video" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          Upload Video
                        </p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM, or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className="bg-[#f61997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        SelectFile
                      </p>
                    </div>
                    <input
                      onChange={uploadVideo}
                      type="file"
                      name="upload-video"
                      id="upload-video"
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Please select a correct video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium" htmlFor="caption">Caption</label>
          <input
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            id="caption"
            type="text"
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />

          <label htmlFor="topic">Choose a Topic</label>
          <select
            onChange={(e) => setTopic(e.target.value)}
            id="topic"
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 rounded cursor-pointer"
          >
            {topics.map(topic => (
              <option
                value={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                key={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>

          <div className="flex gap-6 mt-10">
            <button
              disabled={savingPost}
              onClick={() => {}}
              type="button"
              style={{ border: '2px solid rgb(209, 213, 219)' }}
              className="text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              disabled={savingPost}
              onClick={handlePost}
              type="button"
              className="bg-[#F51997] text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload;