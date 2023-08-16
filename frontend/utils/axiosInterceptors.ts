import { AxiosInstance } from 'axios';
import axios from '@/axios';
import { Session } from 'next-auth';

export default (axiosPrivate: AxiosInstance, session: Session) => {
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${session!.user.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const response = await axios.get('/refresh', {
          withCredentials: true,
        });
        session!.user.accessToken = response.data.accessToken;
        prevRequest.headers[
          'Authorization'
        ] = `Bearer ${response.data.accessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};
