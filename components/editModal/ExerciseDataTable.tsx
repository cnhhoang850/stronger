import React, { useState, useRef, useCallback, memo } from "react";
import { StyleSheet, View, TextInput, Button, Dimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "react-native-paper";

const ExerciseDataTable = ({ exercise, scrollViewRef, scrollY }) => {
  const [sets, setSets] = useState(exercise.sets);
  const theme = useTheme();
  const lastSetRef = useRef(null);
  const textInputRef = useRef([]);

  const handleInputChange = useCallback((index, field, value) => {
    setSets((prevSets) => {
      const newSets = [...prevSets];
      const cleanedValue = value.replace(/[^0-9.]/g, ""); // Remove all non-numeric characters
      const parsedValue = parseFloat(cleanedValue);
      if (!isNaN(parsedValue)) {
        newSets[index][field] = parsedValue; // Allow empty strings for clearing the field
      } else {
        newSets[index][field] = "";
      }
      return newSets;
    });
  }, []);

  const addSet = () => {
    const newSet = { weight: 0, reps: 0, volume: 0, calories: 0 };
    setSets((prevSets) => [...prevSets, newSet]);
    scrollViewRef.current.scrollToPosition(0, scrollY + 70);
  };

  return (
    <View>
      <View style={styles.columnContainer}>
        <View style={styles.entryColumn}>
          <ThemedText style={styles.headerText} type="menu">
            {"Weight"}
          </ThemedText>

          {sets.map((set, index) => (
            <View style={styles.inputRow} key={index} ref={index === sets.length - 1 ? lastSetRef : null}>
              <TextInput
                style={styles.input}
                value={set.weight.toString()}
                onChangeText={(text) => handleInputChange(index, "weight", text)}
                keyboardType="numeric"
                selectTextOnFocus={true}
                maxLength={3} // Limit input to 4 digit
                textAlign="center"
              />
              <ThemedText style={styles.inputUnit}>kg</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.entryColumn}>
          <ThemedText style={styles.headerText} type="menu">
            {"Reps"}
          </ThemedText>

          {sets.map((set, index) => (
            <View style={styles.inputRow} key={index} ref={index === sets.length - 1 ? lastSetRef : null}>
              <TextInput
                style={styles.input}
                value={set.reps.toString()}
                onChangeText={(text) => handleInputChange(index, "reps", text)}
                keyboardType="numeric"
                selectTextOnFocus={true}
                maxLength={3} // Limit input to 3 digits
                textAlign="center"
              />
            </View>
          ))}
        </View>

        <View style={styles.entryColumn}>
          <ThemedText style={styles.headerText} type="menu">
            {"Volume"}
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
              />
              <ThemedText>kg</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.entryColumn}>
          <ThemedText style={styles.headerText} type="menu">
            {"Calories"}
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
              />
              <ThemedText>kcal</ThemedText>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Button title="+ Add set" onPress={addSet} />
      </View>
    </View>
  );
};

export default memo(ExerciseDataTable);

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    paddingLeft: 0,
    paddingRight: 12,
    margin: 0,
  },
  entryColumn: {
    paddingBottom: 0,
    marginBottom: -12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    height: 28,
  },
  input: {
    width: 36, // Fixed width for text input
    height: 24,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    textAlign: "left",
    fontSize: 16,
  },
  inputUnit: {
    marginLeft: 4,
  },
  headerText: {
    marginBottom: 4,
  },
});
