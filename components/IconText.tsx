import { StyleSheet, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
export default function IconText({ iconName, text }) {
  const { colors } = useTheme();

  return (
    <View style={styles.iconText}>
      <MaterialCommunityIcons
        name={iconName}
        size={18}
        style={styles.symbol}
        color={colors.primary}
      />
      <ThemedText type="defaultSemiTrans">{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  iconText: {
    display: "flex",
    flexDirection: "row",
  },
  symbol: {
    marginRight: 2,
  },
});
