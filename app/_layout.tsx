import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { MD3LightTheme as DefaultPaperTheme, PaperProvider } from "react-native-paper";

import { TouchableOpacity } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ExerciseListItem from "@/components/MinimizedWorkout";
import LinkButton from "@/components/LinkButton";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const paperTheme = {
  ...DefaultPaperTheme,

  colors: {
    primary: "rgb(165, 248, 71)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(212, 227, 255)",
    onPrimaryContainer: "rgb(0, 28, 58)",
    secondary: "rgb(84, 95, 113)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(216, 227, 248)",
    onSecondaryContainer: "rgb(17, 28, 43)",
    tertiary: "rgb(186, 26, 32)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 218, 214)",
    onTertiaryContainer: "rgb(65, 0, 3)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "#F5F5F7",
    parallaxBackground: "#fff",
    onBackground: "rgb(26, 28, 30)",
    inverseBackground: "rgb(0,0,0)",
    surface: "rgb(253, 252, 255)",
    onSurface: "rgb(26, 28, 30)",
    surfaceVariant: "rgb(255, 255, 255)",
    onSurfaceVariant: "rgb(67, 71, 78)",
    outline: "rgb(116, 119, 127)",
    outlineVariant: "rgb(195, 198, 207)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 48, 51)",
    inverseOnSurface: "rgb(241, 240, 244)",
    inversePrimary: "rgb(165, 200, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(241,240,245)",
      onLevel1: "rgb(255, 255, 255)",
      level2: "rgb(255, 255, 255)",
      onLevel2: "rgb(151, 150, 153)",
      level3: "rgb(225, 235, 246)",
      level4: "rgb(255, 255, 255)",
      level5: "rgb(255, 255, 255)",
    },
    success: "#4cd964",
    surfaceDisabled: "rgba(26, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
    backdrop: "rgba(45, 49, 56, 0.4)",
  },
};

const darkPaperTheme = {
  ...DefaultPaperTheme,
  colors: {
    primary: "rgb(165, 248, 71)",
    onPrimary: "rgb(0, 49, 95)",
    primaryContainer: "rgb(0, 71, 134)",
    onPrimaryContainer: "rgb(212, 227, 255)",
    secondary: "rgb(188, 199, 220)",
    onSecondary: "rgb(39, 49, 65)",
    secondaryContainer: "rgb(61, 71, 88)",
    onSecondaryContainer: "rgb(216, 227, 248)",
    tertiary: "rgb(255, 179, 172)",
    onTertiary: "rgb(104, 0, 8)",
    tertiaryContainer: "rgb(147, 0, 16)",
    onTertiaryContainer: "rgb(255, 218, 214)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(0, 0, 0)",
    paraBackground: "rgb(0, 0, 0)",
    onBackground: "rgb(227, 226, 230)",
    surface: "rgb(26, 28, 30)",
    onSurface: "rgb(227, 226, 230)",
    surfaceVariant: "#161618",
    onSurfaceVariant: "rgb(195, 198, 207)",
    outline: "rgb(141, 145, 153)",
    outlineVariant: "rgb(67, 71, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(227, 226, 230)",
    inverseOnSurface: "rgb(47, 48, 51)",
    inversePrimary: "rgb(0, 95, 175)",
    elevation: {
      level0: "transparent",
      level1: "#1C1C1E",
      onLevel1: "rgb(46,46,47)",
      level2: "rgb(37, 42, 48)",
      onLevel2: "rgb(151, 150, 153)",
      level3: "rgb(41, 47, 55)",
      level4: "rgb(43, 49, 57)",
      level5: "rgb(46, 52, 62)",
    },
    success: "#4cd964",
    surfaceDisabled: "rgba(227, 226, 230, 0.12)",
    onSurfaceDisabled: "rgba(227, 226, 230, 0.38)",
    backdrop: "rgba(45, 49, 56, 0.4)",
  },
};
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const navigation = useNavigation();

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <PaperProvider theme={colorScheme === "dark" ? darkPaperTheme : paperTheme}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.background,
              },
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerLargeTitleShadowVisible: true,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="newWorkout" options={{ headerShown: false, presentation: "modal" }} />
            <Stack.Screen name="+not-found" />
          </Stack>

          <TouchableOpacity onPress={() => navigation.navigate("newWorkout")}>
            <ThemedText
              style={{
                position: "absolute",
                bottom: 100,
                color: "white",
                fontSize: 20,
              }}
            >
              kdjsa;lkfsa
            </ThemedText>
          </TouchableOpacity>
        </PaperProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
