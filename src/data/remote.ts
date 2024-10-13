import PouchDB from "pouchdb-browser";

import { getPreference, setPreference } from "./preferences";

export interface Credentials {
  address: string;
  username: string;
  password: string;
}

export const getCredentials = async (): Promise<Credentials> => {
  return {
    address: await getPreference("remote_address"),
    username: await getPreference("remote_username"),
    password: await getPreference("remote_password"),
  };
};

export const setCredentials = (credentials: Credentials) => {
  setPreference("remote_address", credentials.address);
  setPreference("remote_username", credentials.username);
  setPreference("remote_password", credentials.password);
};

export const syncDatabase = async (
  database: any,
  credentials: Credentials,
  options: PouchDB.Replication.SyncOptions,
): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    const remote = new PouchDB(credentials.address, {
      skip_setup: true,
    });
    remote
      .logIn(credentials.username, credentials.password)
      .then(() => {
        database
          .sync(remote, options)
          .then(() => {
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
