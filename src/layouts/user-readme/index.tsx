import { useUser } from '@/hooks/user';
import request from '@/services/github/github.users.service';
import 'github-markdown-css';
import { ReactNode, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

const UserReadMe = () => {
  const [readmeContent, setReadmeContent] = useState('');
  const { currentUser } = useUser();
  const [content, setContent] = useState<ReactNode>(
    <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]}>{readmeContent}</ReactMarkdown>
  );

  useEffect(() => {
    console.log('rodou');
    (async () => {
      const readme = await new request().getUserReadme(currentUser);
      setReadmeContent(readme);
    })();
  }, [currentUser]);
  return (
    <>
      <div className='container'>
        <div className='center'>
          <div className='markdown-body'>
            nada
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            width: calc(100% - 2px);
            height: calc(100% - 2px);
            display: flex;
            align-items: center;
            justify-content: center;
            max-height: 640px;
          }
          .center {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            width: 100%;
            height: 100%;
            min-width: 600px;
          }
          .markdown-body {
            box-sizing: border-box;
            margin: 0 auto;
            padding: 40px 40px;
            width: 100%;
            background: #1d2128;
          }

          @media (max-width: 767px) {
            .markdown-body {
              padding: 15px;
            }
          }
        `}
      </style>
    </>
  );
};

export default UserReadMe;
