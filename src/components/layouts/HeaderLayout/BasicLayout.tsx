import styles from "./BasicLayout.module.scss";

import Header from "@/components/common/Header/Header";

const BasicLayout = ({ children, fetchChannels }) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} fetchChannels={fetchChannels} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default BasicLayout;
