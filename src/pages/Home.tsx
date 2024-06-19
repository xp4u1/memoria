import { IonContent, IonPage } from "@ionic/react";

import "./Home.scss";
import WeekView from "../components/WeekView";

const Home: React.FC = () => {
  return (
    <IonPage id="homePage">
      <IonContent fullscreen>
        <div id="container">
          <header>
            <h1>guten abend.</h1>
            <h2>Sonntag, 2. Juni</h2>
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
