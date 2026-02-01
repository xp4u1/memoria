import { Preferences } from "@capacitor/preferences";

export const setPreference = async (key: string, value: unknown) => {
  await Preferences.set({
    key: key,
    value: JSON.stringify(value),
  });
};

export const getPreference = async (key: string) => {
  const result = await Preferences.get({ key: key });
  return JSON.parse(result.value!);
};
