import clsx from "clsx";
import styles from "./Header.module.scss";

const Header = ({ className }) => {
  return (
    <header className={clsx(styles.wrapper, className)}>
      <div className={styles.container}>
        <div>Twitch Channels</div>
        <input />
        <></>
      </div>
    </header>
  );
};

export default Header;
