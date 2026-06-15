"use client";

import clsx from "clsx";

import { Button, Switch, TextField } from "@mui/material";

import useHeader from "./useHeader";
import styles from "./Header.module.scss";

const Header = ({ className }) => {
  const {
    channelName,
    isLive,
    changeChannelName,
    changeIsLive,
    searchChannel,
  } = useHeader();

  const handleChannelNameChange = (e) => {
    changeChannelName(e.target.value);
  };

  const handleChangeIsLive = () => {
    changeIsLive(!isLive);
  };

  return (
    <header className={clsx(styles.wrapper, className)}>
      <div className={styles.container}>
        <div className={styles.siteTitle}>Twitch Channels</div>
        <TextField value={channelName} onChange={handleChannelNameChange} />
        <Switch checked={isLive} onChange={handleChangeIsLive} />
        <Button onClick={searchChannel}>Search</Button>
      </div>
    </header>
  );
};

export default Header;
