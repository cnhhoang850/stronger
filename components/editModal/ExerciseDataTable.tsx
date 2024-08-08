import React, { useState, useRef, memo, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
  LayoutAnimation,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Card as PaperCard } from "react-native-paper";
import * as Haptics from "expo-haptics";

const ExerciseDataTable = ({ exercise, scrollViewRef, onFormChange, openExerciseMenu, offsetRef }) => {
  const [sets, setSets] = useState(exercise.sets);
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedSetIndex, setSelectedSetIndex] = useState(null);
  const menuScale = useRef(new Animated.Value(0)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  useLayoutEffect(() => {
    fadeIn();
  }, []);
  useEffect(() => {
    return () => {
      // Clean up animations if the component unmounts
      fadeAnim.stopAnimation();
      menuScale.stopAnimation();
    };
  }, [fadeAnim, menuScale]);

  useEffect(() => {
    if (menuVisible) {
      Animated.spring(menuScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(menuScale, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [menuVisible, menuScale]);

  const handleInputChange = (index, field, value) => {
    setSets((prevSets) => {
      const newSets = [...prevSets];
      const cleanedValue = value.replace(/[^0-9.]/g, ""); // Remove all non-numeric characters
      const parsedValue = parseFloat(cleanedValue);
      newSets[index][field] = !isNaN(parsedValue) ? parsedValue : "";
      return newSets;
    });

    const updatedExercise = { ...exercise, sets };
    onFormChange(updatedExercise);
  };

  const handleFocus = (index) => {
    setFocusedInputIndex(index);
  };

  const handleBlur = () => {
    setFocusedInputIndex(null);
  };

  const addSet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newSet = { weight: 0, reps: 0 };
    const newSets = [...sets, newSet];
    setSets(newSets);
    scrollViewRef.current.scrollToOffset({
      offset: offsetRef.current.value + 50,
      animated: true,
    });

    const updatedExercise = { ...exercise, sets: newSets };
    onFormChange(updatedExercise);
  };

  const openSetMenu = (index, event) => {
    setMenuPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
    setSelectedSetIndex(index);
    setMenuVisible(true);
  };

  const deleteSet = () => {
    const newSets = sets.filter((_, i) => i !== selectedSetIndex);
    setSets(newSets);
    const updatedExercise = { ...exercise, sets: newSets };
    onFormChange(updatedExercise);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setMenuVisible(false);
  };

  const fadeOut = (cb) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(cb);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={{ marginLeft: 16, marginRight: 16 }}>
        <View style={{ paddingLeft: 12, paddingBottom: 4 }}>
          <ThemedText style={{ opacity: 0.7, fontSize: 14 }} type="default">
            {exercise.name.toUpperCase()}
          </ThemedText>
          <TouchableOpacity
            style={{ position: "absolute", right: 0, paddingRight: 12 }}
            onPressIn={(event) => openExerciseMenu(exercise.id, event, fadeOut)}
          >
            <ThemedText style={{ fontWeight: 800, fontSize: 40, opacity: 0.3 }}>. . .</ThemedText>
          </TouchableOpacity>
        </View>

        <PaperCard mode="contained" style={styles.cardContainer}>
          <View style={styles.columnContainer}>
            <View style={styles.entryColumn}>
              <ThemedText style={styles.headerText} type="menu">
                Weight
              </ThemedText>
              {sets.map((set, index) => (
                <View style={styles.inputRow} key={index}>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInputIndex === index && styles.focusedInput,
                      {
                        backgroundColor: theme.colors.background,
                        color: theme.colors.onSurface,
                        borderColor: focusedInputIndex === index ? theme.colors.primary : "transparent",
                      },
                    ]}
                    value={set.weight.toString()}
                    onChangeText={(text) => handleInputChange(index, "weight", text)}
                    keyboardType="numeric"
                    selectTextOnFocus={true}
                    maxLength={3}
                    textAlign="center"
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                  />
                  <ThemedText style={styles.inputUnit}>kg</ThemedText>
                </View>
              ))}
            </View>

            <View style={styles.entryColumn}>
              <ThemedText style={styles.headerText} type="menu">
                Reps
              </ThemedText>
              {sets.map((set, index) => (
                <View style={styles.inputRow} key={index}>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInputIndex === index && styles.focusedInput,
                      {
                        backgroundColor: theme.colors.background,
                        color: theme.colors.onSurface,
                        borderColor: focusedInputIndex === index ? theme.colors.primary : "transparent",
                      },
                    ]}
                    value={set.reps.toString()}
                    onChangeText={(text) => handleInputChange(index, "reps", text)}
                    keyboardType="numeric"
                    selectTextOnFocus={true}
                    maxLength={3}
                    textAlign="center"
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                  />
                </View>
              ))}
            </View>

            <View style={styles.entryColumn}>
              <ThemedText style={styles.headerText} type="menu">
                Volume
              </ThemedText>
              {sets.map((set, index) => (
                <View style={styles.inputRow} key={index}>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.colors.surfaceVariant,
                        color: theme.colors.onSurface,
                        borderWidth: 0,
                      },
                    ]}
                    value={(set.reps * set.weight).toString()}
                    editable={false}
                    textAlign="center"
                    maxLength={3}
                  />
                  <ThemedText>kg</ThemedText>
                </View>
              ))}
            </View>

            <View style={styles.entryColumn}>
              <ThemedText style={styles.headerText} type="menu">
                Calories
              </ThemedText>
              {sets.map((set, index) => (
                <View style={styles.inputRow} key={index}>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.colors.background,
                        color: theme.colors.onSurface,
                        borderWidth: 0,
                      },
                    ]}
                    value={(set.reps * set.weight).toString()}
                    editable={false}
                  />
                  <ThemedText>kcal</ThemedText>
                </View>
              ))}
            </View>

            <View style={styles.entryColumn}>
              <ThemedText style={styles.headerText} type="menu" />
              {sets.map((_, index) => (
                <View style={[styles.inputRow, { padding: 0, marginLeft: -20 }]} key={index}>
                  <TouchableOpacity style={{ height: 28 }} onPressIn={(event) => openSetMenu(index, event)}>
                    <MaterialIcons name="more-vert" size={24} color={theme.colors.onSurface} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View style={{ marginTop: 12, height: 50 }}>
            <TouchableOpacity
              onPress={addSet}
              style={{
                justifyContent: "center",
                height: 50,
                alignItems: "center",
                paddingBottom: 12,
              }}
              hitSlop={{ top: 24, bottom: 10, left: 10, right: 10 }}
            >
              <ThemedText style={{ color: "#007AFF", fontSize: 20 }}>+ Add Set</ThemedText>
            </TouchableOpacity>
          </View>

          {menuVisible && (
            <Modal
              transparent={true}
              animationType="none"
              visible={menuVisible}
              onRequestClose={() => setMenuVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalBackground}
                activeOpacity={1}
                onPressOut={() => setMenuVisible(false)}
              >
                <Animated.View
                  style={[
                    styles.menuContainer,
                    {
                      top: menuPosition.y,
                      left: menuPosition.x - 100, // Adjust left position for top-right anchor
                      transform: [
                        {
                          translateX: menuScale.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0], // Adjust this value based on your desired effect
                          }),
                        },
                        {
                          translateY: menuScale.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-10, 0], // Adjust this value based on your desired effect
                          }),
                        },
                        { scale: menuScale },
                      ],
                      opacity: menuScale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                      backgroundColor: theme.colors.surface,
                    },
                  ]}
                >
                  <TouchableOpacity onPress={deleteSet} style={styles.menuItem}>
                    <ThemedText>Delete</ThemedText>
                  </TouchableOpacity>
                </Animated.View>
              </TouchableOpacity>
            </Modal>
          )}
        </PaperCard>
      </View>
    </Animated.View>
  );
};

export default memo(ExerciseDataTable);

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    paddingLeft: 0,
    margin: 0,
  },
  cardContainer: {
    padding: 2,
    paddingRight: 0,
    paddingLeft: 12,
    marginBottom: 26,
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
