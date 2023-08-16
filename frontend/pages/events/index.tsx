import { productData } from "@/static-data";
import { ProductType } from "@/types";
import { useEffect, useState } from "react";

import EventCard from "@/components/event/EventCard";

const Events = () => {
  const [event, setEvent] = useState<ProductType>(productData[0]);

  useEffect(() => {
    const data = productData[Math.floor(Math.random() * productData.length)];
    setEvent(data);
  }, []);

  return (
    <main className="my-12">
      <div className="section">
        <div className="heading">
          <label>Popular Events</label>
        </div>

        <div className="grid">
          <EventCard data={event} />
          {/* <h4>{allEvents?.length === 0 && 'No Events have!'}</h4> */}
        </div>
      </div>
    </main>
  );
}

export default Events