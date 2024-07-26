import React, { useState, useRef } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "react-native-paper";

export default function ExerciseDataTable({ exercise }) {
  const theme = useTheme();
  const [sets, setSets] = useState(exercise.sets);

  const handleInputChange = (index, field, value) => {
    const newSets = [...sets];
    const cleanedValue = value.replace(/[^0-9.]/g, ""); // Remove all non-numeric characters
    const parsedValue = parseFloat(cleanedValue);
    if (!isNaN(parsedValue)) {
      newSets[index][field] = parsedValue; // Allow empty strings for clearing the field
      setSets(newSets);
    } else {
      newSets[index][field] = "";
      setSets(newSets);
    }
  };

  const addSet = () => {
    const newSet = { weight: 0, reps: 0, volume: 0, calories: 0 };
    setSets([...sets, newSet]);
  };

  return (
    <View>
      <View style={styles.columnContainer}>
        <View style={styles.entryColumn}>
          <ThemedText style={{ marginBottom: 4 }} type="menu">
            {"Weight"}
          </ThemedText>

          {sets.map((set, index) => (
            <View style={styles.inputRow} key={index}>
              <TextInput
                style={styles.input}
                value={set.weight.toString()}
                onChangeText={(text) => handleInputChange(index, "weight", text)}
                keyboardType="numeric"
                selectTextOnFocus={true}
                maxLength={4} // Limit input to 4 digits
              />
              <ThemedText style={styles.inputUnit}>kg</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.entryColumn}>
          <ThemedText style={{ marginBottom: 4 }} type="menu">
            {"Reps"}
          </ThemedText>

          {sets.map((set, index) => (
            <View style={styles.inputRow} key={index}>
              <TextInput
                style={styles.input}
                value={set.reps.toString()}
                onChangeText={(text) => handleInputChange(index, "reps", text)}
                keyboardType="numeric"
                selectTextOnFocus={true}
                maxLength={3} // Limit input to 3 digits
              />
            </View>
          ))}
        </View>

        <View style={styles.entryColumn}>
          <ThemedText style={{ marginBottom: 4 }} type="menu">
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
          <ThemedText style={{ marginBottom: 4 }} type="menu">
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
      <Button title="+ Add set" onPress={addSet} />
    </View>
  );
}

const styles = StyleSheet.create({
  columnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    paddingLeft: 0,
    paddingRight: 12,
    margin: 0,
  },
  entryColumn: {
    display: "flex",
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
    borderColor: "gray",
    borderWidth: 0.2,
    backgroundColor: "#f0f0f0",
    paddingLeft: 8,
    borderRadius: 4,
    textAlign: "left",
  },
  inputUnit: {
    marginLeft: 4,
  },
});
