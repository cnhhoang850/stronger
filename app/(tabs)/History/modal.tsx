import React, { useRef, useState, useLayoutEffect, useEffect, Suspense, lazy } from "react";
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
import SettingCard from "@/components/editModal/SettingCard";
import { ScaleDecorator, OpacityDecorator } from "react-native-draggable-flatlist";
import DraggableFlatList from "react-native-draggable-flatlist";
const ExerciseDataTable = lazy(() => import("@/components/editModal/ExerciseDataTable"));
import ExercideDataTableSuspense from "@/components/editModal/ExerciseDataTableSuspense";
import * as Haptics from "expo-haptics";

export default function EditModal() {
  const { id: forwardedWorkoutId } = useLocalSearchParams();
  const workoutId = useRef(forwardedWorkoutId).current;
  const { workouts } = useStore();

  let workoutData = workouts.find((workout) => workout.id === workoutId);
  const [workoutFormState, setWorkoutFormState] = useState(workoutData);
  const workoutFormData = useRef(workoutData);
  const updateWorkout = useStore((state) => state.updateWorkout);
  const [formChanged, setFormChanged] = useState(false);

  const selectedExerciseId = useRef(null);

  let scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const theme = useTheme();
  const params = useGlobalSearchParams();

  const initialState = {
    ...workoutData,
  };

  console.log(initialState);

  // receiving selections from selector
  React.useEffect(() => {
    if (params?.selectedExercises && params.selectedExercises.length > 0) {
      const selectedExercises = JSON.parse(params.selectedExercises);
      addSelectedExercise(selectedExercises);
    }
  }, [params?.selectedExercises]);

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
      const focusedInput = TextInput.State.currentlyFocusedInput();
      if (!focusedInput) {
        return;
      }
      focusedInput.measure((originX, originY, width, height, pageX, pageY) => {
        const yFromTop = pageY;
        const componentHeight = height;
        const screenHeight = Dimensions.get("window").height;
        const yFromBottom = screenHeight - yFromTop - componentHeight;
        const hiddenOffset = keyboardHeight - yFromBottom;
        const margin = 32;
        if (hiddenOffset > 0) {
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
    console.log(workoutFormState, workoutId);
    const newWorkout = { ...workoutFormData.current };
    updateWorkout(workoutId, newWorkout);
    setFormChanged(false);
  };

  const handleFormChange = (newExercise) => {
    setFormChanged(true);

    const newExercises = workoutFormData.current.exercises.map((exercise) =>
      exercise.id === newExercise.id ? newExercise : exercise,
    );

    workoutFormData.current = {
      ...workoutFormData.current,
      exercises: newExercises,
    };
    setWorkoutFormState({ ...workoutFormData.current });
  };

  const openContextMenu = (exerciseId, event, fadeOut) => {
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
          fadeOut(deleteExercise);
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

  const showSelector = () => {
    navigation.navigate("exerciseSelector");
  };

  const addSelectedExercise = async (exercises) => {
    let newExercises = [];
    for (let i = 0; i < exercises.length; i++) {
      let curr = exercises[i];
      const newExercise = {
        id: new Date().getTime().toString(),
        name: curr.name,
        sets: [],
      };

      newExercises.push(newExercise);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    const updatedExercises = [...workoutFormData.current.exercises, ...newExercises];

    workoutFormData.current = {
      ...workoutFormData.current,
      exercises: updatedExercises,
    };
    setWorkoutFormState({
      ...workoutFormData.current,
      exercises: updatedExercises,
    });
    setFormChanged(true);
  };

  const handleDragListItem = (data) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newWorkout = {
      ...workoutFormData.current,
      exercises: data,
    };
    workoutFormData.current = newWorkout;
    setWorkoutFormState(newWorkout);
    setFormChanged(true);
  };

  const dragListItemHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  const renderListFooterComponent = () => (
    <TouchableOpacity
      onPress={showSelector}
      style={{
        backgroundColor: theme.colors.surface,
        padding: 16,
        margin: 16,
        borderRadius: 8,
        alignItems: "center",
      }}
    >
      <ThemedText>+Add Exercise</ThemedText>
    </TouchableOpacity>
  );

  const renderListHeaderComponent = () => <SettingCard workout={workoutFormState} />;

  useEffect(() => {
    return () => {
      // Clean up code here, if necessary
    };
  }, []);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <Suspense fallback={<ExercideDataTableSuspense />}>
        <OpacityDecorator>
          <ScaleDecorator>
            <TouchableOpacity
              onLongPress={(event) => {
                drag(event);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
              }}
              disabled={isActive}
            >
              <ExerciseDataTable
                key={item.id}
                scrollViewRef={scrollViewRef}
                offsetRef={offsetRef}
                exercise={item}
                onFormChange={handleFormChange}
                openExerciseMenu={openContextMenu}
              />
            </TouchableOpacity>
          </ScaleDecorator>
        </OpacityDecorator>
      </Suspense>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={styles.modalContent}>
        <DraggableFlatList
          ref={scrollViewRef}
          onref={(ref) => (scrollViewRef = ref)}
          renderItem={renderItem}
          ListHeaderComponent={renderListHeaderComponent} // some error made this fail? new arch?
          ListFooterComponent={renderListFooterComponent}
          // why fadeOut is normal, not called on change here?
          keyExtractor={(item, index) => item.id} //for animated.view, remove uncessary reredner animation
          contentContainerStyle={{ paddingBottom: 200 }}
          contentInsetAdjustmentBehavior="automatic"
          data={[...workoutFormState.exercises]} // mockup to add metadata card
          onDragEnd={({ data }) => handleDragListItem(data)}
          onPlaceholderIndexChange={dragListItemHaptics}
          onScrollOffsetChange={(e) => {
            offsetRef.current.value = e;
          }}
        />
        <View style={{ flex: 1, paddingBottom: 200 }}></View>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "100%",
    paddingTop: 16,
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
  addButton: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginTop: 16,
  },
  addButtonText: {
    fontSize: 16,
    color: "#000",
  },
});
