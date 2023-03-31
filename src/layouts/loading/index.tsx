import Colors from '@/assets/theming/colors';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Images from '../../assets/next-image/exports';

const Loading = () => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dots < 3) {
        setDots(dots + 1);
      } else {
        setDots(1);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [dots]);

  return (
    <>
      <div className='loading'>
        <div className='center'>
          <Image src={Images.loading} height={100} width={100} quality={80} alt='loading' />
          <h1>Loading{'.'.repeat(dots)}</h1>
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
          .center h1 {
            font-family: 'VT323', monospace;
            color: ${Colors.font.hightlight};
            font-size: 1.4rem;
          }
        `}
      </style>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
      `}</style>
    </>
  );
};

export default Loading;
