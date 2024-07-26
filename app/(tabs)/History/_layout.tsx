import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function HomeLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_bottom",
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLargeTitleShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerLargeTitle: true,
          headerTitle: "History",
        }}
      />
      <Stack.Screen name="modal" options={{ title: "Edit workout", presentation: "modal" }} />
    </Stack>
  );
}
