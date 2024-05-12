// components/MarkdownRenderer.tsx
import { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

interface MarkdownRendererProps {
    markdown: string;
}

export const MarkdownRenderer = ({ markdown }: MarkdownRendererProps) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        unified()
            .use(remarkParse)
            .use(remarkHtml)
            .process(markdown)
            .then((file) => {
                setContent(String(file));
            })
            .catch(err => console.error('Error processing markdown:', err));
    }, [markdown]);

    return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
