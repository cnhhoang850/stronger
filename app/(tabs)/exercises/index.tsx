import React, { useLayoutEffect, useState, useRef } from "react";
import useStore from "@/store/useStore";
import { StyleSheet, Text, View, SectionList } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "expo-router";
import { useTheme } from "react-native-paper";
import ExerciseImages from "@/assets/exercises/images";
import ExerciseListItem from "@/components/ExerciseListItem";
import { FlashList } from "@shopify/flash-list";
import { sort } from "fast-sort";

export default function App() {
  const theme = useTheme();
  const exerciseData = useStore((state) => state.exercises);

  const [filter, setFilter] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchVal, setSearchVal] = useState("");
  const [exercisesState, setExercisesState] = useState(
    preprocessDataFlashList(exerciseData, searchVal, filter, sortOrder),
  );

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        hideWhenScrolling: false,
        onChangeText: (event) => {
          setExercisesState(preprocessDataFlashList(exerciseData, event.nativeEvent.text, filter, sortOrder));
        },
      },
    });
  }, [navigation]);

  const FlatlistItemSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: "100%",
          backgroundColor: theme.colors.outlineVariant,
          marginVertical: 6,
        }}
      />
    );
  };

  const flashListRender = ({ item }) => {
    if (typeof item === "string") {
      return (
        <ThemedText style={{ opacity: 0.7, fontSize: 18, paddingLeft: 12, marginBottom: -8 }} type="default">
          {item}
        </ThemedText>
      );
    }

    const source = `img${item.id}` as keyof typeof ExerciseImages;
    return <ExerciseListItem title={item.name} image={ExerciseImages[source]} description={item.target} />;
  };

  return (
    <ThemedView style={{ backgroundColor: theme.colors.background, height: "100%" }}>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        data={exercisesState}
        renderItem={flashListRender}
        estimatedItemSize={62}
        ItemSeparatorComponent={FlatlistItemSeparator}
        getItemType={(item) => {
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
        contentContainerStyle={styles.sectionListContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  sectionListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchbar: {
    margin: 16,
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

const preprocessDataFlashListSlow = (data, searchVal, filterBy, sortOrder) => {
  // Filter data based on the search value
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchVal.toLowerCase()));

  // Use an object to map sections by key
  const sectionMap = {};

  filteredData.forEach((item) => {
    const sectionKey = filterBy === "muscle" ? item.target : item.name[0].toUpperCase();
    if (!sectionMap[sectionKey]) {
      sectionMap[sectionKey] = [];
    }
    sectionMap[sectionKey].push(item);
  });

  // Get and sort section titles
  const sortedSections = Object.keys(sectionMap).sort((a, b) =>
    sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a),
  );

  // Prepare the FlashList data
  const flashListData = [];
  sortedSections.forEach((key) => {
    flashListData.push(key); // Section header
    const sortedItems = sectionMap[key].sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    flashListData.push(...sortedItems); // Section items
  });

  return flashListData;
};

const preprocessDataFlashList = (data, searchVal, filterBy, sortOrder) => {
  // Filter data based on the search value
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchVal.toLowerCase()));

  // Use an object to map sections by key
  const sectionMap = {};

  filteredData.forEach((item) => {
    const sectionKey = filterBy === "muscle" ? item.target : item.name[0].toUpperCase();
    if (!sectionMap[sectionKey]) {
      sectionMap[sectionKey] = [];
    }
    sectionMap[sectionKey].push(item);
  });

  // Get and sort section titles
  const sortedSections = sort(Object.keys(sectionMap)).asc();

  // Prepare the FlashList data
  const flashListData = [];
  sortedSections.forEach((key) => {
    flashListData.push(key); // Section header
    const sortedItems = sort(sectionMap[key])[sortOrder === "asc" ? "asc" : "desc"]((item) => item.name);
    flashListData.push(...sortedItems); // Section items
  });

  return flashListData;
};
