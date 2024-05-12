import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter
import styles from '../../styles/Sidebar.module.css'; // Ensure the path is correct
import { useState, useEffect } from 'react';

export const Sidebar = () => {
    return (
        <div className={styles.sidebarContainer}>
          <div className={styles.profile}>
            <img src="/profile.jpg" alt="Avatar" width={110} height={110} className={styles.avatar}/>
            <Link legacyBehavior href="/"><a className={styles.profileName}>Khanh Phan</a></Link>
            <p>Software Engineer</p>
            <p>Passionate about embedded, linux and devops</p>
            
            <div className={styles.location}>
                <img src="/assets/icons/location-icon.svg" alt="LinkedIn" className={styles.iconLocation} />
                <span style={{ textDecoration: 'none' }}>Ho Chi Minh City, Vietnam</span>
            </div>

            <Link legacyBehavior href="https://www.linkedin.com/in/ptmkhanh29/">
                <a className={styles.iconSocial} target="_blank" rel="noopener noreferrer">
                    <img src="/assets/icons/linkedin-icon.svg" alt="LinkedIn" />
                    <span style={{ textDecoration: 'underline' }}>LinkedIn</span>
                </a>
            </Link>
            <Link legacyBehavior href="https://github.com/ptmkhanh29">
                <a className={styles.iconSocial} target="_blank" rel="noopener noreferrer">
                    <img src="/assets/icons/github-icon.svg" alt="Github" />
                    @<span style={{ textDecoration: 'underline' }}>ptmkhanh29</span>
                </a>
            </Link>
            <Link legacyBehavior href="https://www.facebook.com/MinhKhanhPhanTruong/">
                <a className={styles.iconSocial} target="_blank" rel="noopener noreferrer">
                    <img src="/assets/icons/facebook-icon.svg" alt="LinkedIn" />
                    <span style={{ textDecoration: 'underline' }}> Facebook</span>
                </a>
            </Link>
            <Link legacyBehavior href="https://leetcode.com/u/ptmkhanh29/">
                <a className={styles.iconSocial} target="_blank" rel="noopener noreferrer">
                    <img src="/assets/icons/leetcode.svg" alt="LinkedIn" />
                    @<span style={{ textDecoration: 'underline' }}>leetcode</span>
                </a>
            </Link>
            <Link legacyBehavior href="mailto:ptmkhanh29@gmail.com">
                <a className={styles.iconSocial} target="_blank" rel="noopener noreferrer">
                    <img src="/assets/icons/email-icon.svg" alt="LinkedIn" />
                    <span style={{ textDecoration: 'underline' }}> Email for me</span>
                </a>
            </Link>
          </div>
        </div>
    );
};

