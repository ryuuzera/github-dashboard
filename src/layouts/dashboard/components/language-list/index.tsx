import { useUser } from '@/hooks/user';

import axios from 'axios';
import { useEffect, useState } from 'react';

function LanguageList() {
  const [isLoading, setLoading] = useState(true);
  const [languages, setLanguages] = useState({});
  const { currentUser } = useUser();

  useEffect(() => {
    (async () => {
      const repos = await axios.get(`${currentUser.repos_url}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      });

      const tempLanguages: any = {};

      for (const repo of repos.data) {
        const res = await axios.get(`https://api.github.com/repos/${currentUser.login}/${repo.name}/languages`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        });

        for (const [lang, bytes] of Object.entries(res.data)) {
          tempLanguages[lang] = (tempLanguages[lang] || 0) + bytes;
        }
      }

      const totalBytes = Object.values(tempLanguages).reduce((total, bytes) => total + bytes, 0);

      const tempLanguagesPercentages: any = {};
      for (const [lang, bytes] of Object.entries(tempLanguages)) {
        const percentage = (bytes / totalBytes) * 100;
        tempLanguagesPercentages[lang] = percentage;
      }

      const sortedObj = Object.fromEntries(Object.entries(tempLanguagesPercentages).sort(([, a], [, b]) => b - a));
      setLanguages(sortedObj);
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
     <ul>
      {Object.entries(languages).map(([lang, percentage]) => (
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
