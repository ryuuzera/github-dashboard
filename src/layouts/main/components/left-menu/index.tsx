import Colors from '@/assets/theming/colors';
import { useUser } from '@/hooks/user';
import * as Avatar from '@radix-ui/react-avatar';
import { styled } from '@stitches/react';
import MenuList from './menu-list';

const AvatarRoot = styled(Avatar.Root, {
  borderBottom: '1px solid gainsboro',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: '45px',
  height: '45px',
  borderRadius: '100%',
});

const AvatarImage = styled(Avatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

const AvatarFallback = styled(Avatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  fontSize: '15px',
  lineHeight: 1,
  fontWeight: 500,
});

const LeftMenu = (props: any) => {
  const user = useUser().currentUser;
  return (
    <>
      <div className='container'>
        <div className='top'>
          <div className='avatar'>
            <AvatarRoot className='avatar-root'>
              <AvatarImage className='avatarImage' src={user.avatar_url} alt={user.name} />
              <AvatarFallback className='avatarFallback' delayMs={600}>
                CT
              </AvatarFallback>
            </AvatarRoot>
          </div>
          <div className='user-title'>
            <h1>{user.name}</h1>
            <h2>{user.login}</h2>
          </div>
        </div>
        <div className='menu'>
          <MenuList />
        </div>
        <div className='bottom'></div>
      </div>
      <style jsx>
        {`
          .container {
            width: calc(100% - 1px);
            height: calc(100% - 1px);
            border-top: 1px solid ${Colors.font.main};
            border-right: 1px solid ${Colors.font.main};
            background: ${Colors.background[300]}F7;
            border-radius: 0px 0px 0px 10px;
             {
              /* background: rgba(50, 0, 0, 0.2); */
            }
          }
          .top {
            width: 100%;
            height: 70px;
             {
              /* background: rgba(50, 50, 0, 0.3); */
            }
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid ${Colors.font.main};
          }
          .avatar {
            height: 100%;
            width: 30%;
            min-width: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .user-title {
            height: 100%;
            width: 70%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 4px;
          }
          .user-title h1,
          h2 {
            margin-left: 10px;
            color: ${Colors.font.hightlight};
          }
          .user-title h1 {
            font-weight: bold;
          }
          .user-title h2 {
            font-weight: 300;
          }
          .menu {
            width: 100%;
            height: calc(100% - 140px);
          }

          .bottom {
            width: 100%;
            height: 70px;
             {
              /* background: rgba(50, 50, 0, 0.3); */
            }
          }
        `}
      </style>
    </>
  );
};

export default LeftMenu;
