import { useUser } from '@/hooks/user';
import LoadingText from '@/layouts/loading/components/loading-text';
import Github, { LanguageMap } from '@/services/github/languages.service';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { GiPlainCircle } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';

ChartJS.register(ArcElement, Tooltip, Legend);

function LanguageList(props: any) {
  const [isLoading, setLoading] = useState(true);
  const [languages, setLanguages] = useState({});
  const [languageColors, setLanguagesColors] = useState<LanguageMap>({});
  const { currentUser } = useUser();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const languagesList = await new Github().getMostUsedLanguages(currentUser);
      Object.entries(languagesList).map(([language, percentage], index) => {
        if (index < 7) {
          setLanguages((current) => {
            return {
              ...current,
              [language]: percentage,
            };
          });
        }
      });
      await Promise.all(
        Object.entries(languagesList).map(([lang, percentage]: any, index: number) => {
          return new Promise((resolve) => {
            new Github().getLanguageColor(lang.toLowerCase(), (color) => {
              setLanguagesColors((current) => {
                return {
                  ...current,
                  [lang]: color?.replace('##', '#'),
                };
              });
              resolve(true);
            });
          });
        })
      );
      setLoading(false);
    })();
  }, [currentUser]);

  if (isLoading) {
    return <LoadingText />;
  }

  return (
    <>
      <ul>
        {Object.entries(languages).map(([lang, percentage]: any, index: number) => {
          return (
            <li key={lang}>
              <p className='lang-name'>{lang}: </p>
              <p className='lang-color' style={{ color: languageColors[lang], height: '1.2em', alignSelf: 'flex-end' }}>
                <IconContext.Provider value={{ style: { color: languageColors[lang] } }}>
                  <GiPlainCircle />
                </IconContext.Provider>
              </p>
            </li>
          );
        })}
      </ul>
      <style jsx>
        {`
          ul {
            display: flex;
            gap: 2px;
            flex-direction: column;
            {/* background: pink */}
          }
          li {
            font-size: 0.75rem;
            display: flex;
            flex-direction: row;
            gap: 5px;
            align-items: center;
          }
          .lang-name{
            width: 25%;
          }
          lang-color:{
            width: 70%;
          } 
        `}
      </style>
    </>
  );
}
export default LanguageList;
