import React from "react";

import SupplierPoster from "../SupplierPoster";
import "./Supplier.scss";

const FULL_STAR = "fas fa-star";
const HALF_STAR = "fas fa-star-half-alt";

const ratingGenerator = (rating) => {
  const output = Array(Math.trunc(rating / 2)).fill(FULL_STAR);

  const rest = (rating / 2) % 1 >= 0.5;
  if (rest) {
    output.push(HALF_STAR);
  }

  return output;
};

function Supplier({
  isFavControlVisible,
  isFavorited,
  supplier,
  onClick = () => null,
}) {
  const rating = ratingGenerator(supplier.rating);

  const handleClick = () => onClick(supplier);

  return (
    <div className="supplier" onClick={handleClick}>
      <SupplierPoster
        isFavControlVisible={isFavControlVisible}
        isFavorited={isFavorited}
        src={supplier.poster}
      />
      <label className="supplier-title">{supplier.title}</label>
      <label className="supplier-info">{supplier.category}</label>
      <label className="supplier-info">{supplier.year}</label>
      <label className="supplier-rating">
        {rating.map((r, index) => (
          <i key={index} className={r} />
        ))}
      </label>
    </div>
  );
}

export default Supplier;