import styles from "../styles/index.module.scss";
import { Header, Product } from "../components";
import { useRecoilValue } from "recoil";
import { productsState } from "../state";
import { useState, useEffect } from "react";

const IndexPage = () => {
  let products = useRecoilValue(productsState);
  let [fProducts, setfProducts] = useState({});

  const _handleInput = ({ target }) => {
    if (!target.value) return setfProducts(products);
    let tempProducts = Object.values(products).map((e) =>
      new RegExp(target.value.toLowerCase()).test(e.name.toLowerCase())
        ? e
        : null
    );
    setfProducts({});
    tempProducts
      .filter((e) => e !== null)
      .map((e) =>
        setfProducts((obj) => Object.assign({ ...obj }, { [e.slug]: e }))
      );
  };

  const _handleFilter = ({ target }) => {
    let tempProducts = Object.assign({}, { ...products });
    switch (target.value) {
      case "rating_l":
        setfProducts({});
        Object.values(tempProducts)
          .sort((a, b) => a.rating - b.rating)
          .map((e) =>
            setfProducts((obj) => Object.assign({ ...obj }, { [e.slug]: e }))
          );
        break;
      case "rating_h":
        setfProducts({});
        Object.values(tempProducts)
          .sort((a, b) => b.rating - a.rating)
          .map((e) =>
            setfProducts((obj) => Object.assign({ ...obj }, { [e.slug]: e }))
          );
        break;
      case "price_l":
        setfProducts({});
        Object.values(tempProducts)
          .sort((a, b) => a.price - b.price)
          .map((e) =>
            setfProducts((obj) => Object.assign({ ...obj }, { [e.slug]: e }))
          );
        break;
      case "price_h":
        setfProducts({});
        Object.values(tempProducts)
          .sort((a, b) => b.price - a.price)
          .map((e) =>
            setfProducts((obj) => Object.assign({ ...obj }, { [e.slug]: e }))
          );
        break;
      default:
        setfProducts(products);
        break;
    }
  };

  useEffect(() => {
    setfProducts(products);
  }, [products]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles._heading}>
          <h2>Recently Added</h2>
          <span>Explore Recently Added Pickle</span>
        </div>
        <div className={styles.sort_filter_search}>
          <div className={styles.search_container}>
            <i className="ri-search-line"></i>
            <input
              className="input"
              placeholder="Search Pickle"
              onKeyUp={(event) => _handleInput(event)}
            />
          </div>
          <select
            className="input"
            placeholder="Search Pickle"
            onChange={(event) => _handleFilter(event)}
          >
            <option value={"relevance"}>Relevance</option>
            <option value={"rating_l"}>Rating Low-High</option>
            <option value={"rating_h"}>Rating High-Low</option>
            <option value={"price_l"}>Price Low-High</option>
            <option value={"price_h"}>Price High-Low</option>
          </select>
        </div>
        <div className={styles.product_container}>
          {Object.keys(fProducts).map((e) => (
            <Product id={e} product={products[e]} key={e} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
