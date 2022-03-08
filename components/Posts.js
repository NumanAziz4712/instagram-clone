import React, { useState, useEffect } from 'react';
import { Post } from './Post';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  // get the posts
  useEffect(() => {
    // refactor - since we return the unsubscribe, we doo it from here
    return onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => setPosts(snapshot.docs)
    );
    // const unsubscribe = onSnapshot(
    //   query(collection(db, 'posts'), orderBy('timestamp')),
    //   (snapshot) => setPosts(snapshot.docs)
    // );
    // ----refactor
    // const unsubscribe = onSnapshot(
    //   query(collection(db, 'posts'), orderBy('timestamp')),
    //   (snapshot) => {
    //     setPosts(snapshot.docs);
    //   }
    // );

    // return unsubscribe;

    // return () => {
    //   unsubscribe();
    // };
  }, [db]);
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImage={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
