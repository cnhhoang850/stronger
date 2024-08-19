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
} from "react-native";
import { Button as PaperButton, useTheme } from "react-native-paper";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store/useStore";
import SettingCard from "@/components/editModal/SettingCard";
import { ScaleDecorator, OpacityDecorator } from "react-native-draggable-flatlist";
import DraggableFlatList from "react-native-draggable-flatlist";
const ExerciseDataTable = lazy(() => import("@/components/editModal/ExerciseDataTable"));
import ExercideDataTableSuspense from "@/components/editModal/ExerciseDataTableSuspense";
import * as Haptics from "expo-haptics";
import LinkButton from "@/components/LinkButton";

export default function EditModal() {
  return (
    <ThemedView style={styles.modalContent}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <DraggableFlatList
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id} //for animated.view
          ListFooterComponent={() => (
            <TouchableOpacity
              onPress={handleAddExercise}
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
          )}
          contentContainerStyle={{ paddingBottom: 200 }}
          ref={scrollViewRef}
          onref={(ref) => (scrollViewRef = ref)}
          contentInsetAdjustmentBehavior="automatic"
          data={[...workoutFormState.exercises]} // mockup to add metadata card
          onDragEnd={({ data }) => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            const newWorkout = {
              ...workoutFormData.current,
              exercises: data,
            };
            workoutFormData.current = newWorkout;
            setWorkoutFormState(newWorkout);
            setFormChanged(true);
          }}
          onPlaceholderIndexChange={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
          }}
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
