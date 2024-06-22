// File: MarkdownWithCodeBlock.tsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, dracula, vscDarkPlus, coy, oneLight  } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'highlight.js/styles/github.css';
import rehypeRaw from 'rehype-raw';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from '../../styles/RenderMarkdown.module.css';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { BlockQuote } from './BlockQuote';

interface RenderMarkdown {
  content: string;
}

const CodeBlock = ({ language, value, fileName }) => {
  const [copy, setCopy] = useState(false);
  return (
    <div className="w-full min-w-[25rem] bg-[#f5f5f5] rounded-md overflow-hidden shadow-lg">
      <div className="flex justify-between px-4 text-black text-xs items-center align-items-center">
          <p className="text-sm">{fileName}</p>
          {copy ? (
            <button className="py-1 inline-flex items-center gap-1">
              <span className="text-base mt-1">
                <img src="/assets/icons/checkmark-svgrepo-com.svg" alt="Copy code" className={styles.iconCheckMark} />
              </span>
              Copied!
            </button>
          ) : (
            <button className="py-1 inline-flex items-center gap-1"
              onClick={() => {
                navigator.clipboard.writeText(value);
                setCopy(true);
                setTimeout(() => setCopy(false), 3000);
              }}>
              <span className="text-base mt-1">
                <img src="/assets/icons/clipboard-outline.svg" alt="Copy code" className={styles.iconClipBoard} />
              </span>
              Copy
            </button>
          )}
      </div>
      <div className={styles.divScroll} style={{ maxWidth: '100%', maxHeight: '300px', overflowX: 'auto', overflowY: 'auto' }}>
          <SyntaxHighlighter
            language={language}
            style={oneLight}
            customStyle={{
              margin: '0',
              borderRadius: '0.5rem',
              backgroundColor: 'white'
            }}
            showLineNumbers={true}
            wrapLongLines={true}
            lineProps={{ style: { flexWrap: 'wrap' } }}
          >
            {value}
          </SyntaxHighlighter>
      </div>
    </div>
  );
};

export const RenderMarkdown: React.FC<RenderMarkdown> = ({ content }) => {
  const components = {
    code({node, inline, className, children, ...props}) {
      console.log("content: ", content);
      const match = /language-(\w+)/.exec(className || '')
      let fileName = '';
      if (node.position && node.position.start) {
        const lines = content.split('\n');
        const lineContent = lines[node.position.start.line - 2]; // Truy cập dòng trước đó
        const fileMatch = /<!-- filename: (.+) -->/.exec(lineContent);
        // &lt;!-- filename: example.js --&gt;<br />
        if (fileMatch) {
          fileName = fileMatch[1];
        }
      }
      return !inline && match ? (
        <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} fileName={fileName} />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <ReactMarkdown
      children={content}
      components={components}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      remarkPlugins={[remarkGfm]}
    />
  );
};

