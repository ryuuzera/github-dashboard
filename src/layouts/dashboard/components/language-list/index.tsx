import { useUser } from '@/hooks/user';
import Github from '@/services/github/github.service';

import { useEffect, useState } from 'react';

function LanguageList(props: any) {
  const [isLoading, setLoading] = useState(true);
  const [languages, setLanguages] = useState({});
  const { currentUser } = useUser();

  useEffect(() => {
    (async () => {
      const languagesList = await new Github().getMostUsedLanguages(currentUser);
      setLanguages(languagesList);
    })();
  }, []);

  if (props.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul>
        {Object.entries(languages).map(([lang, percentage]: any) => (
          <li key={lang}>
            {lang}: {percentage.toFixed(2)}%
          </li>
        ))}
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
