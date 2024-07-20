import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "defaultSemiTrans"
    | "subtitle"
    | "link"
    | "subtitleSemiBold";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "defaultSemiTrans" ? styles.defaultSemiTrans : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "subtitleSemiBold" ? styles.subtitleSemiBold : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const FONT_SIZES = {
  small: 12,
  medium: 15,
  default: 16,
  large: 22,
  extraLarge: 32,
};

const LINE_HEIGHTS = {
  small: 18,
  medium: 18,
  default: 24,
  large: 32,
  extraLarge: 32,
};

const FONT_WEIGHTS = {
  regular: "400" as const,
  semiBold: "600" as const,
  bold: "700" as const,
};

const styles = StyleSheet.create({
  default: {
    fontSize: FONT_SIZES.default,
    lineHeight: LINE_HEIGHTS.default,
    fontWeight: FONT_WEIGHTS.regular,
  },
  defaultSemiBold: {
    fontSize: FONT_SIZES.large,
    lineHeight: LINE_HEIGHTS.default,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  defaultSemiTrans: {
    fontSize: FONT_SIZES.medium,
    lineHeight: LINE_HEIGHTS.small,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.8,
  },
  title: {
    fontSize: FONT_SIZES.extraLarge,
    lineHeight: LINE_HEIGHTS.extraLarge,
    fontWeight: FONT_WEIGHTS.bold,
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    lineHeight: LINE_HEIGHTS.default,
    opacity: 0.7,
  },
  subtitleSemiBold: {
    fontSize: FONT_SIZES.medium,
    lineHeight: LINE_HEIGHTS.large,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  link: {
    fontSize: FONT_SIZES.default,
    lineHeight: LINE_HEIGHTS.large,
    color: "#0a7ea4",
  },
});
