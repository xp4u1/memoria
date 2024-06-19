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
} from "@ionic/react";
import { pencil, trash } from "ionicons/icons";

import "./DatabaseEntryCard.scss";

const DatabaseEntryCard: React.FC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Verrückte Begegnung</IonCardTitle>
        <IonCardSubtitle>19. Juni 2024</IonCardSubtitle>
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
              <IonButton color="dark" size="small" fill="clear">
                <IonIcon icon={pencil} slot="icon-only" size="small" />
              </IonButton>
              <IonButton color="dark" size="small" fill="clear">
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
