import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { GiPlainCircle } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';

ChartJS.register(ArcElement, Tooltip, Legend);

function LanguageList({ languages, languageColors }: any) {
  return (
    <>
      <ul>
        {Object.entries(languages).map(([lang, percentage]: any, index: number) => {
          return (
            <li key={lang}>
              <p className='lang-name'>{lang}:</p>
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
          }
          li {
            font-size: 0.75rem;
            display: flex;
            flex-direction: row;
            gap: 5px;
            align-items: center;
          }
          .lang-name {
            width: 80px;
          }
          lang-color: {
            width: 70%;
          }
        `}
      </style>
    </>
  );
}
export default LanguageList;
