import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    "Cinzel-Regular": require("../assets/fonts/Cinzel-Regular.otf"),
  });
};