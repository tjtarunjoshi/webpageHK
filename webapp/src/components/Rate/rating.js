import React, { useState } from "react";
import Header from "components/Header";
import Rate from "components/Rate";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [rating2, setRating2] = useState(0);
  return (
    <>
      <Header title="Star rating page" />


      <div className="row">
        <div className="col text-center">
          <h2>Rate me</h2>
          <p>Rating component</p>
          <Rate rating={rating} onRating={(rate) => setRating(rate)} />
          <p>Rating - {rating}</p>
          <Rate rating={rating2} onRating={(rate) => setRating2(rate)} />
          <p>Rating - {rating2}</p>
        </div>
      </div>
    </>
  );
};

export default Rating;