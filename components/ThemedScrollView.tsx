import { ScrollView, type ViewProps, KeyboardAvoidingView } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useTheme } from "react-native-paper";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedScrollView({ style, ...otherProps }) {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  );
}
