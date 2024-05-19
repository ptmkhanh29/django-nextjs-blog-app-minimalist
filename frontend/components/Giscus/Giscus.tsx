import { useEffect } from 'react';

interface GiscusProps {}

export const Giscus: React.FC<GiscusProps> = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', 'ptmkhanh29/django-nextjs-blog-app-minimalist');
    script.setAttribute('data-repo-id', 'R_kgDOL6G8jA');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOL6G8jM4Cfcp3');
    script.setAttribute('data-mapping', 'url');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'vi');

    const scriptContainer = document.getElementById('giscus-container');
    if (scriptContainer) {
      scriptContainer.innerHTML = '';
      scriptContainer.appendChild(script);
    }
  }, []);

  return <div id="giscus-container"></div>;
};

