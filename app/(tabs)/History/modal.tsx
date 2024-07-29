import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card as PaperCard, Button as PaperButton, useTheme } from "react-native-paper";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store/useStore";
import SettingCard from "@/components/editModal/SettingCard";
import ExerciseDataTable from "@/components/editModal/ExerciseDataTable";

export default function EditModal() {
  const { id } = useLocalSearchParams();
  const workoutData = useStore((state) => state.getWorkout(id));
  const [workout, setWorkout] = useState(workoutData);
  const scrollViewRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [formChanged, setFormChanged] = useState(false);
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
            backgroundColor: formChanged ? theme.colors.success : theme.colors.inverseOnSurface,
          }}
        >
          <ThemedText>Save</ThemedText>
        </PaperButton>
      ),
    });
  }, [navigation, formChanged]);

  const handleSave = () => {
    // Save logic here
  };

  const handleFormChange = () => {
    setFormChanged(true);
  };

  return (
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
          <SettingCard workout={workout} onFormChange={handleFormChange} />

          {workout.exercises.map((exercise, index) => (
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
