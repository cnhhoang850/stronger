import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card as PaperCard, Button as PaperButton, useTheme } from "react-native-paper";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store/useStore";
import SettingCard from "@/components/editModal/SettingCard";
import ExerciseDataTable from "@/components/editModal/ExerciseDataTableExperiment";

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
    // this changes inside the same function so no re render => async
    const newWorkout = { ...workoutFormSubmitData.current };
    console.log(newWorkout.exercises[0].sets.length, "TO SAVE");
    updateWorkout(workoutId, newWorkout);
    setFormChanged(false);
  };

  const handleFormChange = (newExercise) => {
    // this re renders so handle change in exercise table use state is sync?
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
        onMomentumScrollEnd={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        extraScrollHeight={50}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ThemedView style={styles.modalContent}>
            <SettingCard workout={workoutData} onFormChange={handleFormChange} />

            {workoutFormData.exercises.length > 0 &&
              workoutFormData.exercises.map((exercise, index) => (
                <View key={index}>
                  <View style={{ paddingLeft: 12, paddingBottom: 4 }}>
                    <ThemedText style={{ opacity: 0.7, fontSize: 14 }} type="default">
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
