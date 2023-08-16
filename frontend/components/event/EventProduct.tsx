import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { productData } from '@/static-data';
import { ProductType } from '@/types';

const EventProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState<ProductType>(productData[0]);

  useEffect(() => {
    const data = productData[Math.floor(Math.random() * productData.length)];
    setEvent(data);
  }, []);

  return (
    <section className="my-12">
      <div className="section">
        <div className="heading">
          <label>Popular Events</label>
        </div>

        <div className="grid">
          <EventCard data={event} />
          {/* <h4>{allEvents?.length === 0 && 'No Events have!'}</h4> */}
        </div>
      </div>
    </section>
  );
};

export default EventProduct;
