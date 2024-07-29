import { View, type ViewProps, KeyboardAvoidingView } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useTheme } from "react-native-paper";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedKeyboardAvoidingView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { colors } = useTheme();
  //const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[
        {
          backgroundColor: colors.background,
          justifyContent: "flex-end",
          flex: 1,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
