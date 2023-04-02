import Colors from '@/assets/theming/colors';
import { PinnedRepo } from '@/services/github/github.repos.pinned';
import { Tooltip } from '@mui/material/';
import { IconContext } from 'react-icons';
import { CiStar } from 'react-icons/ci';
import { FaGithubAlt } from 'react-icons/fa';
import { GiPlainCircle } from 'react-icons/gi';

const PinnedRepoCard = (props: any) => {
  const repo = props.repo as PinnedRepo;
  return (
    <>
      <div className='container'>
        <div className='title'>
          <FaGithubAlt />
          <Tooltip
            title={
              repo.description && (
                <>
                  <h1 style={{ margin: '6px' }}>{repo.description}</h1>
                </>
              )
            }
            componentsProps={{
              tooltip: { sx: { backgroundColor: '#2d333b', fontSize: '0.9rem' } },
              arrow: { sx: { color: '#2d333b' } },
            }}
            arrow>
            <a href={repo.link} target='_blank'>
              <h1>{repo.repo}</h1>
            </a>
          </Tooltip>

          <a className='stargazers' href={`${repo.link}/stargazers`} target='_blank'>
            <div className='star-div'>
              <CiStar />
              <h1>{repo.stars}</h1>
            </div>
          </a>
        </div>
        <div className='repo-language'>
          <h1>{repo.language}</h1>
          <IconContext.Provider value={{ size: '0.5rem', style: { color: `${repo.languageColor}` } }}>
            <GiPlainCircle />
          </IconContext.Provider>
        </div>
        {}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 3px;
          border: 1px solid ${Colors.background[200]};
          border-radius: 8px;
          width: 46%;
          height: 75px;
          margin: 5px;
        }
        .container .title {
          position: relative;
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 25%;
          padding: 10px;
          align-items: center;
          gap: 10px;
          vertical-align: middle;
        }
        .container .title a {
          text-decoration: none;
          color: ${Colors.font.colored};
        }
        .continer .title a:hover {
          text-decoration: underline;
        }

        .container .title .stargazers {
          color: ${Colors.font.hightlight};
          transition: all 0.2s;
        }
        .container .title .stargazers:hover {
          color: ${Colors.font.colored};
        }
        .container .title .star-div {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          flex-direction: row;
          background: ${Colors.background[200]};
          padding: 3px 15px;
          border-radius: 12px;
          gap: 5px;
          transition: background 0.2s ease-in-out
        }
        .container .title .star-div:hover {
          background: #313741
        }

        .container .repo-language {
          display: flex;
          flex-direction: row;
          gap: 5px;
          align-items: center;
          margin: 10px;
        }
        .container .repo-language h1 {
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
};

export default PinnedRepoCard;
