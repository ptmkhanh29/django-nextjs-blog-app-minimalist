import Link from 'next/link';
import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { Panel } from '../components/Panel';

type IMainProps = {
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <>
    <main class="body-container">
      <div class="header">
        <Header blogName={'>$home/khanhphan'} />
      </div>

      <div class="main-container">
        <div class="sidebar">
          <Sidebar />
        </div>
        <div class="main-content">
          <>{props.children}</>
        </div>
        <div class="panel">
          <Panel />
        </div>
      </div>
      <div class="Footer">
        <Footer />
      </div>
    </main>
  </>
);

export { Main };
