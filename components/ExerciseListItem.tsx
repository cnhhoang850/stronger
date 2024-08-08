import React from "react";
import { View, Image, ImageBackground, Text, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "react-native-paper";

const ExerciseListItem = ({ image, title, description }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surfaceVariant }]}>
      <ImageBackground
        style={{ marginTop: 6, borderRadius: 6, backgroundColor: "#fff", height: 50, width: 50 }}
      >
        <Image source={image} style={styles.image} />
      </ImageBackground>
      <View style={styles.textContentContainer}>
        <ThemedText type="subtitleSemiBold" style={styles.themedTextBold}>
          {title}
        </ThemedText>
        <ThemedText>{description}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    paddingLeft: 6,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  textContentContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 8,
    marginBottom: 6,
  },

  flexColumnSpaceAround: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default ExerciseListItem;
