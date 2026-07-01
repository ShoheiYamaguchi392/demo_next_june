"use client";

import clsx from "clsx";

import { Button, Switch, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

import useHeader from "./useHeader";
import styles from "./Header.module.scss";
import { FetchChannels } from "@/components/pages/Top/useTop";

import { ChangeEventHandler, KeyboardEventHandler } from "react";

type HeaderProps = {
  className: string;
  fetchChannels?: FetchChannels | undefined;
};

const Header = ({ className, fetchChannels }: HeaderProps): React.ReactNode => {
  const {
    channelName,
    isLive,
    changeChannelName,
    changeIsLive,
    searchChannel,
  } = useHeader({ fetchChannels });

  const handleChannelNameChange: ChangeEventHandler = (event) => {
    if (!(event.target instanceof HTMLTextAreaElement)) return;
    changeChannelName(event.target.value);
  };

  const handleChangeIsLive = (): void => {
    changeIsLive(!isLive);
  };

  const handleInputKeydown: KeyboardEventHandler = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (!event.nativeEvent.isComposing && event.key === "Enter") {
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
