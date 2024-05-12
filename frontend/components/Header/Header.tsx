import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'; // Import useRouter
import styles from '../../styles/Navbar.module.css'; // Ensure the path is correct

type HeaderType = {
  blogName: string;
};

const colors = [
  '#33FF57', '#FF5733', '#33C1FF', '#FF33BF', '#8C33FF', '#FFD433', '#FF8E33', '#B8B8B8', '#FFC300', '#581845'
];

const url_categories = 'http://127.0.0.1:3001/categories';

function getNextColor() {
  const color = colors.shift();
  colors.push(color);
  return color;
}

export const Header = ({ blogName }: HeaderType) => {
  const router = useRouter(); // Use the useRouter hook to access the route info
  const [categoriesWithColors, setCategoriesWithColors] = useState([]);

  // Function to determine if the link is active
  const isActive = (href: string) => {
    return router.pathname === href;
  }

  useEffect(() => {
    axios.get(url_categories)
      .then(response => {
        const fetchedCategories = response.data.map(category => ({
          name: category.name,
          color: getNextColor()
        }));
        setCategoriesWithColors(fetchedCategories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);


  return (
    <>
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
        <div className={styles.postContainer}>
            <div className={styles.subHeader}>
                <span className={styles.boldText}>##</span> Một ngày đẹp trời thế là chiếc blog này được <a href="https://github.com/ptmkhanh29/django-nextjs-blog-app-minimalist" className={styles.link} target="_blank" rel="noopener noreferrer">build</a>
            </div>
            <div className={styles.categories}>
              {categoriesWithColors.map((category, index) => (
                <Link key={index} href={`/category/${category.name.toLowerCase()}`} className={styles.category} style={{ '--color': category.color }}>
                  {category.name}
                </Link>
              ))}
            </div>
        </div>
    </>
  );
};
