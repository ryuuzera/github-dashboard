import { useUser } from '@/hooks/user';
import { GoLocation } from 'react-icons/go';
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi';
import { IoBusinessOutline } from 'react-icons/io5';

const About = () => {
  const { currentUser } = useUser();
  return (
    <>
      <div className='title'>
        <h1>About</h1>
      </div>
      <div className='content'>
        <div className='bio'>{currentUser.bio}</div>
        <ul>
          <li>
            <HiOutlineUsers />
            <h1>followers</h1>
            {currentUser.followers}
          </li>
          <li>
            <HiOutlineUserGroup />
            <h1>following</h1>
            {currentUser.following}
          </li>
          <li>
            <IoBusinessOutline />
            <h1>{currentUser.company}</h1>
          </li>
          <li>
            <GoLocation />
            <h1>{currentUser.location}</h1>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .title {
          display: flex;
          flex-direction: row;
          margin-top: 10px;
          margin-left: 10px;
          width: calc(10% - 10px);
        }
        .title h1 {
          font-size: 1rem;
          font-weight: bold;
        }
        .content {
          width: calc(100% - 20px);
          height: 90%;
          display: flex;
          flex-direction: column;
          padding: 10px;
          gap: 5px;
        }
        .content .bio {
          font-size: 0.8rem;
          margin-bottom: 5px;
          width: 100%;
          height: auto;
        }
        .content ul {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
           {
            /* background: pink; */
          }
        }
        .content ul li {
          display: flex;
          flex-direction: row;
          gap: 4px;
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
};

export default About;
