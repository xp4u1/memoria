import { IonAlert, IonContent, IonPage, useIonRouter } from "@ionic/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePouch } from "use-pouchdb";

import "./Home.scss";
import WeekView from "../components/WeekView";
import { generateMemoryID, generateReflectionID } from "../data/entry";

const getGreeting = () => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 11) return "guten morgen.";
  if (hours >= 11 && hours < 18) return "guten tag.";

  return "guten abend.";
};

const getWeekday = (date: Date) => {
  const days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];

  return days[date.getDay()];
};

const getDate = (date: Date) => {
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
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
          header="Eintrag erstellen"
          message="Willst du eine neue Erinnerung hinzufügen?"
          buttons={[
            { text: "Abbrechen", role: "cancel" },
            { text: "Erstellen", handler: openNewMemory },
          ]}
        />

        <IonAlert
          isOpen={showReflectionPrompt}
          onDidDismiss={() => setShowReflectionPrompt(false)}
          className="dayPrompt"
          header="Eintrag erstellen"
          message="Für welchen Tag soll ein Eintrag erstellt werden?"
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

          <h1 className="sectionHeader">Tagebuch</h1>

          <section className="card" onClick={decideReflectionPrompt}>
            <h1>Reflektion</h1>
            <p>Was ist heute passiert?</p>
          </section>
          <section className="card" id="addMemoryTrigger">
            <h1>Erinnerungen</h1>
            <p>Gedanken und Gefühle festhalten</p>
          </section>

          <Link id="databaseLink" to="/database">
            Datenbank öffnen
          </Link>

          {/* ------- */}

          <Link id="settingsLink" to="/settings">
            Einstellungen
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
