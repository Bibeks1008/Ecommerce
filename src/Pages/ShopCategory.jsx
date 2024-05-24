import React from "react";
import { useContext } from "react";
import Item from "../Components/Item/Item";
import { ShopContext } from "../Context/Context";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import "./CSS/ShopCategory.css";

export default function ShopCategory({ category, banner }) {
  const { all_product } = useContext(ShopContext);
  const filteredProduct = all_product.filter(
    (item) => item.category === category
  );

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          <button>
            {" "}
            Sort by <img src={dropdown_icon} alt="" />
          </button>
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProduct.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
            image={item.image}
          />
        ))}
      </div>
      <button className="shopcategory-loadmore">Explore More</button>
    </div>
  );
}
