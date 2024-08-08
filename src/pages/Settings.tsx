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

const Settings: React.FC = () => {
  const { t } = useTranslation();

  const pouch = usePouch();

  const [credentialsLoaded, setCredentialsLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [toast, setToast] = useState({
    showToast: false,
    message: "",
    color: "",
  });

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
  });

  useEffect(() => {
    if (!credentialsLoaded) return;

    setCredentials(credentials());
  }, [address, username, password]);

  const sync = () => {
    setToast({
      showToast: true,
      message: t("Connecting..."),
      color: "light",
    });
    syncDatabase(pouch, credentials())
      .then(() => {
        setToast({
          showToast: true,
          message: t("The database has been synchronized."),
          color: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        setToast({
          showToast: true,
          message: error.reason || t("An error occurred."),
          color: "danger",
        });
      });
  };

  return (
    <IonPage id="settingsPage">
      <IonToast
        isOpen={toast.showToast}
        message={toast.message}
        color={toast.color}
        duration={1000}
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
              "Memoria can connect to any CouchDB-compatible database. This is optional; the app works without a database connection. However, a backup is recommended."
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
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
