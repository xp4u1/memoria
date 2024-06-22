import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAllDocs } from "use-pouchdb";
import { useEffect, useState } from "react";

import "./Database.scss";
import DatabaseEntryCard from "../components/DatabaseEntryCard";

const Database: React.FC = () => {
  const allDocsResult = useAllDocs({
    include_docs: true,
    descending: true,
  });

  const [rows, setRows] = useState<any[]>([]);
  const [visibleRows, setVisibleRows] = useState<any[]>([]);

  useEffect(() => {
    if (allDocsResult.state !== "done") return;
    setRows(allDocsResult.rows);
  }, [allDocsResult]);

  useEffect(() => {
    setVisibleRows(rows.slice(0, 20));
  }, [rows]);

  const addRows = () => {
    const count = visibleRows.length;
    setVisibleRows([...visibleRows, ...rows.slice(count, count + 10)]);
  };

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

          {visibleRows.map((row) => (
            <DatabaseEntryCard key={row.id} document={row.doc} />
          ))}

          <IonInfiniteScroll
            onIonInfinite={(event) => {
              addRows();
              setTimeout(() => event.target.complete(), 500);
            }}
          >
            <IonInfiniteScrollContent />
          </IonInfiniteScroll>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Database;
