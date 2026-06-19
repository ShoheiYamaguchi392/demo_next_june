import { Modal as MuiModal } from "@mui/material";
import styles from "./Modal.module.scss";

const Modal = ({ children, onClose }) => {
  return (
    <MuiModal open onClose={onClose} className={styles.wrapper}>
      <div className={styles.box}>{children}</div>
    </MuiModal>
  );
};

export default Modal;
