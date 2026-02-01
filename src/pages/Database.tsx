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
import { useState, useMemo } from "react";
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
  const [visibleCount, setVisibleCount] = useState(20);

  const rows = useMemo(
    () => (allDocsResult.state === "done" ? allDocsResult.rows : []),
    [allDocsResult.state, allDocsResult.rows],
  );

  const filteredRows = useMemo(() => {
    const user_query = query.trim().toLowerCase();
    if (!user_query) return rows;
    return rows.filter((row) =>
      (row.doc as PouchDB.Core.ExistingDocument<Entry>).title
        .toLowerCase()
        .includes(user_query),
    );
  }, [rows, query]);

  const visibleRows = useMemo(
    () => filteredRows.slice(0, visibleCount),
    [filteredRows, visibleCount],
  );

  const addRows = () => {
    setVisibleCount(visibleCount + 10);
  };

  return (
    <IonPage id="databasePage">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>{t("Database")}</IonTitle>

          <IonButtons slot="start">
            <IonBackButton color="dark" text="" defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container">
          <IonSearchbar
            onIonInput={(event) => setQuery(event.detail.value || "")}
            placeholder={t("Search entries")}
          />

          {allDocsResult.state === "loading" && (
            <p>{t("Loading entries...")}</p>
          )}

          <section className="cards" data-cy="databaseEntries">
            {visibleRows.map((row) => (
              <DatabaseEntryCard
                key={row.id}
                document={row.doc as PouchDB.Core.ExistingDocument<Entry>}
              />
            ))}
          </section>

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
