import { getPreference, setPreference } from "./preferences";
import { getCredentials, syncDatabase } from "./remote";

/**
 * Syncs with remote database and updates the last sync timestamp on success.
 * Does nothing if there are no credentials saved.
 */
export const syncWithRemote = (
  database: any,
  options: PouchDB.Replication.SyncOptions,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const credentials = await getCredentials();

    // Make sure, the credentials are not null.
    if (
      !(credentials.address || credentials.username || credentials.password)
    ) {
      return;
    }

    syncDatabase(database, credentials, options)
      .then(() => {
        setLastSync(new Date());
        resolve();
      })
      .catch((error) => reject(error));
  });
};

/**
 * This is equivalent to running `syncWithRemote` using live sync parameters.
 */
export const startLiveSync = (database: any): Promise<void> => {
  return syncWithRemote(database, {
    live: true,
    retry: true,
  });
};

export const setLastSync = async (date: Date) => {
  setPreference("last_sync", date.toISOString());
};

/**
 * Returns `1970-01-01T00:00:00.000Z` if there was no last sync.
 */
export const getLastSync = async (): Promise<Date> => {
  return new Date(await getPreference("last_sync"));
};
