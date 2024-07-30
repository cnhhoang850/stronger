import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Card as PaperCard,
  Button as PaperButton,
  useTheme,
} from "react-native-paper";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store/useStore";
import SettingCard from "@/components/editModal/SettingCard";
import ExerciseDataTable from "@/components/editModal/ExerciseDataTable";
import useStateSync from "@/hooks/useStateSync";

export default function EditModal() {
  const { id: workoutId } = useLocalSearchParams();
  const { workouts } = useStore();
  const workoutData = workouts.find((workout) => workout.id === workoutId);
  const updateWorkout = useStore((state) => state.updateWorkout);

  const [workoutFormData, setWorkoutFormData] = useState(workoutData);
  const workoutFormSubmitData = useRef(null);
  const [formChanged, setFormChanged] = useState(false);

  const scrollViewRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const navigation = useNavigation();
  const theme = useTheme();

  // Update navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PaperButton
          mode="contained"
          onPress={() => handleSave()}
          style={{
            backgroundColor: formChanged
              ? theme.colors.success
              : theme.colors.inverseOnSurface,
            height: 36,
            marginTop: 4,
          }}
        >
          <ThemedText
            type="default"
            style={{
              color: theme.colors.onPrimary,
              fontSize: 16,
              lineHeight: 16,
            }}
          >
            Save
          </ThemedText>
        </PaperButton>
      ),
    });
  }, [navigation, formChanged]);

  const handleSave = () => {
    const newWorkout = { ...workoutFormSubmitData.current };
    console.log(newWorkout.exercises[0].sets.length, "TO SAVE");

    updateWorkout(workoutId, newWorkout);
    // local state of form first before save
  };

  const handleFormChange = (newExercise) => {
    setFormChanged(true);
    const newExercises = workoutFormData.exercises.map((exercise) => {
      if (exercise.id === newExercise.id && exercise.name === newExercise.name) {
        return newExercise;
      }
      return exercise;
    });
    workoutFormSubmitData.current = {
      ...workoutFormData,
      exercises: newExercises,
    };
    setWorkoutFormData((workoutFormData) => {
      console.log(
        workoutFormData.exercises[0].sets.length,
        newExercises[0].sets.length,
        " NEW AFTER SAVE",
        newExercise.sets.length,
        "NEW IN TABLE",
      );
      const newWorkout = { ...workoutFormData, exercises: newExercises };
      return newWorkout;
    });
  };

  return (
    <ThemedView>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        enableResetScrollToCoords={false}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        keyboardShouldPersistTaps="handled"
        onScrollEndDrag={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        onMomentumScrollEnd={(event) =>
          setScrollY(event.nativeEvent.contentOffset.y)
        }
        extraScrollHeight={50}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ThemedView style={styles.modalContent}>
            <SettingCard workout={workoutData} onFormChange={handleFormChange} />

            {workoutFormData.exercises.length > 0 &&
              workoutFormData.exercises.map((exercise, index) => (
                <View key={index}>
                  <View style={{ paddingLeft: 12, paddingBottom: 4 }}>
                    <ThemedText
                      style={{ opacity: 0.7, fontSize: 14 }}
                      type="default"
                    >
                      {exercise.name.toUpperCase()}
                    </ThemedText>
                  </View>

                  <PaperCard mode="contained" style={styles.cardContainer}>
                    <ExerciseDataTable
                      scrollY={scrollY}
                      scrollViewRef={scrollViewRef}
                      exercise={exercise}
                      onFormChange={handleFormChange}
                    />
                  </PaperCard>
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
});
