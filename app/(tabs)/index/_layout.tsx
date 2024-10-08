import { Stack, useGlobalSearchParams } from "expo-router";
import { useTheme } from "react-native-paper";
import { Appearance } from "react-native";

export default function HomeLayout() {
  const params = useGlobalSearchParams();
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLargeTitleShadowVisible: false,
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
          headerTitle: "Home",
          headerTransparent: true,
          headerBlurEffect: "regular",
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          headerShown: true,
          headerLargeTitle: true,
          headerTitle: "Home",
          headerTransparent: true,
          headerBlurEffect: "regular",
        }}
      />
      <Stack.Screen
        name="templateEditor"
        options={{
          headerShown: false,
          headerLargeTitle: true,
          headerTitle: "Start workout",
          headerTransparent: true,
          headerBlurEffect: "regular",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
