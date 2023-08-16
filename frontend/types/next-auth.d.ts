import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

export type AddressType = {
  country: string;
  city: string;
  address1: string;
  address2?: string;
  zipCode: number;
  addressType: string;
};

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      role: string;
      accessToken: string;
      phoneNumber?: string;
      avatar: {
        public_id: string;
        url: string;
      };
      address?: AddressType[];
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    name: string;
    email: string;
    role: string;
    accessToken: string;
    phoneNumber?: string;
    avatar: {
      public_id: string;
      url: string;
    };
    address?: AddressType[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    name: string;
    email: string;
    role: string;
    accessToken: string;
    phoneNumber: string;
    avatar: {
      public_id: string;
      url: string;
    };
    address?: AddressType[];
  }
}
