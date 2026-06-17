"use client";

import clsx from "clsx";

import { Button, Switch, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

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

  const handleInputKeydown = (e) => {
    if (!e.nativeEvent.isComposing && e.key === "Enter") {
      searchChannel();
    }
  };

  return (
    <header className={clsx(styles.wrapper, className)}>
      <div className={styles.container}>
        <div className={styles.siteTitle}>Twitch Channels</div>
        <div className={styles.searchWrapper}>
          <div className={styles.switchWrapper}>
            <div>LIVE</div>
            <Switch
              className={styles.switchButton}
              checked={isLive}
              onChange={handleChangeIsLive}
            />
          </div>
          <TextField
            className={styles.input}
            value={channelName}
            onChange={handleChannelNameChange}
            placeholder="チャンネル名を入力"
            onKeyDown={handleInputKeydown}
          />
          <Button className={styles.searchButton} onClick={searchChannel}>
            <Search />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
