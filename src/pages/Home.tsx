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

  if (hours >= 5 && hours < 11) return i18n.t("good morning.");
  if (hours >= 11 && hours < 18) return i18n.t("good day.");

  return i18n.t("good evening.");
};

const getWeekday = (date: Date) => {
  const days = [
    i18n.t("Sunday"),
    i18n.t("Monday"),
    i18n.t("Tuesday"),
    i18n.t("Wednesday"),
    i18n.t("Thursday"),
    i18n.t("Friday"),
    i18n.t("Saturday"),
  ];

  return days[date.getDay()];
};

const getDate = (date: Date) => {
  const months = [
    i18n.t("January"),
    i18n.t("February"),
    i18n.t("March"),
    i18n.t("April"),
    i18n.t("May"),
    i18n.t("June"),
    i18n.t("July"),
    i18n.t("August"),
    i18n.t("September"),
    i18n.t("October"),
    i18n.t("November"),
    i18n.t("December"),
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
      `${getDate(date)} ${date.getFullYear()}`,
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
          header={t("Create entry")}
          message={t("Do you want to add a new memory?")}
          buttons={[
            { text: t("Cancel"), role: "cancel" },
            { text: t("Create"), handler: openNewMemory },
          ]}
        />

        <IonAlert
          isOpen={showReflectionPrompt}
          onDidDismiss={() => setShowReflectionPrompt(false)}
          className="dayPrompt"
          header={t("Create entry")}
          message={t("For which day should an entry be created?")}
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
          data-cy="dayPrompt"
        />

        <div id="container">
          <header>
            <h1>{getGreeting()}</h1>
            <h2>{getDate(today())}</h2>
          </header>

          <WeekView />

          {/* ------- */}

          <h1 className="sectionHeader">{t("Journal")}</h1>

          <section className="cardContainer">
            <div
              className="card"
              onClick={decideReflectionPrompt}
              data-cy="addReflectionButton"
            >
              <h1>{t("Reflection")}</h1>
              <p>{t("What happened today?")}</p>
            </div>
            <div
              className="card"
              id="addMemoryTrigger"
              data-cy="addMemoryButton"
            >
              <h1>{t("Memories")}</h1>
              <p>{t("Capture thoughts and feelings")}</p>
            </div>
          </section>

          <Link id="databaseLink" to="/database">
            {t("Open database")}
          </Link>

          {/* ------- */}

          <Link id="settingsLink" to="/settings">
            {t("Settings")}
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
