import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedView } from "@/components/ThemedView";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { SymbolView, SymbolViewProps } from "expo-symbols";
import { StyleSheet, View, Text } from "react-native";
import { SFSymbol } from "@/components/SFSymbols";
export function SFTabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof SymbolView>["name"]>) {
  return (
    <Text style={styles.container}>
      <SFSymbol style={[styles.symbol, style]} {...rest} type="monochrome" />
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 2.5,
  },
  symbol: {
    width: 32,
    height: 32,
  },
});
