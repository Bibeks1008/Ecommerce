import React, { useContext } from "react";
import { ShopContext } from "../../Context/Context.jsx";

import "./Popular.css";
import Item from "../Item/Item.jsx";
import { BASE_URL } from "../../config.js";

export default function Popular() {
  const { allProducts } = useContext(ShopContext);

  const data_product = allProducts?.slice(0, 4);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product?.map((item, i) => (
          <Item
            key={i}
            id={item._id}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
            image={BASE_URL + "/" + item.image}
          />
        ))}
      </div>
    </div>
  );
}
