import React, { useState, useEffect } from 'react';
import './Toast.css'; // CSS 스타일 파일

const Toast = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
