import { useEffect, useState } from 'react';
import Loading from '../loading';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 2000);
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='container'>
            <div className="center">

            </div>
          </div>
          <style jsx>{`
            .container {
              width: calc(100% - 2px);
              height: calc(100% - 2px);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .center {
              width: calc(90% - 2px);
              height: calc(90% - 2px);
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid gray;
            }
            `}</style>
        </>
      )}
    </>
  );
};

export default Dashboard;
