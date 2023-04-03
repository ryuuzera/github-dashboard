import Colors from '@/assets/theming/colors';
import { useContent } from '@/hooks/main-menu';

const Content = (props: any) => {
  const { content } = useContent();

  return (
    <>
      <div className='content'>{content}</div>
      <style jsx>
        {`
          .content {
            width: calc(100% - 1px);
            height: calc(100% - 1px);
            background: ${Colors.background[300]};
            border-top: 1px solid ${Colors.font.main};
            border-radius: 0px 0px 9px 0px;
          }
        `}
      </style>
    </>
  );
};

export default Content;
