import React from "react";
import { TouchableOpacity, View, Image, ImageBackground, Text, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import capitalizeFirstLetter from "@/utils/capitalizeFirst";
import { Link } from "expo-router";

import Animated from "react-native-reanimated";

const ExerciseListItem = ({ style }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={style}>
      <View style={styles.textContentContainer}>
        <ThemedText type="default">{capitalizeFirstLetter("HELLO")}</ThemedText>
        <ThemedText
          style={{
            fontSize: 26,
            lineHeight: 32,
            marginBottom: -8,
            color: theme.colors.primary,
          }}
        >
          {capitalizeFirstLetter("HELLO")}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 12,
    paddingLeft: 20,
    paddingBottom: 2,
    height: 82,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  textContentContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    marginBottom: 6,
  },

  flexColumnSpaceAround: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default ExerciseListItem;
