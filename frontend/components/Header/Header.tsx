import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import styles from '../../styles/Navbar.module.css'; // Ensure the path is correct

type HeaderType = {
  blogName: string;
};

export const Header = ({ blogName }: HeaderType) => {
  const [isLight, setIsLight] = useState(false); // State to manage theme
  const router = useRouter(); // Use the useRouter hook to access the route info

  const toggleTheme = () => {
    setIsLight(!isLight); // Toggle the theme state
    document.body.classList.toggle('lightMode', !isLight); // Toggle the body class
  };

  // Function to determine if the link is active
  const isActive = (href: string) => {
    return router.pathname === href;
  }

  return (
    <nav className={styles.navbar}>
        <div className={styles.logo}>
            <Link href="/">{blogName}</Link>
        </div>
        <div className={styles.menu}>
            <Link legacyBehavior href="/" passHref>
                <a className={isActive('/') ? styles.active : ''}>Home</a>
            </Link>
            <Link legacyBehavior href="/posts" passHref>
                <a className={isActive('/posts') ? styles.active : ''}>Posts</a>
            </Link>
            <Link legacyBehavior href="/about" passHref>
                <a className={isActive('/about') ? styles.active : ''}>About</a>
            </Link>
        </div>
    </nav>
  );
};
