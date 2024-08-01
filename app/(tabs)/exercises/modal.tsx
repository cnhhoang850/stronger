import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Pressable,
  Modal,
  Animated,
  ActionSheetIOS,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card as PaperCard, Button as PaperButton, useTheme } from "react-native-paper";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store/useStore";
import SettingCard from "@/components/editModal/SettingCard";
import ExerciseDataTable from "@/components/editModal/ExerciseDataTableExperiment";
import { MaterialIcons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function EditModal() {
  const { id: workoutId } = useLocalSearchParams();
  const { workouts } = useStore();
  const workoutData = workouts.find((workout) => workout.id === workoutId);
  const updateWorkout = useStore((state) => state.updateWorkout);

  const [workoutFormState, setWorkoutFormState] = useState(workoutData);
  const workoutFormData = useRef(workoutData);
  const [formChanged, setFormChanged] = useState(false);

  const selectedExerciseId = useRef(null);

  const scrollViewRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const navigation = useNavigation();
  const theme = useTheme();

  const { showActionSheetWithOptions } = useActionSheet();

  // Update navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPressIn={() => handleSave()}
          style={{
            justifyContent: "center",
            height: 50,
            alignItems: "center",
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <PaperButton
            mode="contained"
            style={{
              backgroundColor: formChanged ? theme.colors.success : theme.colors.inverseOnSurface,
              height: 38,
              marginBottom: 4,
            }}
          >
            <ThemedText
              type="default"
              style={{
                color: theme.colors.onPrimary,
                fontSize: 16,
                lineHeight: 17,
              }}
            >
              Save
            </ThemedText>
          </PaperButton>
        </Pressable>
      ),
    });
  }, [navigation, formChanged]);

  const handleSave = () => {
    const newWorkout = { ...workoutFormData.current };
    updateWorkout(workoutId, newWorkout);
    setFormChanged(false);
  };

  const handleFormChange = (newExercise) => {
    setFormChanged(true);

    const newExercises = workoutFormData.current.exercises
      .map((exercise) => (exercise.id === newExercise.id ? newExercise : exercise))
      .filter((exercise) => exercise.sets.length > 0);

    workoutFormData.current = {
      ...workoutFormData.current,
      exercises: newExercises,
    };
    setWorkoutFormState({ ...workoutFormData.current });
  };

  const openMenu = (exerciseId, event) => {
    selectedExerciseId.current = exerciseId;
    const selectedExercise = workoutFormState.exercises.find((exercise) => exercise.id === exerciseId);
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Delete", "Rename", "Remove all sets", "Cancel"],
        title: "Edit " + selectedExercise.name,
        destructiveButtonIndex: 0,
        cancelButtonIndex: 3,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          deleteExercise();
        } else if (buttonIndex === 1) {
        }
      },
    );
    //setMenuPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
    //setMenuVisible(true);
  };

  const deleteExercise = () => {
    const newExercises = workoutFormData.current.exercises.filter(
      (exercise) => exercise.id !== selectedExerciseId.current,
    );
    workoutFormData.current = {
      ...workoutFormData.current,
      exercises: newExercises,
    };
    const newWorkout = { ...workoutFormState, exercises: newExercises };
    setWorkoutFormState(newWorkout);
    setFormChanged(true);
    //setMenuVisible(false);
  };

  return (
    <ThemedView>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        enableResetScrollToCoords={false}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        keyboardShouldPersistTaps="handled"
        onScrollEndDrag={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        onMomentumScrollEnd={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        extraScrollHeight={50}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ThemedView style={styles.modalContent}>
            <SettingCard workout={workoutData} onFormChange={handleFormChange} />

            {workoutFormState.exercises.length > 0 &&
              workoutFormState.exercises.map((exercise, index) => (
                <View key={index}>
                  <View style={{ paddingLeft: 12, paddingBottom: 4 }}>
                    <ThemedText style={{ opacity: 0.7, fontSize: 14 }} type="default">
                      {exercise.name.toUpperCase()}
                    </ThemedText>
                    <TouchableOpacity
                      style={{ position: "absolute", right: 0, paddingRight: 12 }}
                      onPressIn={(event) => openMenu(exercise.id, event)}
                    >
                      <ThemedText style={{ fontWeight: 800, fontSize: 40, opacity: 0.3 }}>. . .</ThemedText>
                    </TouchableOpacity>
                  </View>

                  <Animated.View>
                    <PaperCard mode="contained" style={styles.cardContainer}>
                      <ExerciseDataTable
                        scrollY={scrollY}
                        scrollViewRef={scrollViewRef}
                        exercise={exercise}
                        onFormChange={handleFormChange}
                      />
                    </PaperCard>
                  </Animated.View>
                </View>
              ))}

            <View style={{ flex: 1, paddingBottom: 200 }}></View>
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 16,
    height: "100%",
  },
  cardContainer: {
    padding: 2,
    paddingRight: 0,
    paddingLeft: 12,
    marginBottom: 26,
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
