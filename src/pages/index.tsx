/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { jsonPlaceHolderServices } from '../services';
import { RequestStatus } from '../shared/enums';
import { getUserPosts } from '../shared/helpers';
import { UserPosts } from '../shared/interfaces';
import styles from '../styles/Home.module.css';

type Props = {
  userPosts?: UserPosts[];
  status?: RequestStatus;
};

const Home: NextPage<Props> = ({ status, userPosts: userPostsServerSide }) => {
  const [userPosts, setUserPosts] = useState('');

  const handleSetUserPosts = () => {
    if (userPostsServerSide) {
      setUserPosts(JSON.stringify(userPostsServerSide, null, 2));
    }
  };

  const cleanUserPosts = () => setUserPosts('');

  useEffect(() => {
    if (status === RequestStatus.ERROR) {
      cleanUserPosts();
      toast.error(status);
    } else {
      handleSetUserPosts();
    }
  }, [status, userPostsServerSide]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to my Multivision/Winprovit test!</title>
        <meta
          name="description"
          content="Welcome to my Multivision/Winprovit test!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my Multivision/Winprovit test!
        </h1>

        <pre className={styles.codeContainer}>
          <code>{userPosts}</code>
        </pre>
      </main>

      <footer className={styles.footer}>
        <a href="" role="footer" target="_blank" rel="noopener noreferrer">
          Powered by Lucas Ferreira
        </a>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const users = await jsonPlaceHolderServices.getUsers();
    const posts = await jsonPlaceHolderServices.getPosts();
    const userPosts = getUserPosts({
      users,
      posts,
    });
    console.log({ users, posts, userPosts });
    return {
      props: {
        userPosts,
        status: RequestStatus.OK,
      },
    };
  } catch (e) {
    return {
      props: {
        status: RequestStatus.ERROR,
      },
    };
  }
}

export default Home;
