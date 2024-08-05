import React, { memo } from "react";
import { StyleSheet } from "react-native";

import { Card as PaperCard } from "react-native-paper";

const ExerciseDataTableSuspense = ({}) => {
  return (
    <PaperCard mode="contained" style={styles.cardContainer}>
      {}
    </PaperCard>
  );
};

export default memo(ExerciseDataTableSuspense);

const styles = StyleSheet.create({
  cardContainer: {
    padding: 2,
    paddingRight: 0,
    paddingLeft: 12,
    marginBottom: 26,
    marginLeft: 16,
    marginRight: 16,
    height: 200,
  },
  entryColumn: {
    paddingBottom: 0,
    marginBottom: -12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
    height: 28,
  },
  input: {
    width: 38,
    height: 24,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    textAlign: "left",
    fontSize: 16,
    borderWidth: 2,
    padding: 2,
  },
  focusedInput: {
    borderWidth: 2,
    padding: 2,
    borderStyle: "solid",
  },
  inputUnit: {
    marginLeft: 4,
  },
  headerText: {
    marginBottom: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuContainer: {
    position: "absolute",
    width: 100,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
    padding: 8,
  },
  menuItem: {
    padding: 10,
  },
});
