import React from 'react';
import Katex from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';

const mathRegex = /(\$\$)([\s\S]*?)(\$\$)|(\$)([^\$]*?)(\$)/g;

function parseMathExpressions(content) {
  let result = [];
  let lastIndex = 0;

  content.replace(mathRegex, (match, p1, p2, p3, p4, p5, p6, index) => {
    if (index > lastIndex) {
      result.push({ type: 'text', content: content.slice(lastIndex, index) });
    }

    if (p1 && p3) {
      result.push({ type: 'math', content: p2.trim(), display: 'block' });
    } else if (p4 && p6) {
      result.push({ type: 'math', content: p5.trim(), display: 'inline' });
    }

    lastIndex = index + match.length;
  });

  if (lastIndex < content.length) {
    result.push({ type: 'text', content: content.slice(lastIndex) });
  }

  return result;
}

export const BlockMath = ({ children }) => {
  const content = React.Children.toArray(children).map(child => (typeof child === 'string' ? child : '')).join('');
  const elements = parseMathExpressions(content);
  //console.log("elements BlockMath = ", elements)

  return (
    <div>
      {elements.map((element, index) => {
        if (element.type === 'math') {
          return <Katex key={index} math={element.content} displayMode={element.display === 'block'} />;
        } else {
          return <p key={index}>{element.content}</p>;
        }
      })}
    </div>
  );
};
