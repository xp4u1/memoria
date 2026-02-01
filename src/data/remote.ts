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

export const setCredentials = async (credentials: Credentials) => {
  await setPreference("remote_address", credentials.address);
  await setPreference("remote_username", credentials.username);
  await setPreference("remote_password", credentials.password);
};

export const syncDatabase = async (
  database: PouchDB.Database,
  credentials: Credentials,
  options: PouchDB.Replication.SyncOptions,
) => {
  const remote = new PouchDB(credentials.address, {
    skip_setup: true,
    auth: {
      username: credentials.username,
      password: credentials.password,
    },
  });

  await database.sync(remote, options);
};
