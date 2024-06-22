import { IonAlert, IonContent, IonPage, useIonRouter } from "@ionic/react";
import { usePouch } from "use-pouchdb";

import "./Home.scss";
import WeekView from "../components/WeekView";
import { generateMemoryID, generateReflectionID } from "../data/entry";
import { Link } from "react-router-dom";

const getGreeting = () => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 11) return "guten morgen.";
  if (hours >= 11 && hours < 18) return "guten tag.";

  return "guten abend.";
};

const getDate = () => {
  const today = new Date();

  const days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
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

  return `${days[today.getDay()]}, ${today.getDate()}. ${
    months[today.getMonth()]
  }`;
};

const Home: React.FC = () => {
  const router = useIonRouter();
  const pouch = usePouch();

  const createAndNavigate = (id: string, title: string) => {
    const now = new Date();

    // Fails (without error) if the document already exists.
    pouch.put({
      _id: id,
      title: title,
      body: "",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });

    router.push("/writer/" + id);
  };

  const openReflection = () => {
    const today = new Date();

    createAndNavigate(
      generateReflectionID(today),
      today.toLocaleDateString("de-DE")
    );
  };

  const openNewMemory = () => {
    createAndNavigate(generateMemoryID(), "");
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
          mode="md"
        />

        <div id="container">
          <header>
            <h1>{getGreeting()}</h1>
            <h2>{getDate()}</h2>
          </header>

          <WeekView />

          {/* ------- */}

          <h1 className="sectionHeader">Tagebuch</h1>

          <section className="card" onClick={openReflection}>
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
