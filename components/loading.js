import styles from "../styles/components/loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <i className="ri-loader-4-fill"></i>
    </div>
  );
};

export default Loading;
