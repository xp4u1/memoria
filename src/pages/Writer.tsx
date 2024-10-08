import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonTextarea,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useParams } from "react-router";
import { usePouch } from "use-pouchdb";
import { useTranslation } from "react-i18next";

import "./Writer.scss";
import { Entry } from "../data/entry";
import { useState } from "react";

const Writer: React.FC = () => {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const router = useIonRouter();
  const pouch = usePouch();

  const [rev, setRev] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useIonViewWillEnter(() => {
    pouch
      .get(id)
      .then((document) => {
        const entry = document as unknown as Entry;

        setRev(document._rev);
        setCreatedAt(entry.createdAt);
        setTitle(entry.title);
        setBody(entry.body);
      })
      .catch((error) => {
        console.error(error);
        router.push("/home", "back", "replace");
      });
  });

  const save = () => {
    pouch
      .put({
        _id: id,
        _rev: rev,
        title: title,
        body: body,
        createdAt: createdAt,
        updatedAt: new Date().toISOString(),
      })
      .then(() => {
        router.goBack();
      });
  };

  return (
    <IonPage id="writerPage">
      <IonContent fullscreen>
        <div className="container">
          <IonTextarea
            className="title"
            placeholder={t("Untitled")}
            rows={1}
            autoGrow
            value={title}
            onIonInput={(event) => setTitle(event.target.value || "")}
            data-cy="titleInput"
          />
          <IonTextarea
            placeholder={t("Write something...")}
            autoGrow
            autoFocus
            value={body}
            onIonInput={(event) => setBody(event.target.value || "")}
          />
        </div>

        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton
            onClick={save}
            mode="ios"
            color="dark"
            size="small"
            data-cy="saveButton"
          >
            <IonIcon icon={checkmark} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Writer;
