import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { AiOutlineSend } from 'react-icons/ai';
import userAuthStore from '../../store/authStore';
import NoResults from '../NoResults/NoResults';
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { IUser } from '../../types'

interface IProps {
  isPostingComment: boolean;
  comment: string;
  comments: IComment[];
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: FormEvent) => void;
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
    _id?: string
  };
}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps): JSX.Element => {
 const { userProfile, allUsers } = userAuthStore();

 return (
  <div className="border-t-2 border-gray-200 pt-4 px-6 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
   <div className="overflow-auto lg:min-h-[300px] h-[100%] max-h-[50vh] mb-5">
    {comments?.length ? (
      comments.map((comment, index) => (
        <>
          {allUsers.map((user: IUser) => (
            user._id === (comment.postedBy._id || comment.postedBy._ref) && (
              <div className="p-2 items-center" key={index}>
                <Link href={`/profile/${user._id}`}>
                  <div className="flex items-center gap-2">
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
                <div className="mt-1">
                  <p> - {comment.comment}</p>
                </div>
              </div>
            )
          ))}
        </>
      ))
    ) : (
     <div className="pt-20">
       <NoResults text={"No comments yet"} />
     </div>
    )}
   </div>

    {userProfile && (
      <div className=" bottom-0 left-0 pb-6 px-2 w-[100%] md:px-10">
        <form
          onSubmit={addComment}
          className="flex gap-4 w-[100%]"
        >
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add comment..."
            type='text'
            className="bg-white px-6 py-4 text-md font-md border-2 w-[100%]
            border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
          />

          <button
            disabled={isPostingComment}
            type="submit"
            className="text-md text-gray-400"
          >
            <AiOutlineSend className="text-gray-500 text-3xl" />
          </button>

        </form>
      </div>
    )}
  </div>
 )
}

export default Comments;