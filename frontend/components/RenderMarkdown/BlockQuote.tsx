import styles from '../../styles/RenderMarkdown.module.css';
import React, { useState, useEffect } from 'react';

const determineType = (children) => {
  // Xác định loại blockquote dựa trên nội dung trong thẻ <strong>
  const text = React.Children.toArray(children)
    .flatMap(child => 
      React.Children.toArray(child.props.children) // Duyệt qua các children của <p>
    )
    .find(child => child.type === 'strong') // Tìm phần tử <strong>
    ?.props.children.join("").toUpperCase() || ""; // Lấy nội dung của <strong> và chuyển thành chữ hoa

  if (text.includes("NOTE")) return "note";
  if (text.includes("TIP")) return "tip";
  if (text.includes("IMPORTANT")) return "important";
  if (text.includes("WARNING")) return "warning";
  if (text.includes("CAUTION")) return "caution";
  return "default";
};

const BlockQuote = ({ children }) => {
    console.log("Inside BlockQuote, children are: ", children);
    const type = determineType(children);
    console.log("type: ", type)
    return (
        <blockquote className={`${styles.blockquote} ${styles[type]}`}>
            <span className={`${styles.icon} ${styles[type + "Icon"]}`}></span>
            {children}
        </blockquote>
    );
};
