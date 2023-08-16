import axios from '@/axios';
import { useSession } from 'next-auth/react';

const useRefreshToken = () => {
  const { data: session } = useSession();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });

    session!.user.accessToken = response.data.accessToken;
  };
  
  return refresh;
};

export default useRefreshToken;
