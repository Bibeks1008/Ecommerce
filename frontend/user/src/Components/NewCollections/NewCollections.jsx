import React, { useContext } from "react";
import "./NewCollections.css";
import Item from "../Item/Item.jsx";
import { ShopContext } from "../../Context/Context.jsx";
import { BASE_URL } from "../../config.js";

export default function NewCollections() {
  const { allProducts } = useContext(ShopContext);
  const new_collections = allProducts
    ?.sort(() => 0.5 - Math.random())
    ?.slice(0, 12);
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections?.map((item, i) => (
          <Item
            key={i}
            id={item.id}
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
