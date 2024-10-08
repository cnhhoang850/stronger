import React, { useRef, useState, useLayoutEffect, useEffect, Suspense, lazy, useReducer } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import { Button as PaperButton, useTheme } from "react-native-paper";
import { useNavigation, useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store/useStore";
import { Card as PaperCard } from "react-native-paper";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ContextMenuView, ContextMenuButton } from "react-native-ios-context-menu";
import ContextMenuItem from "@/components/ContextMenuItem";
import { muscleGroupsArray } from "@/store/bodyMapDict";
import bodyMapDict from "@/store/bodyMapDict";
import equipments from "@/store/equipments";
import ChipMenuItem from "@/components/ChipMenuItem";
import Body from "react-native-body-highlighter";
import { TouchableOpacity } from "react-native";

export default function EditModal() {
  const theme = useTheme();
  const navigation = useNavigation();

  // Update navigation header
  const offsetRef = useRef({ value: 0 });
  // useEffect(() => {
  //   const listener = Keyboard.addListener("keyboardDidShow", (e) => {
  //     const keyboardHeight = e.endCoordinates.height;
  //     const focusedInput = TextInput.State.currentlyFocusedInput();
  //     if (!focusedInput) {
  //       return;
  //     }
  //     focusedInput.measure((originX, originY, width, height, pageX, pageY) => {
  //       const yFromTop = pageY;
  //       const componentHeight = height;
  //       const screenHeight = Dimensions.get("window").height;
  //       const yFromBottom = screenHeight - yFromTop - componentHeight;
  //       const hiddenOffset = keyboardHeight - yFromBottom;
  //       const margin = 32;
  //       if (hiddenOffset > 0) {
  //         scrollViewRef.current.scrollToOffset({
  //           animated: true,
  //           offset: offsetRef.current.value + hiddenOffset + margin,
  //         });
  //       }
  //     });
  //   });
  //   return () => listener.remove();
  // }, []);

  useEffect(() => {
    return () => {
      // Clean up code here, if necessary
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ThemedText
          style={{
            paddingRight: 6,
          }}
          type="system"
          onPress={() => {
            console.log("pressed");
          }}
        >
          Add
        </ThemedText>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ThemedText type="system">Cancel</ThemedText>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const formReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "SET_MAIN":
        let { group, flag } = bodyMapDict[action.value];

        let target = {
          slug: group,
          intensity: 2,
        };

        return {
          ...state,
          [action.field]: action.value,
          primary: target,
        };

      case "SET_SECONDARY":
        let frontMuscles = action.value.front.map((muscle) => {
          let { group } = bodyMapDict[muscle];
          if (state.primary.group === group) {
            console.log(state.primary.group, group);
            return;
          }
          return { slug: group, intensity: 1 };
        });

        let backMuscles = action.value.back.map((muscle) => {
          let { group } = bodyMapDict[muscle];
          if (state.primary.group === group) {
            return;
          }
          return { slug: group, intensity: 1 };
        });

        return {
          ...state,
          [action.field]: action.value,
          frontMuscles: frontMuscles,
          backMuscles: backMuscles,
        };
      default:
        return state;
    }
  };

  const initialState = {
    name: "",
    equipment: "None",
    target: "None",
    primary: {},
    secondary: {
      front: [],
      back: [],
      side: [],
    },
    frontMuscles: [],
    backMuscles: [],
    sideMuscles: [],
    instructions: "",
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = (field, value) => {
    dispatch({
      type: "SET_FIELD",
      field,
      value,
    });
    return;
  };

  const handleMainChange = (field, value) => {
    dispatch({
      type: "SET_MAIN",
      field,
      value,
    });
    return;
  };

  const handleCheckBoxChange = (field, value) => {
    dispatch({
      type: "SET_SECONDARY",
      field,
      value,
    });
    return;
  };

  const equipmentMenuItems = Object.keys(equipments).map((equipment, index) => ({
    actionKey: `key-${index + 1}`,
    actionTitle: equipment.charAt(0).toUpperCase() + equipment.slice(1),
  }));

  const muscleMenuSections = createMuscleMenuSections(bodyMapDict);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedScrollView
        style={{
          ...styles.modalContent,
          backgroundColor: theme.colors.elevation.level1,
        }}
      >
        <PaperCard
          mode="contained"
          style={{
            ...styles.cardContainer,
            backgroundColor: theme.colors.elevation.onLevel1,
          }}
        >
          <View
            style={{
              ...styles.cardRow,
              borderBottomWidth: 0,
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                color: theme.colors.onBackground,
              }}
              onChangeText={(text) => handleInputChange("name", text)}
              value={formState.name}
              placeholder="Name"
            />
          </View>
        </PaperCard>

        <View
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-around",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Body
            data={formState.frontMuscles
              .filter((m) => m.slug !== formState.primary.slug)
              .concat(formState.primary)}
            gender="male"
            side="front"
            scale={0.7}
            colors={["#0984e3", theme.colors.primary]}
          />
          <Body
            data={formState.backMuscles
              .filter((m) => m.slug !== formState.primary.slug)
              .concat(formState.primary)}
            gender="male"
            side="back"
            scale={0.7}
            colors={["#0984e3", theme.colors.primary]}
          />
        </View>

        <ContextMenuItem
          rowIndex="topRow"
          title="Equipment"
          value={formState.equipment}
          field="equipment"
          handleInput={handleInputChange}
          menuItems={equipmentMenuItems}
        />
        <ContextMenuItem
          rowIndex="middleRow"
          title="Target muscle"
          value={formState.target}
          field="target"
          handleInput={handleMainChange}
          menuItems={muscleMenuSections}
        />

        <ChipMenuItem
          rowIndex="bottomRow"
          title="Secondary muscle(s)"
          chipItems={muscleGroupsArray}
          value={formState.secondary}
          field="secondary"
          handleInput={handleCheckBoxChange}
        />

        <PaperCard mode="contained" style={styles.cardContainer}>
          <View
            style={{
              ...styles.cardRow,
            }}
          >
            <ThemedText type="default">Instructions</ThemedText>
          </View>

          <View
            style={{
              borderBottomWidth: 0,
              height: 250,
              padding: 0,
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                color: theme.colors.onBackground,
              }}
              multiline={true}
              value={formState.instructions}
              onChangeText={(text) => handleInputChange("instructions", text)}
            />
          </View>
        </PaperCard>
      </ThemedScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
  },
  modalContent: {
    height: "100%",
  },
  cardContainer: {
    padding: 2,
    paddingRight: 0,
    paddingLeft: 16,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  cardRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 44,
    lineHeight: 16,
    padding: 8,
    paddingLeft: 0,
    margin: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "rgba(84, 84, 88, 0.65)",
    alignContent: "center",
  },
});

const createMuscleMenuSections = (bodyMapDict) => {
  const sections = {
    front: [],
    back: [],
    both: [],
  };

  Object.keys(bodyMapDict).forEach((muscle, index) => {
    const muscleData = bodyMapDict[muscle];
    const { flag } = muscleData;

    sections[flag].push({
      actionKey: `key-${index + 1}`,
      actionTitle: muscle, // Use the muscle name (property key) as the actionTitle
    });
  });

  // Convert the sections object to an array of sections with menuTitle and menuItems
  return Object.keys(sections)
    .map((key) => ({
      menuTitle: key.charAt(0).toUpperCase() + key.slice(1),
      menuItems: sections[key],
    }))
    .filter((section) => section.menuItems.length > 0); // Filter out empty sections
};
