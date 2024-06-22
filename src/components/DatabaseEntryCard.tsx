import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { pencil, trash } from "ionicons/icons";
import { useDoc, usePouch } from "use-pouchdb";

import "./DatabaseEntryCard.scss";
import { Entry } from "../data/entry";

const DatabaseEntryCard: React.FC<{ id: string }> = ({ id }) => {
  const result = useDoc<Entry>(id);
  const router = useIonRouter();
  const pouch = usePouch();

  if (result.state === "error")
    return <p>Eintrag konnte nicht geladen werden.</p>;

  const removeDocument = () => {
    pouch.remove(result.doc!);
  };

  const editDocument = () => {
    router.push("/writer/" + result.doc?._id);
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{result.doc?.title}</IonCardTitle>
        <IonCardSubtitle>
          {new Date(result.doc?.createdAt!).toLocaleDateString("de-DE")}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton color="dark" size="small">
                Lesen
              </IonButton>
            </IonCol>
            <IonCol className="actionButtons">
              <IonButton
                onClick={editDocument}
                color="dark"
                size="small"
                fill="clear"
              >
                <IonIcon icon={pencil} slot="icon-only" size="small" />
              </IonButton>
              <IonButton
                onClick={removeDocument}
                color="dark"
                size="small"
                fill="clear"
              >
                <IonIcon icon={trash} slot="icon-only" size="small" />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default DatabaseEntryCard;
