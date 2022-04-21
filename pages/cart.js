import styles from "../styles/cart.module.scss";
import { Header, Product } from "../components";
import { useRecoilState, useRecoilValue } from "recoil";
import { productsState, cartState, userState } from "../state";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import axios from "axios";

const CartPage = () => {
  let router = useRouter();
  let [form, setForm] = useState({});
  let [user, setUser] = useRecoilState(userState);
  let products = useRecoilValue(productsState);
  let [cart, setCart] = useRecoilState(cartState);

  class Item {
    constructor(id) {
      this.slug = id;
      this.quantity = cart[id];
      this.price = products[id].price;
    }
  }

  const _subTotal = () => {
    return parseInt(
      Object.keys(cart)
        .map((e) => products[e].price * cart[e])
        .reduce((a, b) => a + b, 0)
    );
  };
  const _Taxes = () => {
    return parseInt((_subTotal() / 100) * 18);
  };
  const _Total = () => {
    return parseInt(_subTotal() + _Taxes());
  };

  const _isEmpty = () => {
    return Object.values(cart).reduce((a, b) => a + b, 0) === 0;
  };

  const _handleInput = ({ target }) => {
    setForm((obj) =>
      Object.assign({ ...obj }, { [target.getAttribute("name")]: target.value })
    );
  };

  const _handleCheckout = async ({ target }) => {
    try {
      target.disabled = true;
      toast.loading("Placing Order...");
      const items = Object.keys(cart).map((e) => new Item(e));
      let data = Object.assign({ ...form }, { items });
      let response = await axios.post("/api/orders/create", { ...data }, {});
      setUser((obj) =>
        Object.assign(
          { ...obj },
          { orders: Object.assign({ ...obj.orders }, response.data.data) }
        )
      );
      setCart({});
      target.disabled = false;
      toast.dismiss();
      toast.success("Order Placed");
    } catch (error) {
      target.disabled = false;
      toast.dismiss();
      error.isAxiosError
        ? toast.error(error?.response?.data?.message)
        : toast.error(error.message);
    }
  };

  return (
    <div className={"container"}>
      <Header />
      <main className={"main"}>
        {_isEmpty() ? (
          <div className={"empty"}>
            <i className="ri-shopping-cart-fill"></i>
            <span>
              Cart is Empty, You will see Item(s) here when you add them.
            </span>
            <button className="button" onClick={() => router.push("/")}>
              Add Items
            </button>
          </div>
        ) : (
          <>
            <div className={"_heading"}>
              <h2>Order Summary</h2>
              <span>Check items and provide details for quick checkout.</span>
            </div>
            <div className={styles.cart_container}>
              <div className={styles.products_container}>
                {Object.keys(cart).map((e) => (
                  <Product
                    id={e}
                    product={products[e]}
                    key={e}
                    type={"minimal"}
                  />
                ))}
              </div>
              <div className={styles.checkout_container}>
                <div className={styles.checkout}>
                  <div className={"_heading"}>
                    <h2>Checkout</h2>
                    <span>Complete your purchase item providing details.</span>
                  </div>
                  <input
                    className="input"
                    placeholder="Email Address"
                    name="email"
                    onKeyUp={(event) => _handleInput(event)}
                  />
                  <input
                    className="input"
                    placeholder="Card Holder"
                    name="card_holder"
                    onKeyUp={(event) => _handleInput(event)}
                  />
                  <input
                    className="input"
                    placeholder="Card Number"
                    name="card_number"
                    onKeyUp={(event) => _handleInput(event)}
                  />
                  <div className={styles.linear_inputs}>
                    <input
                      className="input"
                      placeholder="MM/YY"
                      name="card_expiry"
                      onKeyUp={(event) => _handleInput(event)}
                    />
                    <input
                      className="input"
                      placeholder="CVV"
                      name="card_cvv"
                      onKeyUp={(event) => _handleInput(event)}
                    />
                  </div>
                  <input
                    className="input"
                    placeholder="Address"
                    name="address"
                    onKeyUp={(event) => _handleInput(event)}
                  />
                  <div className={styles.linear_inputs}>
                    <input
                      className="input"
                      placeholder="City"
                      name="city"
                      onKeyUp={(event) => _handleInput(event)}
                    />
                    <input
                      className="input"
                      placeholder="State"
                      name="state"
                      onKeyUp={(event) => _handleInput(event)}
                    />
                  </div>
                  <div className={styles.item}>
                    <div>SubTotal</div>
                    <div>Rs. {_subTotal()}</div>
                  </div>
                  <div className={styles.item}>
                    <div>Taxes & Charges (18%)</div>
                    <div>Rs. {_Taxes()}</div>
                  </div>
                  <div className={styles.item}>
                    <div>Total</div>
                    <div>Rs. {_Total()}</div>
                  </div>
                  <button
                    className="button"
                    onClick={(e) => _handleCheckout(e)}
                    disabled={Object.keys(user).length === 0}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CartPage;
