import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { Appearance } from "react-native";

export default function HomeLayout() {
  const { colors } = useTheme();
  const platformColorScheme = Appearance.getColorScheme();
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_bottom",
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLargeTitleShadowVisible: false,
        headerSearchBarOptions: {
          placeholder: "Search",
        },
        headerLargeStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerLargeTitle: true,
          headerTitle: "Exercises",
          headerTransparent: true,
          headerBlurEffect: "regular",
        }}
      />
    </Stack>
  );
}
