import Colors from '@/assets/theming/colors';
import Image from 'next/image';
import Images from '../../../assets/next-image/exports';
const createRepolink =
  'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme';

const ReadmeNotFound = () => {
  return (
    <>
      <div className='container'>
        <div className='center'>
          <Image src={Images.catCry} height={100} width={100} quality={80} alt='not-found' />
          <h1>
            Oops! We couldn't find the Readme.md file. If you're the owner, would you mind{' '}
            <a href={createRepolink} target='_blank'>
              creating a readme repo?
            </a>
            😍
          </h1>
        </div>
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
      `}</style>
      <style jsx>
        {`
          .container {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .center {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          h1 {
            font-family: 'VT323', monospace;
            color: ${Colors.font.hightlight};
            font-size: 1.3rem;
            max-width: 70%
          }
          a {
            text-decoration: none;
            color: ${Colors.font.colored};
          }
        `}
      </style>
    </>
  );
};

export default ReadmeNotFound;
