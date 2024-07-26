import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { Link } from "expo-router";

export default function LinkButton(props) {
  const { colors: paperColors } = useTheme();
  return (
    <Link
      href={{
        pathname: props.path,
        params: props.params,
      }}
      asChild
    >
      <Pressable
        style={{
          borderRadius: 10,
          width: 50,
          height: 30,
          margin: 0,
          backgroundColor: paperColors.primary,
          alignItems: "center",
        }}
      >
        <ThemedText
          lightColor={paperColors.inversePrimary}
          darkColor={paperColors.inversePrimary}
          type="defaultSemiBold"
        >
          ...
        </ThemedText>
      </Pressable>
    </Link>
  );
}
