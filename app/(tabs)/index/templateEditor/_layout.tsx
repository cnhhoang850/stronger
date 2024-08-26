import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { Appearance, Text, View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function HomeLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Edit template",
          headerLargeTitle: false,
          headerTitle: (props) => <CustomTitle title={"Select exercises"} />,
        }}
      />
      <Stack.Screen
        name="selector"
        options={{
          title: "Select exercises",
          headerLargeTitle: false,
          headerTitle: (props) => <CustomTitle title={"Select exercises"} />,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerTitle: (props) => <CustomTitle title={"Details"} />,
        }}
      />
    </Stack>
  );
}

function CustomTitle({ title }) {
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={styles.bar}></View>
      <ThemedText type="subtitleSemiBold">{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    alignSelf: "center",
    width: 40,
    height: 5,
    backgroundColor: "gray",
    borderRadius: 40,
  },
});
