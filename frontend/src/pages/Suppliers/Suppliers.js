import React, { useState } from "react";

import SuppliersList from "../../components/SuppliersList";
// import Selector from "../../components/Selector";
import { getAllSuppliers } from "../../services/suppliersService";
import * as userService from "../../services/userService";

import "./Suppliers.scss";

const Suppliers = () => {
  const [suppliersList, setSuppliersList] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [displayedSuppliers, setDisplayedSuppliers] = useState([]);
  const [selectedSort, setSelectedSort] = useState("Title");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isAuthenticated } = useAuth();

//   const sortBy = ["Title", "Category", "Year"];
  const sortBy = ["Name", "Category", "HomologatedSince"];

  const categories = useMemo(() => {
    const categorySet = new Set();
    categorySet.add("All");
    suppliersList.forEach((m) => categorySet.add(m.category));
    return Array.from(categorySet);
  }, [suppliersList]);

  const fetchFavorites = useCallback(async () => {
    const abortCtrl = new AbortController();

    const favs = await userService.getUserFavorites(abortCtrl);
    setUserFavorites(favs.map((f) => f._id));
  }, []);

  useEffect(() => {
    const abortCtrl = new AbortController();

    async function load() {
      try {
        setSuppliersList(await getAllSuppliers(abortCtrl));
      } catch (err) {
        console.error(err);
      }
    }

    load();

    return () => abortCtrl.abort();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [fetchFavorites, isAuthenticated]);

  useEffect(() => {
    let output = [];
    if (!selectedCategory || selectedCategory === "All") {
      output = [...suppliersList];
    } else {
      output = suppliersList.filter((m) => m.category === selectedCategory);
    }

    const key = selectedSort.toLowerCase();
    output.sort((a, b) => (a[key] < b[key] ? -1 : 1));

    setDisplayedSuppliers(output);
  }, [suppliersList, selectedCategory, selectedSort]);

  const toggleFavorite = useCallback(
    async (supplier) => {
      const suppliersUpdatedPromise = new Promise(async (resolve, reject) => {
        try {
          if (userFavorites.includes(supplier._id)) {
            await userService.deleteFromFavorites(supplier._id);
            resolve();
          } else {
            await userService.addToFavorites(supplier._id);
            resolve();
          }
        } catch (err) {
          reject(err);
        }
      });

      suppliersUpdatedPromise.then(() => {
        fetchFavorites();
      });
    },
    [fetchFavorites, userFavorites]
  );

  return (
    <div>
      <div className="controls">
        <div>{/* search will go here */}</div>
        <div className="controls-selectors">
          <Selector
            label="Sort by:"
            onChange={setSelectedSort}
            options={sortBy}
            selected={selectedSort}
          />
          <Selector
            label="Type:"
            onChange={setSelectedCategory}
            options={categories}
            selected={selectedCategory}
          />
        </div>
      </div>
      <SuppliersList
        isFavControlVisible={isAuthenticated}
        suppliers={displayedSuppliers}
        onSupplierClick={toggleFavorite}
        userFavorites={userFavorites}
      />
    </div>
  );
};

export default React.memo(Suppliers);