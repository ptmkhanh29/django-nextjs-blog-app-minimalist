import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'; // Import useRouter
import styles from '../../styles/Navbar.module.css'; // Ensure the path is correct

type HeaderType = {
  blogName: string;
};

export const Header = ({ blogName }: HeaderType) => {
  const router = useRouter(); // Use the useRouter hook to access the route info

  // Function to determine if the link is active
  const isActive = (href: string) => {
    return router.pathname === href;
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <nav className={styles.navbar}>
            <div className={styles.menu}>
                <Link legacyBehavior href="/" passHref>
                    <a className={isActive('/') ? styles.active : ''}>Home</a>
                </Link>
                <Link legacyBehavior href="/posts" passHref>
                    <a className={isActive('/posts') ? styles.active : ''}>Posts</a>
                </Link>
                <Link legacyBehavior href="/projects" passHref>
                    <a className={isActive('/projects') ? styles.active : ''}>Proj</a>
                </Link>
                <Link legacyBehavior href="/about" passHref>
                    <a className={isActive('/about') ? styles.active : ''}>About</a>
                </Link>
            </div>
        </nav>
      </div>
    </>
  );
};
