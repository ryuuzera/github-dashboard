import css from 'styled-jsx/css';

const styles = ({props}: any) => {
  return css`
    .list {
      display: flex;
      flex-direction: column;
    }

    .item {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      text-align: center;
      color: ${props.Colors.font.hightlight};
      cursor: pointer;
      transition: background 0.2s;
    }

    .item:hover {
      background: ${props.Colors.background[200]};
    }

    .item p {
      margin-left: 15px;
      pointer-events: none;
    }

    .item .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      margin-left: 10px;
      height: 100%;
      pointer-events: none;
    }
  `;
};

export default styles;
