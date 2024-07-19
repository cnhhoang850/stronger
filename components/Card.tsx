import { StyleSheet, Platform, View } from "react-native";
import { Card as PaperCard } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import React from "react";

export default function Card(props) {
  return (
    <PaperCard style={styles.cardContainer}>
      <PaperCard.Content>{props.children}</PaperCard.Content>
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginBottom: "5%",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
  },
  symbol: {
    marginRight: 5,
  },
});
