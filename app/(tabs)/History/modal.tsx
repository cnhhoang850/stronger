import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRef, useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card as PaperCard, Button as PaperButton } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store/useStore";
import { useLocalSearchParams } from "expo-router";
import SettingCard from "@/components/editModal/SettingCard";
import ExerciseDataTable from "@/components/editModal/ExerciseDataTable";
import KeyboardAwareHOC from "@/components/KeyboardAwareScrollView";
import { DarkTheme } from "@react-navigation/native";

export default function EditModal() {
  const { id } = useLocalSearchParams();
  const workout = useStore((state) => state.getWorkout(id));
  const scrollViewRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  return (
    <ThemedView style={styles.modalContent}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1 }}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          keyboardShouldPersistTaps="handled"
          onScrollEndDrag={(event) => {
            setScrollY(event.nativeEvent.contentOffset.y);
          }}
          onMomentumScrollEnd={(event) => {
            setScrollY(event.nativeEvent.contentOffset.y);
          }}
        >
          <SettingCard workout={workout} />

          {workout.exercises.map((exercise, index) => (
            <View key={index}>
              <View style={{ paddingLeft: 12, paddingBottom: 4 }}>
                <ThemedText style={{ opacity: 0.7, fontSize: 14 }} type="default">
                  {exercise.name.toUpperCase()}
                </ThemedText>
              </View>

              <PaperCard mode="contained" style={styles.cardContainer}>
                <ExerciseDataTable scrollY={scrollY} scrollViewRef={scrollViewRef} exercise={exercise} />
              </PaperCard>
            </View>
          ))}

          <View
            style={{
              flex: 1,
              paddingBottom: 200,
            }}
          ></View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
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
