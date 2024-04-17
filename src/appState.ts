import { makeAutoObservable, makeObservable, observable, observe } from "mobx";
import { makePersistable } from 'mobx-persist-store';
import {type} from "os";

export class AppState {
  token: string | null = null;
  userId: number = 0;
  userName: string = "";
  isLoggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "AppState", // name for the storage
      storage: window.localStorage,
      properties: ["userName"], // properties to persist
    });
  }

}

export const appState = new AppState();