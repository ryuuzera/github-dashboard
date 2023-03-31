import { useUser } from '@/hooks/user';
import AxiosService from '@/services/http/http.axios.service';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import LanguageList from './components/language-list';
import Colors from '@/assets/theming/colors';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useUser();
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    (async () => {
      await new Promise(async (resolve) => {
        try {
          const commitsResponse = await new AxiosService().get(
            `https://api.github.com/search/commits?q=author:${currentUser.login}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              },
            }
          );
          const followersResponse = await new AxiosService().get(currentUser.followers_url, {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            },
          });

          const commits = commitsResponse.data.total_count;

          const followers = followersResponse.data.length;

          setUserData({ commits, followers });
          resolve(true);
        } catch (error) {
          console.log(error);
        }
      });
      setIsLoading(false);
    })();
  }, [currentUser]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='container'>
            <div className='center'>
              <div className='card-languages'>
                <LanguageList />
              </div>
              <div className='card-commits'>{userData.commits}</div>
              <div className='card-followers'>{userData.followers}</div>
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
              {/* align-items: center; */}
              {/* justify-content: center; */}
              border: 1px solid gray;
              flex-direction: column;
            }
            .card-languages {
              background: ${Colors.background[400]};
              display: flex;
              flex-direction: column;
              padding: 15px;
              width: 300px;
              height: 150px;
              margin: 15px;
              border-radius: 8px;
              color: ${Colors.font.hightlight};
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default Dashboard;
