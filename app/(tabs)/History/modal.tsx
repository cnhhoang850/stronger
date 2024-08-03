import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
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
  TextInput,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card as PaperCard, Button as PaperButton, useTheme } from "react-native-paper";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store/useStore";
import SettingCard from "@/components/editModal/SettingCard";
import ExerciseDataTable from "@/components/editModal/ExerciseDataTableExperiment";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import DraggableFlatList from "react-native-draggable-flatlist";

export default function EditModal() {
  const { id: workoutId } = useLocalSearchParams();
  const { workouts } = useStore();
  let workoutData = workouts.find((workout) => workout.id === workoutId);
  const updateWorkout = useStore((state) => state.updateWorkout);

  const [workoutFormState, setWorkoutFormState] = useState(workoutData);
  const workoutFormData = useRef(workoutData);
  const [formChanged, setFormChanged] = useState(false);

  const selectedExerciseId = useRef(null);

  let scrollViewRef = useRef(null);
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

  const offsetRef = useRef({ value: 0 });

  useEffect(() => {
    const listener = Keyboard.addListener("keyboardDidShow", (e) => {
      const keyboardHeight = e.endCoordinates.height;
      TextInput.State.currentlyFocusedInput().measure((originX, originY, width, height, pageX, pageY) => {
        const yFromTop = pageY;
        const componentHeight = height;
        const screenHeight = Dimensions.get("window").height;
        const yFromBottom = screenHeight - yFromTop - componentHeight;
        const hiddenOffset = keyboardHeight - yFromBottom;
        const margin = 32;
        if (hiddenOffset > 0) {
          console.log(offsetRef.current.value, hiddenOffset);
          scrollViewRef.current.scrollToOffset({
            animated: true,
            offset: offsetRef.current.value + hiddenOffset + margin,
          });
        }
      });
    });
    return () => listener.remove();
  }, []);

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

  const renderItem = ({ item, drag, isActive, getIndex }) => {
    if (item.name === "metadata") {
      return <SettingCard workout={workoutFormState} />;
    }
    return (
      <ScaleDecorator>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <ExerciseDataTable
            key={item.id}
            index={getIndex()}
            scrollY={scrollY}
            scrollViewRef={scrollViewRef}
            offsetRef={offsetRef}
            exercise={item}
            onFormChange={handleFormChange}
            openExerciseMenu={openMenu}
            end={workoutData.exercises.length}
            inDrag={isActive}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <ThemedView style={styles.modalContent}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <DraggableFlatList
          contentContainerStyle={{ paddingBottom: 200 }}
          ref={scrollViewRef}
          onref={(ref) => (scrollViewRef = ref)}
          contentInsetAdjustmentBehavior="automatic"
          //  ListHeaderComponent={<SettingCard workout={workoutData} />}
          data={[{ name: "metadata" }, ...workoutFormState.exercises]} // mockup to add metadata card
          onDragEnd={({ data }) => {
            let filterData = data.filter((item) => item.name !== "metadata");
            const newWorkout = { ...workoutFormData.current, exercises: filterData };
            workoutFormData.current = newWorkout;
            setWorkoutFormState(newWorkout);
            setFormChanged(true);
          }}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          onScrollOffsetChange={(e) => {
            offsetRef.current.value = e;
          }}
        />
      </TouchableWithoutFeedback>

      <View style={{ flex: 1, paddingBottom: 200 }}></View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  modalContent: {
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
