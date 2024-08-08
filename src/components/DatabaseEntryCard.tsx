import {
  IonAlert,
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
import { useTranslation } from "react-i18next";

import "./DatabaseEntryCard.scss";

const DatabaseEntryCard: React.FC<{ document: any }> = ({ document }) => {
  const { t } = useTranslation();

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
      <IonAlert
        trigger={"removeDocumentTrigger-" + document._id}
        header={t("Eintrag löschen")}
        message={t("Diese Aktion kann nicht rückgängig gemacht werden.")}
        buttons={[
          { text: t("Abbrechen"), role: "cancel" },
          { text: t("Löschen"), handler: removeDocument },
        ]}
      />

      <IonCardHeader>
        <IonCardTitle>{document.title}</IonCardTitle>
        <IonCardSubtitle>
          {new Date(document.createdAt).toLocaleDateString()}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton onClick={editDocument} color="dark" size="small">
                {t("Öffnen")}
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
                id={"removeDocumentTrigger-" + document._id}
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
