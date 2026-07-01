/**
 * 環境変数の型定義
 */

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_TWITCH_CLIENT_ID: string;
    readonly NEXT_PUBLIC_TWITCH_TOKEN: string;
  }
}
