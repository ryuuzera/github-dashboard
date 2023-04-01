import { ContentProvider } from '@/hooks/main-menu';
import { useUser } from '@/hooks/user';
import Image from 'next/image';
import { useRef } from 'react';
import Images from '../../assets/next-image/exports';
import request from '../../services/http/axios/http.instance';
import Content from './components/content';
import Header from './components/header';
import LeftMenu from './components/left-menu';
import styles from './styles';

interface IRefs {
  user: any;
}
const MainLayout = (props: any) => {
  const styleProps = () => {
    return {
      props: {},
    };
  };
  const refs: IRefs = {
    user: useRef(),
  };

  const { currentUser, setUser } = useUser();

  const handleFindUser = (e: any) => {
    e.preventDefault();
    console.log(`clicou`);
    (async () => {
      const user = await request.get(`https://api.github.com/users/${refs.user.current.value}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      });
      if (user) {
        setUser(user.data);
      }
    })();
  };
  return (
    <>
      <ContentProvider>
        <div className='main'>
          <Image alt='background' src={Images.background} className='background' fill quality={80} />
          <div className='container'>
            <div className='window'>
              <Header handleFindUser={handleFindUser} refs={refs} />
              <div className='window-content'>
                <div className='left-side'>
                  <LeftMenu />
                </div>
                <div className='right-side'>
                  <Content />
                </div>
              </div>
              {/* TODO: Add here the main window */}
            </div>
          </div>
        </div>
      </ContentProvider>
      <style jsx>{styles}</style>
    </>
  );
};

export { MainLayout };
