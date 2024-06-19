import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";

import "./Writer.scss";

const Writer: React.FC = () => {
  return (
    <IonPage id="writerPage">
      <IonContent fullscreen>
        <div className="container">
          <IonTextarea
            className="title"
            placeholder="Unbenannt"
            rows={1}
            autoGrow
          />
          <IonTextarea placeholder="Schreibe etwas..." autoGrow autoFocus />
        </div>

        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton mode="ios" color="dark" size="small">
            <IonIcon icon={checkmark} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Writer;
