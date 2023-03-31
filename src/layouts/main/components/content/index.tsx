import Colors from "@/assets/theming/colors";
import { useContent } from "@/hooks/main-menu";


const Content = (props: any) => {
  const { content } = useContent();

  return (
    <>
      <div className='content'>{content}</div>
      <style jsx>
        {`
          .content {
            width: 100%;
            height: 100%;
            border-top: 1px solid ${Colors.font.main};
          }
        `}
      </style>
    </>
  );
};

export default Content;
