import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Active = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, []);
  return null;
};

export default Active;
