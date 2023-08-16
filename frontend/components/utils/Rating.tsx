import { useEffect, useMemo, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import StarGradient from './StarGradient';

type RatingProps = {
  rating: number;
  id: number;
};

const Rating = ({ rating, id }: RatingProps) => {
  const stars = [];
  const percent = useMemo(
    () => Math.round((rating - Math.floor(rating)) * 100),
    [rating]
  );

  for (let i = 0; i <= 4; i++) {
    if (i <= rating - 1) {
      stars.push(<AiFillStar key={i} color="#f6b100" size={20} />);
    } else if (i < rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          style={{ fill: `url(#star-gradient-${id})` }}
        />
      );
    } else {
      stars.push(<AiFillStar key={i} size={20} color="#ccc" />);
    }
  }
  return (
    <>
      <div className="flex-type-1 justify-between w-full">
        <div className="flex">{stars}</div>
        <span className="font-bold">{rating}/5</span>
      </div>
      <StarGradient percent={percent} id={id} />
    </>
  );
};

export default Rating;
