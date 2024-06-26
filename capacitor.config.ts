import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "de.xp4u1.memoria",
  appName: "memoria",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  server: {
    url: "http://192.168.178.110:5173",
    cleartext: true,
  },
};

export default config;
