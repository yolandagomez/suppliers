import React from "react";

import Supplier from "../components";

// import "./SupplierList.scss";

const SupplierList = ({
  isFavControlVisible,
  supplier = [],
  onSupplierClick,
  userFavorites = [],
}) => {
  return (
    <div className=#>
      {movies.map((m) => (
        <Supplier
          key={m._id}
          isFavControlVisible={isFavControlVisible}
          isFavorited={userFavorites.includes(m._id)}
          supplier={m}
          onClick={onSupplierClick}
        />
      ))}
    </div>
  );
};

export default SupplierList;