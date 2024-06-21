import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonTextarea,
  useIonRouter,
  useIonViewDidEnter,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useParams } from "react-router";
import { usePouch } from "use-pouchdb";

import "./Writer.scss";
import { Entry } from "../data/entry";
import { useState } from "react";

const Writer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useIonRouter();
  const pouch = usePouch();

  const [rev, setRev] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useIonViewDidEnter(() => {
    pouch
      .get(id)
      .then((document) => {
        const entry = document as unknown as Entry;

        setRev(document._rev);
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
            placeholder="Unbenannt"
            rows={1}
            autoGrow
            value={title}
            onIonChange={(event) => setTitle(event.target.value || "")}
          />
          <IonTextarea
            placeholder="Schreibe etwas..."
            autoGrow
            autoFocus
            value={body}
            onIonChange={(event) => setBody(event.target.value || "")}
          />
        </div>

        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton onClick={save} mode="ios" color="dark" size="small">
            <IonIcon icon={checkmark} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Writer;
