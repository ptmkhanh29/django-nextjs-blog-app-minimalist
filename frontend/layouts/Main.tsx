import Link from 'next/link';
import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';

type IMainProps = {
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <>
    <Sidebar />
    <main class="main-container">
      <div class="container">
        <Header blogName={'>$home/khanhphan'} />
        <>{props.children}</>
        <Footer />
      </div>
    </main>
  </>
);

export { Main };
