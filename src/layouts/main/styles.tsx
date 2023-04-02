import css from 'styled-jsx/css';
import Colors from '../../assets/theming/colors';

export default css`
  .main {
    width: 100vw;
    height: 100vh;
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: 1;
  }
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    backdrop-filter: blur(4px);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .window {
    display: flex;
    flex-direction: column;
    background: ${Colors.background['300']};
    border: 0.5px solid ${Colors.font.main};
    height: 80%;
    width: 90%;
    max-width: 1080px;
    min-height: 600px;
    z-index: 3;
    border-radius: 12px;
  }
  .window-content {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
  }
  .left-side {
    width: 30%;
    max-width: 230px;
    height: 100%;
  }
  .right-side {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    .window {
      max-width: 700px;
      height: 70%;
    }
  }
`;
