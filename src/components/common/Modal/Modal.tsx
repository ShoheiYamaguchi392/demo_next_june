import { Modal as MuiModal } from "@mui/material";
import styles from "./Modal.module.scss";

type ModalProps = {
  children?: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children = null, onClose }: ModalProps): React.ReactNode => {
  return (
    <MuiModal open onClose={onClose} className={styles.wrapper}>
      <div className={styles.box}>{children}</div>
    </MuiModal>
  );
};

export default Modal;
