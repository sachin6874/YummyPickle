import styles from "../styles/components/product.module.scss";
import { cartState } from "../state";
import { useRecoilState } from "recoil";

const Product = ({ id, product, type, order, orderData }) => {
  let [cart, setCart] = useRecoilState(cartState);

  const _addToCart = (id) => {
    setCart((obj) =>
      Object.assign({ ...obj }, { [id]: cart[id] ? cart[id] + 1 : 1 })
    );
  };

  const _removeFromCart = (id) => {
    if (cart[id] && cart[id] - 1 === 0) {
      let tempCart = Object.assign({}, { ...cart });
      delete tempCart[id];
      return setCart(tempCart);
    } else {
      setCart((obj) =>
        Object.assign({ ...obj }, { [id]: !!cart[id] ? cart[id] - 1 : 0 })
      );
    }
  };

  return (
    <div className={styles.container} type={type}>
      <div
        className={styles.image}
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20),rgba(0, 0, 0, 0.20)), url(/assets/${product.image})`,
        }}
      ></div>
      <div className={styles.details}>
        {type !== "minimal" ? (
          <div>
            {[...Array(product.rating).keys()].map((e) => (
              <i className="ri-star-fill" key={id + "_" + e}></i>
            ))}
          </div>
        ) : (
          <div></div>
        )}
        <div>{product.name}</div>
        {type !== "minimal" ? (
          <div>{product.description}</div>
        ) : (
          <div type="price">
            Rs.{" "}
            {order
              ? orderData.price * orderData.quantity
              : product.price * cart[id]}
            <span>
              {order
                ? `${orderData.quantity} x Rs. ${orderData.price}`
                : "Rs. " + product.price}{" "}
              per kg
            </span>
          </div>
        )}
      </div>
      {!order ? (
        <div className={styles.price}>
          {type !== "minimal" ? (
            <div>
              Rs. {product.price}
              <span>per kg</span>
            </div>
          ) : (
            <></>
          )}

          <div>
            <button className="button" onClick={() => _removeFromCart(id)}>
              <i className="ri-subtract-fill"></i>
            </button>
            <div>{cart[id] ? cart[id] : 0}</div>
            <button className="button" onClick={() => _addToCart(id)}>
              <i className="ri-add-fill"></i>
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Product;
