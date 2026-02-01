import { getPreference, setPreference } from "./preferences";
import { getCredentials, syncDatabase } from "./remote";

export let activeLiveSync = false;

/**
 * Syncs with remote database and updates the last sync timestamp on success.
 * Does nothing if there are no credentials saved.
 */
export const syncWithRemote = async (
  database: PouchDB.Database,
  options: PouchDB.Replication.SyncOptions,
): Promise<void> => {
  const credentials = await getCredentials();

  if (!(credentials.address || credentials.username || credentials.password)) {
    return;
  }

  await syncDatabase(database, credentials, options);
  await setLastSync(new Date());
};

/**
 * Checks if live sync is active. If it is, it does nothing.
 *
 * After setting `activeLiveSync`, this is equivalent to running
 * `syncWithRemote` using live sync parameters.
 */
export const startLiveSync = (database: PouchDB.Database): Promise<void> => {
  if (activeLiveSync) return Promise.resolve();

  activeLiveSync = true;
  return syncWithRemote(database, {
    live: true,
    retry: true,
  });
};

export const setLastSync = async (date: Date) => {
  await setPreference("last_sync", date.toISOString());
};

/**
 * Returns `1970-01-01T00:00:00.000Z` if there was no last sync.
 */
export const getLastSync = async (): Promise<Date> => {
  return new Date(await getPreference("last_sync"));
};
