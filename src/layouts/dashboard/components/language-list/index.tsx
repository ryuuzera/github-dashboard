import { useUser } from '@/hooks/user';
import LoadingText from '@/layouts/loading/components/loading-text';
import Github, { LanguageMap } from '@/services/github/languages.service';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';

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
      await new Promise((resolve) => {
        setLanguages(languagesList);
        resolve(true);
      });
      setLoading(false);
    })();
  }, [currentUser]);

  if (isLoading) {
    return <LoadingText />;
  }

  return (
    <>
      <ul>
        {Object.entries(languages).map(([lang, percentage]: any) => {
          {
            new Github().getLanguageColor(lang.toLowerCase(), (color) => {
              setLanguagesColors((current) => {
                return {
                  ...current,
                  [lang]: color?.replace('##', '#'),
                };
              });
            });
          }
          return (
            <li key={lang}>
              {lang}: <p style={{ color: languageColors[lang] }}>{`${percentage.toFixed(2)}%`}</p>
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
          li {
            font-size: 0.75rem;
          }
        `}
      </style>
    </>
  );
}
export default LanguageList;
