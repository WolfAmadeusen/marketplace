import React from 'react';
import './WhiteButton.css';

export default function WhiteButton({ onClick, children, className, ...props }) {
   return (
      <button
         className={`button-whiteBg ${className || ''}`}
         onClick={onClick}
         {...props}
      >
         {children}
      </button>
   );
}
