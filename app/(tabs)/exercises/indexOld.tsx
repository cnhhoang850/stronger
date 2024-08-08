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

  const renderItem = ({ item }) => {
    const source = `img${item.id}` as keyof typeof ExerciseImages;
    return <ExerciseListItem title={item.name} image={ExerciseImages[source]} description={item.target} />;
  };

  const stickyHeaderIndices = exercisesState
    .map((item, index) => {
      if (typeof item === "string") {
        return index;
      } else {
        return null;
      }
    })
    .filter((item) => item !== null) as number[];

  const flashListRender = () => {
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

  return (
    <ThemedView style={{ backgroundColor: theme.colors.background, height: "100%" }}>
      <SectionList
        contentInsetAdjustmentBehavior="automatic"
        sections={exercisesState}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
        renderSectionHeader={({ section: { title } }) => <ThemedText>{title}</ThemedText>}
        stickySectionHeadersEnabled={true}
        ItemSeparatorComponent={FlatlistItemSeparator}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  sectionListContainer: {},
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

const preprocessData = (data, searchVal, filterBy, sortOrder) => {
  let filteredData = data.filter((item) => item.name.toLowerCase().includes(searchVal.toLowerCase()));

  if (filterBy === "muscle") {
    filteredData = filteredData.reduce((acc, item) => {
      const section = acc.find((s) => s.title === item.target);
      if (section) {
        section.data.push(item);
      } else {
        acc.push({ title: item.target, data: [item] });
      }
      return acc;
    }, []);
  } else {
    filteredData = filteredData.reduce((acc, item) => {
      const section = acc.find((s) => s.title === item.name[0]);
      if (section) {
        section.data.push(item);
      } else {
        acc.push({ title: item.name[0], data: [item] });
      }
      return acc;
    }, []);
  }

  filteredData.forEach((section) => {
    section.data.sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  });

  return filteredData;
};

const preprocessDataFast = (data, searchVal, filterBy, sortOrder) => {
  // Filter data based on the search value
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchVal.toLowerCase()));

  // Use an object to map sections by key
  const sectionMap = {};

  filteredData.forEach((item) => {
    const sectionKey = filterBy === "muscle" ? item.target : item.name[0];
    if (!sectionMap[sectionKey]) {
      sectionMap[sectionKey] = [];
    }
    sectionMap[sectionKey].push(item);
  });

  // Get and sort section titles
  const sortedSections = sort(Object.keys(sectionMap)).asc((key) => (sortOrder === "asc" ? key : -key));

  // Map sorted section titles to their corresponding data
  return sortedSections.map((key) => ({
    title: key,
    data: sort(sectionMap[key])[sortOrder === "asc" ? "asc" : "desc"]((item) => item.name),
  }));
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
