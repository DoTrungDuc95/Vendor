import { signOut, useSession } from 'next-auth/react';
import axios from '@/axios';

import Header from '@/components/header/Header';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import BestDeals from '@/components/home/BestDeals';
import FeaturedProduct from '@/components/home/FeaturedProduct';
import EventProduct from '@/components/event/EventProduct';
import Sponsored from '@/components/home/Sponsored';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <BestDeals />
      <EventProduct />
      <FeaturedProduct />
      <Sponsored />
    </main>
  );
}
