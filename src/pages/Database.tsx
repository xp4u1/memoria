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
import { useTranslation } from "react-i18next";

import "./Database.scss";
import DatabaseEntryCard from "../components/DatabaseEntryCard";
import { Entry } from "../data/entry";

const Database: React.FC = () => {
  const { t } = useTranslation();

  const allDocsResult = useAllDocs({
    include_docs: true,
    descending: true,
  });

  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [visibleRows, setVisibleRows] = useState<any[]>([]);

  useEffect(() => {
    if (allDocsResult.state !== "done") return;
    setRows(allDocsResult.rows);
  }, [allDocsResult]);

  useEffect(() => {
    setVisibleRows(rows.slice(0, 20));
  }, [rows]);

  useEffect(() => filterRows(), [query]);

  const addRows = () => {
    const count = visibleRows.length;
    setVisibleRows([...visibleRows, ...rows.slice(count, count + 10)]);
  };

  const filterRows = () => {
    if (query === "") setRows(allDocsResult.rows);
    else
      setRows(
        allDocsResult.rows.filter((row) =>
          (row.doc as unknown as Entry).title
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      );

    setVisibleRows(rows.slice(0, 20));
  };

  return (
    <IonPage id="databasePage">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>{t("Datenbank")}</IonTitle>

          <IonButtons slot="start">
            <IonBackButton color="dark" text="" defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container">
          <IonSearchbar
            onIonInput={(event) => setQuery(event.detail.value || "")}
            placeholder={t("Einträge suchen")}
          />

          {allDocsResult.state === "loading" && (
            <p>{t("Einträge werden geladen...")}</p>
          )}

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
