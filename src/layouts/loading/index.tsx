import Colors from '@/assets/theming/colors';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Images from '../../assets/next-image/exports';
import LoadingText from './components/loading-text';

const Loading = () => {
  return (
    <>
      <div className='loading'>
        <div className='center'>
          <Image src={Images.loading} height={100} width={100} quality={80} alt='loading' />
          <LoadingText />
        </div>
      </div>
      <style jsx>
        {`
          .loading {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .center {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        `}
      </style>
      
    </>
  );
};

export default Loading;
