# 토스트 사용 예시

```javascript
import React, { useState } from 'react';
import Toast from './Toast';

const ExampleWithToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleLogin = async () => {
    try {
      // 잘못된 로그인 데이터 전송
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        body: JSON.stringify({ username: 'test', password: 'wrongpassword' }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
    } catch (error) {
      setToastMessage('Login failed. Please try again.');
      setShowToast(true); // Toast 표시
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>

      {showToast && (
        <Toast
          message={toastMessage}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ExampleWithToast;

```