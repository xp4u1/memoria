import { IonAlert, IonContent, IonPage, useIonRouter } from "@ionic/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePouch } from "use-pouchdb";
import { useTranslation } from "react-i18next";

import i18n from "../i18n";
import "./Home.scss";
import WeekView from "../components/WeekView";
import { generateMemoryID, generateReflectionID } from "../data/entry";

const getGreeting = () => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 11) return i18n.t("guten morgen.");
  if (hours >= 11 && hours < 18) return i18n.t("guten tag.");

  return i18n.t("guten abend.");
};

const getWeekday = (date: Date) => {
  const days = [
    i18n.t("Sonntag"),
    i18n.t("Montag"),
    i18n.t("Dienstag"),
    i18n.t("Mittwoch"),
    i18n.t("Donnerstag"),
    i18n.t("Freitag"),
    i18n.t("Samstag"),
  ];

  return days[date.getDay()];
};

const getDate = (date: Date) => {
  const months = [
    i18n.t("Januar"),
    i18n.t("Februar"),
    i18n.t("März"),
    i18n.t("April"),
    i18n.t("Mai"),
    i18n.t("Juni"),
    i18n.t("Juli"),
    i18n.t("August"),
    i18n.t("September"),
    i18n.t("Oktober"),
    i18n.t("November"),
    i18n.t("Dezember"),
  ];

  return `${getWeekday(date)}, ${date.getDate()}. ${months[date.getMonth()]}`;
};

const today = () => {
  return new Date();
};

const yesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  return date;
};

const Home: React.FC = () => {
  const { t } = useTranslation();

  const router = useIonRouter();
  const pouch = usePouch();

  const [showReflectionPrompt, setShowReflectionPrompt] = useState(false);

  const createAndNavigate = (id: string, title: string) => {
    const now = new Date();

    // Fails (without error) if the document already exists.
    pouch
      .put({
        _id: id,
        title: title,
        body: "",
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      })
      .catch(() => {});

    router.push("/writer/" + id);
  };

  const openReflection = (date: Date) => {
    createAndNavigate(
      generateReflectionID(date),
      `${getDate(date)} ${date.getFullYear()}`
    );
  };

  const openNewMemory = () => {
    createAndNavigate(generateMemoryID(today()), "");
  };

  /**
   * Ask the user shortly after midnight for
   * which day an entry should be created.
   */
  const decideReflectionPrompt = () => {
    const date = today();

    if (date.getHours() < 5) {
      setShowReflectionPrompt(true);
    } else {
      openReflection(date);
    }
  };

  return (
    <IonPage id="homePage">
      <IonContent fullscreen>
        <IonAlert
          trigger="addMemoryTrigger"
          header={t("Eintrag erstellen")}
          message={t("Willst du eine neue Erinnerung hinzufügen?")}
          buttons={[
            { text: t("Abbrechen"), role: "cancel" },
            { text: t("Erstellen"), handler: openNewMemory },
          ]}
        />

        <IonAlert
          isOpen={showReflectionPrompt}
          onDidDismiss={() => setShowReflectionPrompt(false)}
          className="dayPrompt"
          header={t("Eintrag erstellen")}
          message={t("Für welchen Tag soll ein Eintrag erstellt werden?")}
          buttons={[
            {
              text: getWeekday(yesterday()),
              handler: () => openReflection(yesterday()),
            },
            {
              text: getWeekday(today()),
              handler: () => openReflection(today()),
            },
          ]}
        />

        <div id="container">
          <header>
            <h1>{getGreeting()}</h1>
            <h2>{getDate(today())}</h2>
          </header>

          <WeekView />

          {/* ------- */}

          <h1 className="sectionHeader">{t("Tagebuch")}</h1>

          <section className="card" onClick={decideReflectionPrompt}>
            <h1>{t("Reflektion")}</h1>
            <p>{t("Was ist heute passiert?")}</p>
          </section>
          <section className="card" id="addMemoryTrigger">
            <h1>{t("Erinnerungen")}</h1>
            <p>{t("Gedanken und Gefühle festhalten")}</p>
          </section>

          <Link id="databaseLink" to="/database">
            {t("Datenbank öffnen")}
          </Link>

          {/* ------- */}

          <Link id="settingsLink" to="/settings">
            {t("Einstellungen")}
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
