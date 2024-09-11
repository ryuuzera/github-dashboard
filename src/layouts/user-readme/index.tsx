import { useUser } from '@/hooks/user';
import axios from 'axios';
import 'github-markdown-css';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReadmeNotFound from './not-found';

const UserReadMe = () => {
  const [readmeContent, setReadmeContent] = useState('');
  const { currentUser } = useUser();

  useEffect(() => {
    (async () => {
      // const readme = await new request().getUserReadme(currentUser);
      const readme = await (async () => {
        try {
          return await (
            await axios.get(
              `https://raw.githubusercontent.com/${currentUser.login}/${currentUser.login}/main/README.md`
            )
          ).data;
        } catch (error) {
          return 'not found';
        }
      })();
      setReadmeContent(readme);
    })();
  }, [currentUser]);
  return (
    <>
      {readmeContent !== 'not found' ? (
        <div className='container'>
          <div className='center'>
            <div className='markdown-body'>
              <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]}>{readmeContent}</ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <div className='not-container'>
          <ReadmeNotFound />
        </div>
      )}
      <style jsx>
        {`
          .not-container {
            width: 100%;
            height: 100%;
          }
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
            max-width: 780px;
            background: #1d2128;
          }

          .markdown-body img {
            border-style: none;
            max-width: 100%;
            box-sizing: content-box;
            background-color: #1d2128;
          }
          markdown-body table tr {
            background-color: #1d2128 !important;
          }
          @media (max-width: 767px) {
            .markdown-body {
              padding: 15px;
            }
          }

          @media (prefers-color-scheme: dark) {
            .markdown-body {
              color-scheme: dark;
              --color-prettylights-syntax-comment: #8b949e;
              --color-prettylights-syntax-constant: #79c0ff;
              --color-prettylights-syntax-entity: #d2a8ff;
              --color-prettylights-syntax-storage-modifier-import: #c9d1d9;
              --color-prettylights-syntax-entity-tag: #7ee787;
              --color-prettylights-syntax-keyword: #ff7b72;
              --color-prettylights-syntax-string: #a5d6ff;
              --color-prettylights-syntax-variable: #ffa657;
              --color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
              --color-prettylights-syntax-invalid-illegal-text: #f0f6fc;
              --color-prettylights-syntax-invalid-illegal-bg: #8e1519;
              --color-prettylights-syntax-carriage-return-text: #f0f6fc;
              --color-prettylights-syntax-carriage-return-bg: #b62324;
              --color-prettylights-syntax-string-regexp: #7ee787;
              --color-prettylights-syntax-markup-list: #f2cc60;
              --color-prettylights-syntax-markup-heading: #1f6feb;
              --color-prettylights-syntax-markup-italic: #c9d1d9;
              --color-prettylights-syntax-markup-bold: #c9d1d9;
              --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
              --color-prettylights-syntax-markup-deleted-bg: #67060c;
              --color-prettylights-syntax-markup-inserted-text: #aff5b4;
              --color-prettylights-syntax-markup-inserted-bg: #033a16;
              --color-prettylights-syntax-markup-changed-text: #ffdfb6;
              --color-prettylights-syntax-markup-changed-bg: #5a1e02;
              --color-prettylights-syntax-markup-ignored-text: #c9d1d9;
              --color-prettylights-syntax-markup-ignored-bg: #1158c7;
              --color-prettylights-syntax-meta-diff-range: #d2a8ff;
              --color-prettylights-syntax-brackethighlighter-angle: #8b949e;
              --color-prettylights-syntax-sublimelinter-gutter-mark: #484f58;
              --color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
              --color-fg-default: #c9d1d9;
              --color-fg-muted: #8b949e;
              --color-fg-subtle: #6e7681;
              --color-canvas-default: #1d2128;
              --color-canvas-subtle: #1d2128;
              --color-border-default: #30363d;
              --color-border-muted: #21262d;
              --color-neutral-muted: rgba(110, 118, 129, 0.4);
              --color-accent-fg: #58a6ff;
              --color-accent-emphasis: #1f6feb;
              --color-attention-subtle: rgba(187, 128, 9, 0.15);
              --color-danger-fg: #f85149;
              --bgColor-default: #1d2128;
            }
          }
        `}
      </style>
    </>
  );
};

export default UserReadMe;
