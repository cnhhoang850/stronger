import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { Appearance, StyleSheet } from "react-native";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function HomeLayout() {
  const { colors } = useTheme();
  const platformColorScheme = Appearance.getColorScheme();

  function CustomTitle({ title }) {
    return (
      <View style={{ display: "flex", flexDirection: "column", backgroundColor: colors.elevation.level1 }}>
        <ThemedText type="subtitleSemiBold">{title}</ThemedText>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          fontWeight: "bold",
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
          headerLargeStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLargeStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          title: "New Exercise",
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
          presentation: "formSheet",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  bar: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 40,
  },
});
