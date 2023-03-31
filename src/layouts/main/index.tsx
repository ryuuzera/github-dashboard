import Image from 'next/image';
import { useRef } from 'react';
import Images from '../../assets/next-image/exports';
import Header from './components/header';
import LeftMenu from './components/left-menu';
import styles from './styles';
import Content from './components/content'
import Colors from '@/assets/theming/colors';
import { ContentProvider } from '@/hooks/main-menu';

interface IRefs {
  user: any;
}
const MainLayout = () => {
  const styleProps = () => {
    return {
      props: {
        
      },
    };
  };
  const refs: IRefs = {
    user: useRef(),
  };
  return (
    <>
    <ContentProvider>
      <div className='main'>
        <Image alt='background' src={Images.background} className='background' fill quality={80} />
        <div className='container'>
          <div className='window'>
            <Header refs={refs} />
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
