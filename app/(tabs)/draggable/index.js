import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Box from "./box";
import Draggable from "./draggable";

const ROWS = 5; // Number of rows
const COLS = 5; // Number of columns

const arr = new Array(ROWS * COLS).fill("").map((_, i) => i);

const App = () => {
  const positions = useSharedValue(Object.assign({}, ...arr.map((item) => ({ [item]: item }))));

  return (
    <SafeAreaProvider style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            {arr.map((item) => (
              <Draggable key={item} positions={positions} id={item} colCount={COLS}>
                <Box key={item} count={item} />
              </Draggable>
            ))}
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
