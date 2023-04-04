import Colors from '@/assets/theming/colors';
import { useUser } from '@/hooks/user';
import { PinnedRepo, PinnedRepos } from '@/services/github/github.repos.pinned';
import GithubUsers from '@/services/github/github.users.service';
import Github, { LanguageMap } from '@/services/github/languages.service';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import LanguageList from './components/language-list';
import PinnedRepoCard from './components/pinned-repos';
import About from './components/about';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useUser();
  const [userData, setUserData] = useState<any>({});
  const [languages, setLanguages] = useState({});
  const [languageColors, setLanguagesColors] = useState<LanguageMap>({});
  const [pinnedRepos, setPinnedRepos] = useState<PinnedRepo[]>([{}] as PinnedRepo[]);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      await new Promise(async (resolve) => {
        try {
          const pinnedResposResponse = await new PinnedRepos().getPinnedRepos(currentUser.login);
          const commitsResponse = await new GithubUsers().getUserCommitsByLogin(currentUser.login);
          const followersResponse = await new GithubUsers().getUserFollowers(currentUser);

          const commits = commitsResponse.total_count;
          const followers = followersResponse.length;

          const colors = await new Github().getLanguageColors();
          setLanguagesColors({ ...colors, others: '#444444' });
          setUserData({ commits, followers });
          setPinnedRepos(pinnedResposResponse);
          resolve(true);
        } catch (error) {
          console.log(error);
        }
      });
      const languagesList = await new Github().getMostUsedLanguages(currentUser);
      let othersPercent = 0;
      setLanguages({});
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
                <LanguageList languages={languages} languageColors={languageColors} user={currentUser} />
              </div>
              {pinnedRepos.length > 0 && (
                <div className='highlights-content'>
                  <h1>{`Highlights `}</h1>
                  <div className='pinned-repos'>
                    {pinnedRepos.map((repo) => {
                      return <PinnedRepoCard repo={repo} />;
                    })}
                    <div
                      className='invisible-padding'
                      style={{
                        width: '100%',
                        height: '10px',
                        background: 'transparent',
                      }}></div>
                  </div>
                </div>
              )}

              <div className='card-information'>
                <About />
              </div>
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
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          display: flex;
          flex-direction: column;
        }
        .card-languages {
          background: ${Colors.background[100]};
          border: 1px solid ${Colors.background[400]};
          display: flex;
          flex-direction: column;
          padding: 15px;
          height: 170px;
          margin-top: 15px;
          margin-left: 15px;
          margin-right: 15px;
          border-radius: 8px;
          color: ${Colors.font.hightlight};
        }
        .highlights-content {
          display: flex;
          flex-direction: column;
          background: ${Colors.background[100]};
          border: 1px solid ${Colors.background[400]};
          padding: 10px;
          height: 200px;
          margin-top: 15px;
          margin-left: 15px;
          margin-right: 15px;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          overflow-y: auto;

          color: ${Colors.font.hightlight};
        }
        .highlights-content h1 {
          width: 100%;
          height: 10%;
          margin-bottom: 10px;
          margin-top: 15px;
          font-weight: bold;
        }
        .pinned-repos {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          height: 90%;
          align-items: center;
          justify-content: space-evenly;
        }
        .card-information {
          background: ${Colors.background[100]};
          border: 1px solid ${Colors.background[400]};
          display: flex;
          flex-direction: column;
          padding: 0px;
          height: 90px;
          margin-top: 15px;
          margin-left: 15px;
          margin-right: 15px;
          border-radius: 8px;
          color: ${Colors.font.hightlight};
        }
        .card-information .title {
          display: flex;
          flex-direction: row;
          margin-top: 10px;
          margin-left: 10px;
          width: calc(10% - 10px);
        }
        .card-information .title h1 {
          font-size: 1rem;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
