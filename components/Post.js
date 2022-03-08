import React, { useEffect, useState } from 'react';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/outline';
// import { HeartIconFilled } from '@heroicons/react/solid';
import {
  PaperAirplaneIcon,
  DotsHorizontalIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  doc,
  setDoc,
  query,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import Moment from 'react-moment';

export const Post = ({ id, userImage, username, caption, img }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // get the comments
  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  // likes
  useEffect(() => {
    return onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db, id]);

  // like removal logic - delete the like from db if alreadt liked

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  // add the logic to db -- likes
  const likePost = async () => {
    if (hasLiked) {
      // delete the doc
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session?.user.username,
      });
    }
  };
  console.log(hasLiked);
  // comments
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className='bg-white my-7 border rounded-sm'>
      {/* header */}
      <div className='flex items-center p-5 '>
        <img
          src={userImage}
          className='h-12 w-12 border p-1 mr-3 rounded-full object-contain'
        />
        <p className='mr-auto font-bold'>{username}</p>
        <DotsHorizontalIcon className='h-5' />
      </div>
      {/* image */}
      <img src={img} alt='' className='object-cover w-full' />

      {/* buttons */}

      {session && (
        <div className='flex justify-between items-center pt-4 px-4'>
          <div className='flex items-center gap-3 '>
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className='btn text-red-500 fill-red-500'
              />
            ) : (
              <HeartIconFilled onClick={likePost} className='btn' />
            )}
            <ChatIcon className='btn' />
            <PaperAirplaneIcon className='btn' />
          </div>
          <BookmarkIcon className='btn' />
        </div>
      )}

      {/* caption */}
      <p className='p-5 truncate'>
        {likes.length > 0 && (
          <p className='mb-1'>
            {likes.length} <span className='text-gray-600'>likes</span>
          </p>
        )}
        <span className='font-bold mr-1'>{username}</span> {caption}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className='ml-10   overflow-y-scroll scrollbar-thumb-rose-500 scrollbar-track-red-100 scrollbar-thin h-20'>
          {comments.map((comment) => (
            <div key={comment.id} className='flex gap-2 items-center mb-3'>
              <img
                className='rounded-full h-7 '
                src={comment.data().userImage}
              />
              <p className='font-bold'>{comment.data().username}</p>

              <p className='text-sm flex-1 '>{comment.data().comment}</p>

              {/* time  */}
              <Moment className='pr-5 flex-none text-xs' fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7' />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type='text'
            placeholder='Add a comment...'
            className='border-none flex-1 focus:ring-0'
          />
          <button
            className='font-semibold text-blue-400'
            type='submit'
            disabled={!comment.trim()}
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};
