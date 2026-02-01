import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { usePouch } from "use-pouchdb";
import { useTranslation } from "react-i18next";

import "./Settings.scss";
import {
  Credentials,
  getCredentials,
  setCredentials,
  syncDatabase,
} from "../data/remote";
import { getLastSync, setLastSync } from "../data/sync";

const Settings: React.FC = () => {
  const { t } = useTranslation();

  const pouch = usePouch();

  const [credentialsLoaded, setCredentialsLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localLastSync, setLocalLastSync] = useState<Date | undefined>();

  const [toast, setToast] = useState({
    showToast: false,
    message: "",
    color: "",
  });

  // Saves the id of the last timeout to cancel it if needed.
  const [toastTimeout, setToastTimeout] = useState<number>();

  const credentials = (): Credentials => ({
    address: address,
    username: username,
    password: password,
  });

  useIonViewWillEnter(() => {
    getCredentials().then((credentials) => {
      setAddress(credentials.address);
      setUsername(credentials.username);
      setPassword(credentials.password);
      setCredentialsLoaded(true);
    });
    getLastSync().then((date) => {
      if (date.toISOString() === "1970-01-01T00:00:00.000Z") return;
      setLocalLastSync(date);
    });
  });

  useEffect(() => {
    if (!credentialsLoaded) return;

    setCredentials(credentials());
  }, [address, username, password]);

  const closeToastTimeout = () => {
    // Extends timer if there is an active timeout.
    clearTimeout(toastTimeout);

    setToastTimeout(
      setTimeout(
        () =>
          setToast({
            ...toast,
            showToast: false,
          }),
        2000,
      ),
    );
  };

  const sync = () => {
    setToast({
      showToast: true,
      message: t("Connecting..."),
      color: "light",
    });

    syncDatabase(pouch, credentials(), {})
      .then(() => {
        setToast({
          showToast: true,
          message: t("The database has been synchronized."),
          color: "success",
        });
        closeToastTimeout();

        // Update timestamp.
        const now = new Date();
        setLastSync(now);
        setLocalLastSync(now);
      })
      .catch((error) => {
        console.error(error);
        setToast({
          showToast: true,
          message: error.reason || t("An error occurred."),
          color: "danger",
        });
        closeToastTimeout();
      });
  };

  return (
    <IonPage id="settingsPage">
      <IonToast
        isOpen={toast.showToast}
        message={toast.message}
        color={toast.color}
        onDidDismiss={() => {
          setToast({ ...toast, showToast: false });
        }}
      ></IonToast>

      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>{t("Settings")}</IonTitle>

          <IonButtons slot="start">
            <IonBackButton color="dark" text="" defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div id="container">
          <p>
            {t(
              "Memoria can connect to any CouchDB-compatible database. This is optional; the app works without a database connection. However, a backup is recommended.",
            )}
          </p>

          <IonList>
            <IonItem>
              <IonInput
                label={t("Server")}
                placeholder="http://localhost:5984/memoria"
                labelPlacement="fixed"
                value={address}
                onIonChange={(event) =>
                  setAddress(event.target.value as string)
                }
              />
            </IonItem>
            <IonItem>
              <IonInput
                label={t("User")}
                placeholder="paul"
                labelPlacement="fixed"
                value={username}
                onIonChange={(event) =>
                  setUsername(event.target.value as string)
                }
              />
            </IonItem>
            <IonItem>
              <IonInput
                label={t("Password")}
                placeholder="*******"
                type="password"
                labelPlacement="fixed"
                value={password}
                onIonChange={(event) =>
                  setPassword(event.target.value as string)
                }
              />
            </IonItem>

            <p onClick={sync} style={{ cursor: "pointer" }}>
              <b>{t("Start synchronization")}</b>
            </p>
            {localLastSync && (
              <p className="muted">
                {t("Last synchronization on ")}
                {localLastSync.toLocaleDateString()}{" "}
                {localLastSync.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
