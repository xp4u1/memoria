import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Database.scss";
import DatabaseEntryCard from "../components/DatabaseEntryCard";
import { useAllDocs } from "use-pouchdb";

const Database: React.FC = () => {
  const documents = useAllDocs();

  return (
    <IonPage id="databasePage">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Datenbank</IonTitle>

          <IonButtons slot="start">
            <IonBackButton color="dark" text="" defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container">
          <IonSearchbar
            onIonChange={(event) => console.debug(event)}
            placeholder="Einträge suchen"
          />

          {documents.rows.map((row) => (
            <DatabaseEntryCard key={row.id} id={row.id} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Database;
