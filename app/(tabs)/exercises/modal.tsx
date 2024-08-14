import React, { useRef, useState, useLayoutEffect, useEffect, Suspense, lazy, useReducer } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Pressable,
  ActionSheetIOS,
  TextInput,
  Dimensions,
  Modal,
} from "react-native";
import { Button as PaperButton, useTheme } from "react-native-paper";
import { useNavigation, useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store/useStore";

import { Card as PaperCard } from "react-native-paper";
import { ThemedScrollView } from "@/components/ThemedScrollView";

export default function EditModal() {
  const theme = useTheme();

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

  const [val, setVa] = useState("");

  const formReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return {
          ...state,
          [action.field]: action.value,
        };
      default:
        return state;
    }
  };

  const initialState = {
    name: "",
    equipment: "",
    target: "",
    secondary: "",
    instructions: "",
  };
  // should use reducer here as an object can better modify multiple sections

  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = (field, value) => {
    dispatch({
      type: "SET_FIELD",
      field,
      value,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedScrollView style={{ ...styles.modalContent, backgroundColor: theme.colors.elevation.level1 }}>
        <PaperCard mode="contained" style={styles.cardContainer}>
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

        <PaperCard mode="contained" style={styles.cardContainer}>
          <View
            style={{
              ...styles.cardRow,
            }}
          >
            <TextInput style={{ ...styles.input, color: theme.colors.onBackground }} value={"Equipment"} />
          </View>
          <View
            style={{
              ...styles.cardRow,
            }}
          >
            <TextInput
              style={{ ...styles.input, color: theme.colors.onBackground }}
              value={"Target muscle"}
            />
          </View>

          <View
            style={{
              ...styles.cardRow,
              borderBottomWidth: 0,
            }}
          >
            <TextInput
              style={{ ...styles.input, color: theme.colors.onBackground }}
              value={"Secondary muscle(s)"}
            />
          </View>
        </PaperCard>

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
              ...styles.cardRow,
              borderBottomWidth: 0,
              height: 250,
              overflow: "scroll",
            }}
          >
            <TextInput
              style={{ ...styles.input, color: theme.colors.onBackground, height: 250, overflow: "scroll" }}
              value={"Secondary muscle(s)"}
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
    marginBottom: 26,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    backgroundColor: "rgb(46,46,47)",
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
