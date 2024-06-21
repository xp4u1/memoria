import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { StatusBar, Style } from "@capacitor/status-bar";
import PouchDB from "pouchdb-browser";
import { Provider } from "use-pouchdb";

import Home from "./pages/Home";
import Writer from "./pages/Writer";
import Database from "./pages/Database";
import Auth from "./pages/Auth";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css"; TODO: add dark mode

/* Font */
import "@fontsource/inter/400.css"; // Regular
import "@fontsource/inter/500.css"; // Medium
import "@fontsource/inter/700.css"; // Bold
import "@fontsource/inter/800.css"; // Extra Bold

/* Theme variables */
import "./theme/variables.css";

setupIonicReact({ mode: "ios" });

StatusBar.setStyle({ style: Style.Light });
StatusBar.setBackgroundColor({ color: "#f1f3f4" });

const database = new PouchDB("memoria");

const App: React.FC = () => (
  <Provider pouchdb={database}>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/writer/:id">
            <Writer />
          </Route>
          <Route exact path="/database">
            <Database />
          </Route>
          <Route exact path="/">
            {/* <Redirect to="/home" /> */}
            <Auth />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </Provider>
);

export default App;
