import Colors from '@/assets/theming/colors';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import GitHubCalendar from 'react-github-calendar';
import { GiPlainCircle } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageList = ({ languages, languageColors, user }: any) => {
  const [chartProps, setChartProps] = useState<any>({});
  const [chartOptions, setChartOptions] = useState<any>({
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.data[tooltipItem.dataIndex]} %`;
          },
        },
      },
    },
  });

  const selectLast4Months = (contributions: any) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 4;

    return contributions.filter((day: any) => {
      const date = new Date(day.date);
      const monthOfDay = date.getMonth();

      return (
        date.getFullYear() === currentYear && monthOfDay > currentMonth - shownMonths && monthOfDay <= currentMonth
      );
    });
  };

  useEffect(() => {
    (async () => {
      await new Promise((resolve, reject) => {
        setChartProps((prevState: any) => ({
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
              backgroundColor: Object.entries(languages).map(([lang, percentage]: [string, any]) => {
                return languageColors[lang.toLowerCase()];
              }),
              borderWidth: 0.5,
              borderColor: Colors.background[300]
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
          <h1>Most used Languages</h1>
          {Object.entries(languages).map(([lang, percentage]: any, index: number) => {
            return (
              <li key={lang}>
                <p className='lang-name'>{lang}:</p>
                <p className='lang-color'>
                  <IconContext.Provider value={{ style: { color: `${languageColors[lang.toLowerCase()]}` } }}>
                    <GiPlainCircle />
                  </IconContext.Provider>
                </p>
                <p style={{ fontSize: '0.7rem' }}>{`${percentage.toFixed(2)} %`}</p>
              </li>
            );
          })}
        </ul>
        <div className='chart'>{chartProps.labels && <Doughnut data={chartProps} options={chartOptions} />}</div>
        <div className='contributions'>
          <h1>{`Contribution in last 4 months`}</h1>
          <GitHubCalendar
            username={user.login}
            transformData={selectLast4Months}
            transformTotalCount
            theme={{
              level4: '#39d353',
              level3: '#26a641',
              level2: '#0d743c',
              level1: '#1a4e34',
              level0: '#2d333b',
            }}
            labels={{
              totalCount: `total: {{count}}`,
            }}
          />
        </div>
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
            width: 30%;
            height: calc(100% - 30px);
            padding: 15px;
          }
          .contributions {
            width: 40%;
          }
          .contributions h1 {
            margin-bottom: 8px;
          }
          ul {
            display: flex;
            gap: 2px;
            flex-direction: column;
            width: 30%;
            height: 100%;
          }
          ul h1 {
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: 6px;
          }
          li {
            font-size: 0.75rem;
            display: flex;
            flex-direction: row;
            gap: 5px;
            align-items: center;
            width: 100%;
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
