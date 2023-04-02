import { PinnedRepo } from '@/services/github/github.repos.pinned';
import { Book } from 'lucide-react';
import { GiBlackBook } from 'react-icons/gi';

const PinnedRepoCard = (props: any) => {
  const repo = props.repo as PinnedRepo;
  return (
    <>
      <div className='container'>
        <div className='title'><GiBlackBook /><h1>{repo.repo}</h1>{repo.stars}</div>

        {/* {repo.language} */}
        {}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          gap: 3px;
          border: 1px solid white;
          width: 46%;
          height: 75px;
          margin: 5px;
        }
        .container .title {
          display: flex;
          flex-direction: row;
          width: 100%;

        }
      `}</style>
    </>
  );
};

export default PinnedRepoCard;
