# 로딩 컴포넌트 사용 예시

``` javascript
import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const ExampleWithLoading = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true); // 로딩 시작
    try {
      const response = await fetch('https://api.example.com/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Data Loaded</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExampleWithLoading;

```