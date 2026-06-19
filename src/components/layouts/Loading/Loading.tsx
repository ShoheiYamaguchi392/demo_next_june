import { CircularProgress } from "@mui/material";

import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
