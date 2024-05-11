import Link from 'next/link';
import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type IMainProps = {
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <>
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
