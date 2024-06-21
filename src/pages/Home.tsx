import { IonContent, IonPage } from "@ionic/react";

import "./Home.scss";
import WeekView from "../components/WeekView";

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
  return (
    <IonPage id="homePage">
      <IonContent fullscreen>
        <div id="container">
          <header>
            <h1>{getGreeting()}</h1>
            <h2>{getDate()}</h2>
          </header>

          <WeekView />

          {/* ------- */}

          <h1 className="sectionHeader">Tagebuch</h1>

          <section className="card">
            <h1>Reflektion</h1>
            <p>Was ist heute passiert?</p>
          </section>
          <section className="card">
            <h1>Erinnerungen</h1>
            <p>Gedanken und Gefühle festhalten</p>
          </section>

          <a id="databaseLink" href="/database">
            Datenbank öffnen
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
