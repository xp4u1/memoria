import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Database.scss";
import DatabaseEntryCard from "../components/DatabaseEntryCard";

const Database: React.FC = () => {
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

          <DatabaseEntryCard />
          <DatabaseEntryCard />
          <DatabaseEntryCard />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Database;
