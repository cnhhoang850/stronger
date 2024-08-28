import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { Link } from "expo-router";
import { SFTabBarIcon } from "@/components/SFTabBarIcon";

export default function ForwardButton(props) {
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
          height: 50,
          margin: 0,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <SFTabBarIcon style={{ width: 24, height: 24 }} name={"chevron.right"} color={paperColors.primary} />
      </Pressable>
    </Link>
  );
}
