import Colors from '@/assets/theming/colors';
import { useUser } from '@/hooks/user';
import Github, { LanguageMap } from '@/services/github/languages.service';
import AxiosService from '@/services/http/axios/http.axios.service';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import LanguageList from './components/language-list';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useUser();
  const [userData, setUserData] = useState<any>({});
  const [languages, setLanguages] = useState({});
  const [languageColors, setLanguagesColors] = useState<LanguageMap>({});

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

          const colors = await new Github().fetchLanguageColors()
          setLanguagesColors(colors);
          console.log(colors);

          setUserData({ commits, followers });
          resolve(true);
        } catch (error) {
          console.log(error);
        }
      });
      const languagesList = await new Github().getMostUsedLanguages(currentUser);
      let othersPercent = 0;
      Object.entries(languagesList).forEach(([language, percentage], index) => {
        if (index < 6) {
          setLanguages((current) => {
            return {
              ...current,
              [language]: percentage,
            };
          });
        } else if (index === Object.entries(languagesList).length - 1 && othersPercent > 0) {
          setLanguages((current) => {
            return {
              ...current,
              Others: othersPercent + Number(percentage),
            };
          });
        } else {
          othersPercent = othersPercent + Number(percentage);
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
        <div className='container'>
          {currentUser.login && (
            <div className='center'>
              <div className='card-languages'>
                <LanguageList languages={languages} languageColors={languageColors} />
              </div>
              <div className='card-commits'>{userData.commits}</div>
              <div className='card-followers'>{userData.followers}</div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .container {
          position: relative;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .center {
          visibility: ${isLoading ? 'hidden' : 'visible'};
          width: calc(90% - 2px);
          height: calc(90% - 2px);
          display: flex;
          border: 1px solid gray;
          flex-direction: column;
        }
        .card-languages {
          background: ${Colors.background[400]};
          display: flex;
          flex-direction: column;
          padding: 15px;
          height: 150px;
          margin: 15px;
          border-radius: 8px;
          color: ${Colors.font.hightlight};
        }
      `}</style>
    </>
  );
};

export default Dashboard;
