import Link from 'next/link';
import styles from '../../styles/Navbar.module.css'; // Đường dẫn tới file CSS Module

type HeaderType = {
  blogName: string;
};
export const Header = ({ blogName }: HeaderType) => {
  return (
    <>
      <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">{blogName}</Link>
            </div>
            <div className={styles.menu}>
                <Link href="/">Home</Link>
                <Link href="/posts">Posts</Link>
                <Link href="/about">About</Link>
            </div>
        </nav>
    </>
  );
};
