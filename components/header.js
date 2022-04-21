import styles from "../styles/components/header.module.scss";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../state";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Header = () => {
  let router = useRouter();
  let [_, setFetched] = useState(false);
  let [cart, setCart] = useRecoilState(cartState);
  let [user, setUser] = useRecoilState(userState);

  const _getUser = async () => {
    try {
      setFetched(false);
      let tokens = window?.localStorage?.getItem("tokens");
      if (!tokens) return setFetched(true);
      const response = await axios.get("/api/me");
      if (response.data.success) {
        setUser(response.data.data);
        setFetched(true);
      }
    } catch (error) {
      window?.localStorage?.removeItem("tokens");
      router.replace("/account");
      setFetched(true);
    }
  };

  useEffect(() => {
    try {
      if (Object.keys(user).length === 0) {
        setFetched(true);
        _getUser();
      }
      let localCart = window?.localStorage.getItem("cart");
      if (localCart) {
        localCart = JSON.parse(localCart);
        if (Object.keys(localCart).length > 0) setCart(localCart);
      }
    } catch (_) {
      setCart({});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window?.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div>
          <i className="ri-emotion-2-fill"></i>
          <div>
            Yummy
            <br />
            Pickle
          </div>
        </div>
        <div></div>
        <div>
          <button className="button" onClick={() => router.push("/")}>
            <i className="ri-home-fill"></i>
          </button>
          <button className="button" onClick={() => router.push("/cart")}>
            <i className="ri-shopping-cart-fill" style={{ marginRight: 5 }}></i>{" "}
            {Object.keys(cart)
              .filter((e) => e !== 0)
              .map((e) => (!!cart[e] ? cart[e] : 0))
              .reduce((a, b) => a + b, 0)}
          </button>

          {user?.username ? (
            <>
              <button
                className="button"
                onClick={() => {
                  router.replace("/orders");
                }}
              >
                <i className="ri-e-bike-2-fill" style={{ marginRight: 5 }}></i>{" "}
                Orders
              </button>
              <button className="button">
                <i className="ri-user-fill" style={{ marginRight: 5 }}></i>{" "}
                {user.username}
              </button>
            </>
          ) : (
            <button
              className="button"
              onClick={() => {
                router.replace("/account");
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
