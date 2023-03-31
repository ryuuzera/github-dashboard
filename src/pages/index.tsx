import { useUser } from '@/hooks/user';
import { MainLayout } from '@/layouts/main';
import AxiosService from '@/services/http/http.axios.service';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home(props: any) {
  const user = useUser();
  user.setUser(props.user);
  return (
    <>
      <Head>
        <title>Github Dashboard</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={inter.className}>
        <MainLayout />
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  try {
    const user = await new AxiosService().get(`https://api.github.com/users/ryuuzera`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });
    console.log(user.data);
    return {
      props: {
        user: user.data,
      },
    };
  } catch (error: any) {
    console.log(error)
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
      props: {},
    };
  }
}