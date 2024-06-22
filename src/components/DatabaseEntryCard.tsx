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
import { usePouch } from "use-pouchdb";

import "./DatabaseEntryCard.scss";

const DatabaseEntryCard: React.FC<{ document: any }> = ({ document }) => {
  const router = useIonRouter();
  const pouch = usePouch();

  const removeDocument = () => {
    pouch.remove(document);
  };

  const editDocument = () => {
    router.push("/writer/" + document._id);
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{document.title}</IonCardTitle>
        <IonCardSubtitle>
          {new Date(document.createdAt).toLocaleDateString("de-DE")}
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
