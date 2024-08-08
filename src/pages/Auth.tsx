import {
  IonContent,
  IonPage,
  IonToast,
  useIonRouter,
  useIonViewDidEnter,
} from "@ionic/react";
import { useState } from "react";
import {
  BiometricAuth,
  BiometryError,
} from "@aparajita/capacitor-biometric-auth";
import { Trans, useTranslation } from "react-i18next";

import "./Auth.scss";

const Auth: React.FC = () => {
  const { t } = useTranslation();

  const router = useIonRouter();
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigateHome = () => {
    router.push("/home", "none", "replace");
  };

  const authenticate = async () => {
    const info = await BiometricAuth.checkBiometry();
    if (!info.isAvailable || info.biometryType === 0) {
      navigateHome();
      return;
    }

    try {
      await BiometricAuth.authenticate({
        androidTitle: t("Entsperre memoria"),
        cancelTitle: t("Abbrechen"),
      });
      navigateHome();
    } catch (error) {
      console.error((error as BiometryError).message);
      setMessage(t("Ein Fehler ist aufgetreten. Versuche es erneut!"));
      setShowToast(true);
    }
  };

  useIonViewDidEnter(() => {
    setTimeout(authenticate, 100);
  });

  return (
    <IonPage id="authPage">
      <IonContent fullscreen>
        <div id="container">
          <IonToast
            color="danger"
            duration={2000}
            isOpen={showToast}
            message={message}
          />

          <h1>{t("App entsperren")}</h1>
          <p onClick={authenticate}>
            <Trans t={t}>
              Klicke <b>hier</b>, um die App zu entsperren.
            </Trans>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Auth;
