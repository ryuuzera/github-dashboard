import Colors from '@/assets/theming/colors';
import { useEffect, useState } from 'react';

const LoadingText = () => {
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
      <h1>Loading{'.'.repeat(dots)}</h1>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
      `}</style>
      <style jsx>
        {`
          h1 {
            font-family: 'VT323', monospace;
            color: ${Colors.font.hightlight};
            font-size: 1.4rem;
          }
        `}
      </style>
    </>
  );
};

export default LoadingText;
