import React, { useLayoutEffect, useState } from "react";
import useStore from "@/store/useStore";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SymbolView, SymbolViewProps } from "expo-symbols";
import { SFSymbol } from "@/components/SFSymbols";
import { Searchbar, useTheme } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { Share } from "react-native";
import { useNavigation } from "expo-router";
import WorkoutCardSuspense from "@/components/WorkoutCardSuspense";

export default function App() {
  const theme = useTheme();
  const exerciseData = useStore((state) => state.exercises);
  const [searchVal, setSearchVal] = useState("");

  const navigation = useNavigation();

  const updateSearch = (search: string) => {
    setSearchVal(search);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        hideWhenScrolling: false,
      },
    });
  }, [navigation]);
  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <ThemedView style={styles.sectionListContainer}></ThemedView>
      <WorkoutCardSuspense />

      <WorkoutCardSuspense />

      <WorkoutCardSuspense />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionListContainer: {},
  searchbar: {
    margin: 16,
    backgroundColor: "transparent",
    borderRadius: 8,
  },
});
