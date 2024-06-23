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

import "./Settings.scss";
import {
  Credentials,
  getCredentials,
  setCredentials,
  syncDatabase,
} from "../data/remote";

const Settings: React.FC = () => {
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
      message: "Verbindung wird hergestellt...",
      color: "light",
    });
    syncDatabase(pouch, credentials())
      .then(() => {
        setToast({
          showToast: true,
          message: "Die Datenbank wurde synchronisiert.",
          color: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        setToast({
          showToast: true,
          message: error.reason || "Ein Fehler ist aufgetreten.",
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
          <IonTitle>Einstellungen</IonTitle>

          <IonButtons slot="start">
            <IonBackButton color="dark" text="" defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div id="container">
          <p>
            Memoria kann sich mit jeder CouchDB kompatiblen Datenbank verbinden.
            Dies ist optional, die App funktioniert auch ohne Verbindung zu
            einer Datenbank. Jedoch ist eine Datensicherung empfehlenswert.
          </p>

          <IonList>
            <IonItem>
              <IonInput
                label="Server"
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
                label="Benutzer"
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
                label="Passwort"
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
              <b>Synchronisierung starten</b>
            </p>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
