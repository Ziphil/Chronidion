/* eslint-disable quote-props, @typescript-eslint/naming-convention */

import {BrowserWindow} from "electron";
import fetch from "node-fetch";


export class DiscordTokenManager {

  public readonly clientId: string;
  public readonly clientSecret: string;

  private authentificationCodePromise: Promise<string> | null = null;
  private refreshToken: string | null = null;

  public constructor(id: string, secret: string) {
    this.clientId = id;
    this.clientSecret = secret;
  }

  public getAuthentificationCode(): Promise<string> {
    if (this.authentificationCodePromise) {
      return this.authentificationCodePromise;
    } else {
      const promise = new Promise<string>((resolve, reject) => {
        const window = new BrowserWindow({autoHideMenuBar: true, useContentSize: true});
        window.webContents.on("will-navigate", (event, url) => {
          const urlObject = new URL(url);
          const code = urlObject.searchParams.get("code");
          const error = urlObject.searchParams.get("error");
          if (error) {
            reject(new Error(`error occurred: ${error}`));
          } else if (code) {
            resolve(code);
          } else {
            reject(new Error("no code in url"));
          }
          window.removeAllListeners("closed");
          setImmediate(() => window.close());
        });
        window.on("closed", () => {
          reject(new Error("window closed by user"));
        });
        window.loadURL(`https://discord.com/oauth2/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent("http://localhost")}&scope=rpc+rpc.api+identify`);
        window.show();
      });
      this.authentificationCodePromise = promise;
      return promise;
    }
  }

  public async getAccessToken(): Promise<string> {
    if (this.refreshToken) {
      const accessToken = this.fetchAccessTokenFromRefreshToken();
      return accessToken;
    } else {
      const authentificationCode = await this.getAuthentificationCode();
      const accessToken = this.fetchAccessTokenFromAuthentificationCode(authentificationCode);
      return accessToken;
    }
  }

  private async fetchAccessTokenFromAuthentificationCode(authentificationCode: string): Promise<string> {
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        "client_id": this.clientId,
        "client_secret": this.clientSecret,
        "grant_type": "authorization_code",
        "code": authentificationCode,
        "redirect_uri": "http://localhost"
      }).toString()
    });
    const json = await response.json();
    const accessToken = json["access_token"];
    const refreshToken = json["refresh_token"];
    this.refreshToken = refreshToken;
    return accessToken;
  }

  private async fetchAccessTokenFromRefreshToken(): Promise<string> {
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        "client_id": this.clientId,
        "client_secret": this.clientSecret,
        "grant_type": "refresh_token",
        "refresh_token": this.refreshToken ?? ""
      }).toString()
    });
    const json = await response.json();
    const accessToken = json["access_token"];
    const refreshToken = json["refresh_token"];
    this.refreshToken = refreshToken;
    return accessToken;
  }

}