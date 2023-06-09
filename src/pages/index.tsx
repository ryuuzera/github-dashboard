import { useUser } from '@/hooks/user';
import { MainLayout } from '@/layouts/main';
import GithubUsers from '@/services/github/github.users.service';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home(props: any) {
  const user = useUser();
  useEffect(() => {
    (async () => {
      const updatedUser = await new GithubUsers().getUserbyName('ryuuzera');
      user.setUser(updatedUser);
    })();
  }, []);
  return (
    <>
      <Head>
        <title>Github Dashboard</title>
        <meta name='description' content='Github dashboard' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={inter.className}>
        <MainLayout />
      </div>
    </>
  );
}
