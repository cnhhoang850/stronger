import { StyleSheet, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function IconText({ iconName, text }) {
  const { colors } = useTheme();

  return (
    <View style={styles.iconText}>
      <MaterialCommunityIcons name={iconName} size={18} style={styles.symbol} color={colors.primary} />
      <Text variant="bodyMedium">{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconText: {
    display: "flex",
    flexDirection: "row",
  },
  symbol: {
    marginRight: 5,
  },
});
