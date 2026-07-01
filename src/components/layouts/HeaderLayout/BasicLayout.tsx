import styles from "./BasicLayout.module.scss";

import Header from "@/components/common/Header/Header";

import { FetchChannels } from "@/components/pages/Top/useTop";

type Props = {
  children: React.ReactNode;
  fetchChannels?: FetchChannels;
};

const BasicLayout: React.FC<Props> = ({ children, fetchChannels }) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} fetchChannels={fetchChannels} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default BasicLayout;
