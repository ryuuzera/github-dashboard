import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { GiPlainCircle } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageList = ({ languages, languageColors }: any) => {
  const [chartProps, setChartProps] = useState<any>({});
  const [chartOptions, setChartOptions] = useState<any>({
    plugins: {
      legend: {
        display: false,
      },
    },
  });

  useEffect(() => {
    (async () => {
      await new Promise((resolve, reject) => {
        setChartProps((prevState: any) => ({
          ...prevState,
          labels: Object.entries(languages).map(([lang, percentage]) => {
            return `${lang}`
              .toLowerCase()
              .split(' ')
              .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
              .join(' ');
          }),
          datasets: [
            {
              data: Object.entries(languages).map(([lang, percentage]: [string, any]) => {
                return percentage.toFixed(2);
              }),
            },
          ],
        }));
        resolve(true);
      });
    })();

    console.log(chartProps);
  }, [languages]);

  return (
    <>
      <div className='languages'>
        <ul>
          {Object.entries(languages).map(([lang, percentage]: any, index: number) => {
            return (
              <li key={lang}>
                <p className='lang-name'>{lang}:</p>
                <p
                  className='lang-color'
                  style={{ color: `${languageColors[lang.toLowerCase()]}`, height: '1.2em', alignSelf: 'flex-end' }}>
                  <IconContext.Provider value={{ style: { color: `${languageColors[lang.toLowerCase()]}` } }}>
                    <GiPlainCircle />
                  </IconContext.Provider>
                </p>
              </li>
            );
          })}
        </ul>
        <div className='chart'>{chartProps.labels && <Doughnut data={chartProps} options={chartOptions} />}</div>
      </div>

      <style jsx>
        {`
          .languages {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
          }
          .chart {
            display: flex;
            flex-direction: row;
            width: 60%;
            height: 100%;
          }
          ul {
            display: flex;
            gap: 2px;
            flex-direction: column;
            width: 40%;
            height: 100%;
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
};
export default LanguageList;
