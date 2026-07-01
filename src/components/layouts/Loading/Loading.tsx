import { CircularProgress } from "@mui/material";

import styles from "./Loading.module.scss";

const Loading = (): React.ReactNode => {
  return (
    <div className={styles.wrapper}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
