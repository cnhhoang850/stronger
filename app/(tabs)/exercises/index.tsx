import React, { useLayoutEffect, useState } from "react";
import useStore from "@/store/useStore";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "expo-router";
import { useTheme } from "react-native-paper";
import ExerciseImages from "@/assets/exercises/images";
import ExerciseListItem from "@/components/ExerciseListItem";
import { FlashList } from "@shopify/flash-list";
import { sort } from "fast-sort";
import * as Haptics from "expo-haptics";
import { SFSymbol } from "@/components/SFSymbols";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

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
      headerRight: () => (
        <ThemedText
          style={{
            paddingRight: 6,
          }}
          type="system"
          onPress={() => {
            navigation.navigate("modal");
          }}
        >
          <SFSymbol name="plus" size={24} style={{ width: 32, height: 32 }} />
        </ThemedText>
      ),
      headerLeft: () => (
        <ThemedText type="system" onPress={() => {}}>
          Edit
        </ThemedText>
      ),
    });
  }, [navigation]);

  const FlatlistItemSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: "100%",
          marginVertical: 3,
        }}
      />
    );
  };

  const flashListRender = ({ item }) => {
    if (typeof item === "string") {
      return (
        <ThemedText
          style={{
            opacity: 0.7,
            fontSize: 24,
            paddingLeft: 12,
            marginBottom: -2,
            marginTop: 16,
          }}
          type="default"
        >
          {item}
        </ThemedText>
      );
    }

    if (item.name === "segmented") {
      return <SegmentedControl values={["One", "Two"]} />;
    }

    const source = `img${item.id}` as keyof typeof ExerciseImages;
    return <ExerciseListItem image={ExerciseImages[source]} exercise={item} />;
  };

  const handleViewableItemsChanged = ({ viewableItems }) => {
    viewableItems.forEach((viewableItem) => {
      if (viewableItem.isViewable && typeof viewableItem.item === "string") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      }
    });
  };

  return (
    <SafeAreaView>
      <ThemedView style={{ backgroundColor: theme.colors.background, height: "100%" }}>
        <FlashList
          contentInsetAdjustmentBehavior="automatic"
          data={exercisesState}
          renderItem={flashListRender}
          estimatedItemSize={76}
          ItemSeparatorComponent={FlatlistItemSeparator}
          getItemType={(item) => {
            return typeof item === "string" ? "sectionHeader" : "row";
          }}
          contentContainerStyle={styles.sectionListContainer}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
        />
      </ThemedView>
    </SafeAreaView>
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

const preprocessDataFlashList = (data, searchVal, filterBy, sortOrder) => {
  // Filter data based on the search value
  const searchWords = searchVal.toLowerCase().split(" ");
  const filteredData = data.filter((item) =>
    searchWords.every((word) => item.name.toLowerCase().includes(word)),
  );

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
  const sortedSections = Object.keys(sectionMap).sort();

  // Prepare the FlashList data
  const flashListData = [];
  sortedSections.forEach((key) => {
    flashListData.push(key); // Section header
    const sortedItems = sectionMap[key].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    flashListData.push(...sortedItems); // Section items
  });

  return flashListData;
};
