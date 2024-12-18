import { useContext } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/Context";
import { BASE_URL } from "../../config";

export default function RelatedProducts({ product }) {
  const { allProducts } = useContext(ShopContext);

  const data_product = allProducts
    ?.sort(() => 0.5 - Math.random())
    .filter((item) => item._id !== product._id)
    .slice(0, 4);
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
              image={BASE_URL + "/" + item.image}
            />
          );
        })}
      </div>
    </div>
  );
}
