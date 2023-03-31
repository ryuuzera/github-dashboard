import Colors from '@/assets/theming/colors';
import { GitPullRequest } from 'lucide-react';
import styles from './styles';

const macColors = {
  buttonMaximize: '#f4be30',
  buttonClose: '#f2605a',
  buttonMinimize: '#48b03a',
};

const Header = (props: any) => {
  const styleProps = () => 
  {
    return {
      props: {
        Colors,
        macColors
      }
    }
  }
  const css = styles(styleProps())
  return (
    <>
      <div className='header'>
        <div className='buttons'>
          <div className='left'></div>
          <div className='center'></div>
          <div className='right'></div>
        </div>
        <form className='form' onSubmit={props.handleFindUser}>
          <div className='content'>
            <input placeholder='github username' className='userInput' name='user' ref={props.refs.user} />
            <button className='submitButton' type='submit'>
              <GitPullRequest fill={Colors.font.main} size={12} />
            </button>
          </div>
        </form>
        <div className='right-side'></div>
      </div>
      <style jsx>{`${css}`}</style>
    </>
  );
};

export default Header;
