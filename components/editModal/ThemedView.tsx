import { View, type ViewProps, KeyboardAvoidingView } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useTheme } from "react-native-paper";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { colors } = useTheme();
  //const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return (
    <View
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  );
}
