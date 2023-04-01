import { useUser } from '@/hooks/user';
import LoadingText from '@/layouts/loading/components/loading-text';
import Github from '@/services/github/github.service';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { ReactNode, useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

function LanguageList(props: any) {
  const [isLoading, setLoading] = useState(true);
  const [languages, setLanguages] = useState({});
  const [languagesLi, setLanguagesLi] = useState<ReactNode[]>([]);
  const [actualColors, setActualColors] = useState({});
  const { currentUser } = useUser();

  useEffect(() => {
    (async () => {
      const languagesList = await new Github().getMostUsedLanguages(currentUser);
      await new Promise((resolve) => {
        setLanguages(languagesList);
        resolve(true);
      });
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <LoadingText />;
  }

  return (
    <>
      <ul>
        {Object.entries(languages).map(([lang, percentage]: any) => {
          {
            new Github().getLanguageColor(lang.toLowerCase(), (color) => {
              setActualColors((current) => {
                return {
                  ...current,
                  [lang]: color?.replace('##', '#')
                };
              });
            });
          }
          return (
            <li key={lang}>
              {lang}: <p style={{ color: actualColors[lang] }}>aaa</p>
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
          }
        `}
      </style>
    </>
  );
}
export default LanguageList;
