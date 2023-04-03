import css from 'styled-jsx/css';

const styles = ({ props }: any) => {
  return css`
    .header {
      height: 32px;
      width: 100%;
      border-radius: 8px 8px 0px 0px;
      background: ${props.Colors.background['200']}e7;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .buttons {
      height: 100%;
      width: 90px;
      display: flex;
      flex-direction: row;
      gap: 4px;
      align-items: center;
      justify-content: space-evenly;
      margin-left: 4px;
    }
    .buttons .left {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${props.macColors.buttonClose};
    }
    .buttons .right {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${props.macColors.buttonMinimize};
    }
    .buttons .center {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${props.macColors.buttonMaximize};
    }
    .form {
      height: 100%;
      width: 70%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .content {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .content input {
      border: 0.5px solid ${props.Colors.font.main};
      outline: none;
      height: 16px;
      width: 230px;
      border-radius: 4px;
      background: ${props.Colors.background['100']};
      color: ${props.Colors.font.main};
      padding: 4px 8px;
      font-size: 1rem;
    }
    .content input:focus {
      outline: none;
    }
    .content input:hover {
      outline: none;
    }
    .submitButton {
      position: absolute;
      top: 50%;
      right: 5px;
      height: 75%;
      padding: 0 10px;
      border: none;
      background: rgba(0, 0, 0, 0);
      border: 1px solid ${props.Colors.font.main};
      color: ${props.Colors.font.main};
      font-size: 1rem;
      cursor: pointer;
      border-radius: 4px;
      transform: translate(0, -50%);
    }
    .submitButton:hover {
      backgrond: rgba(255, 255, 255, 0.8);
    }
    .userInput {
      padding-right: 60px; /* deixe espaço para o botão */
    }
    .icon {
      pointer-events: none;
    }
  `;
};
export default styles;
