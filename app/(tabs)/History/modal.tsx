import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Card as PaperCard, Button as PaperButton } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store/useStore";
import { useLocalSearchParams } from "expo-router";
import SettingCard from "@/components/editModal/SettingCard";
import ExerciseDataTable from "@/components/editModal/ExerciseDataTable";

export default function EditModal() {
  const { id } = useLocalSearchParams();
  const workout = useStore((state) => state.getWorkout(id));
  const editWorkout = useStore((state) => state.updateWorkout);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={styles.modalContent}>
        <SettingCard workout={workout} />

        {workout.exercises.map((exercise, index) => (
          <View key={index}>
            <View style={{ paddingLeft: 12, paddingBottom: 4 }}>
              <ThemedText style={{ opacity: 0.7, fontSize: 14 }} type="default">
                {exercise.name.toUpperCase()}
              </ThemedText>
            </View>

            <PaperCard mode="contained" style={styles.cardContainer}>
              <ExerciseDataTable exercise={exercise} />
            </PaperCard>
          </View>
        ))}
      </ThemedView>
    </TouchableWithoutFeedback>
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
