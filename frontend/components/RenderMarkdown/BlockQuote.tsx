import styles from '../../styles/BlockQuote.module.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const determineType = (children: React.ReactNode): string => {
  const paragraphs = React.Children.toArray(children).flatMap(child => 
    child && typeof child === 'object' && 'props' in child ? React.Children.toArray(child.props.children) : []
  );
  const strongText = paragraphs.find(child => 
    child && typeof child === 'object' && 'type' in child && child.type === 'strong'
  )?.props.children || "";
  const text = strongText.toString().toUpperCase();
  if (text.includes("NOTE")) return "note";
  if (text.includes("TIP")) return "tip";
  if (text.includes("INFORMATION")) return "information";
  if (text.includes("WARNING")) return "warning";
  if (text.includes("CAUTION")) return "caution";
  return "default";
};

export const BlockQuote = ({ children }: { children: React.ReactNode }) => {
  const type = determineType(children);
  //console.log("Applying classes: ", `${styles.blockquote} ${styles[type]}`);

  const backgroundColor = `var(--color-${type}-bg, var(--color-default-bg))`; // Use default if not specified
  const borderColor = `var(--color-${type}-border, var(--color-default-border))`;

  return (
    <blockquote className={styles.blockquote} style={{ backgroundColor, borderLeft: `4px solid ${borderColor}` }}>
      <div className={styles[type]}>
        {type === "note" && <span className={styles.icon}>📘</span>}
        {type === "tip" && <span className={styles.icon}>💡</span>}
        {type === "information" && <span className={styles.icon}>✅</span>}
        {type === "warning" && <span className={styles.icon}>⚠️</span>}
        {type === "caution" && <span className={styles.icon}>🚩</span>}
        {type === "default" && <span className={styles.icon}>💬 </span>}
        {children}
      </div>
    </blockquote>
  );
};