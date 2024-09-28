import { getPreference, setPreference } from "./preferences";
import { getCredentials, syncDatabase } from "./remote";

/**
 * Syncs with remote database and updates the last sync timestamp on success.
 */
export const syncWithRemote = (database: any): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const credentials = await getCredentials();
    syncDatabase(database, credentials)
      .then(() => {
        setLastSync(new Date());
        resolve();
      })
      .catch((error) => reject(error));
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
