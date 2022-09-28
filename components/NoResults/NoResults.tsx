// import { MdOutlineVideocamOff } from 'react-icons/all';
import { BiCommentX } from 'react-icons/bi';
import { MdOutlineVideocamOff } from 'react-icons/md'

interface IProps {
  text: string
}

const NoResults = ({ text }: IProps): JSX.Element => {
  const commentText = 'No comments yet';

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        {text === commentText ? (
          <BiCommentX />
        ) : (
          <MdOutlineVideocamOff />
        )}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  )
}

export default NoResults;