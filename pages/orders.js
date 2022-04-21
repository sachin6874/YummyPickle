import styles from "../styles/orders.module.scss";
import { Header, Product } from "../components";
import { useRecoilValue } from "recoil";
import { productsState, userState } from "../state";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const OrdersPage = () => {
  let router = useRouter();
  let user = useRecoilValue(userState);
  let products = useRecoilValue(productsState);
  let [activeOrder, setActiveOrder] = useState(null);

  const _isEmpty = () => {
    if (Object.keys(user).length === 0) return true;
    return Object.values(user.orders).length === 0;
  };

  useEffect(() => {
    if (!user?.orders) return;
    setActiveOrder(Object.keys(user.orders)[0]);
  }, [user?.orders]);

  return (
    <div className={"container"}>
      <Header />
      <main className={"main"}>
        {_isEmpty() ? (
          <div className={"empty"}>
            <i className="ri-e-bike-2-fill"></i>
            <span>
              No orders, You will see Order(s) here when you place them.
            </span>
            <button className="button" onClick={() => router.push("/")}>
              Order Now
            </button>
          </div>
        ) : (
          <>
            <div className={"_heading"}>
              <h2>Order List</h2>
              <span>All orders placed by you</span>
            </div>
            <div className={styles.orders_container}>
              <div className={styles.order_list_container}>
                {Object.keys(user.orders).map((order, i) => (
                  <div
                    className={styles.order}
                    data-active={order === activeOrder}
                    key={order}
                    onClick={() => setActiveOrder(order)}
                  >
                    <div className={styles.order_name}>Order #{i + 1}</div>
                    <div className={styles.item}>
                      Order Id <span>{order}</span>
                    </div>
                    <div className={styles.items}>
                      <div className={styles.item}>
                        Total{" "}
                        <span>
                          Rs.{" "}
                          {user.orders[order].items
                            .map((e) => e.price * e.quantity)
                            .reduce((a, b) => a + b, 0)}
                        </span>
                      </div>
                      <div className={styles.item}>
                        Total Items{" "}
                        <span>{user.orders[order].items.length} Item(s)</span>
                      </div>
                      <div className={styles.item}>
                        Payment Mode <span>Online</span>
                      </div>
                      <div className={styles.item}>
                        Ordered
                        <span>
                          {new Date(
                            user.orders[order].meta.created_at
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.order_summary_container}>
                <div className={"_heading"}>
                  <h2>Order Summary</h2>
                  <span>A summary of your order</span>
                </div>
                {activeOrder !== null ? (
                  user.orders[activeOrder].items.map((e) => (
                    <Product
                      key={`${activeOrder}_${e.slug}`}
                      id={e.slug}
                      product={products[e.slug]}
                      type={"minimal"}
                      order={true}
                      orderData={e}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
