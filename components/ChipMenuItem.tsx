import React, { useRef, memo, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "react-native-paper";
import ChipCheckbox from "@/components/ChipCheckbox";

type rowIndex = "topRow" | "middleRow" | "bottomRow";

type ContextMenuItemProps = {
  title: string;
  value: string;
  rowIndex: rowIndex;
  handleInput: (filed: string, value: string) => void;
  field: string;
  chipItems: { name: string; flag: string; group: string }[];
};

const ChipMenuItem = ({ title, value, rowIndex, handleInput, field, chipItems }: ContextMenuItemProps) => {
  const theme = useTheme();
  const [resetAll, setResetAll] = useState(false);

  const resetAllChips = () => {
    setResetAll(true);
    // Reset the reset state to false after resetting
    setTimeout(() => setResetAll(false), 0);
  };

  return (
    <>
      <View
        style={{
          ...styles["middleRow"],
          backgroundColor: theme.colors.elevation.onLevel1,
        }}
      >
        <View
          style={{
            ...styles.contentContainer,
            paddingRight: 16,
            borderBottomWidth: 1,
            borderStyle: "solid",
            borderBottomColor: "rgba(84, 84, 88, 0.65)",
          }}
        >
          <ThemedText>{title}</ThemedText>
          <TouchableOpacity onPress={resetAllChips}>
            <ThemedText type="system" style={{ fontSize: 17 }}>
              Reset
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{
          ...styles[rowIndex],
          height: 300,
          backgroundColor: theme.colors.elevation.onLevel1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",

            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          {chipItems.map((item, index) => {
            return (
              <ChipCheckbox
                key={index}
                name={item.name}
                selectedColor={theme.colors.primary}
                reset={resetAll}
                setReset={setResetAll}
                value={value}
                handleInput={handleInput}
                field={field}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default memo(ChipMenuItem);

const styles = StyleSheet.create({
  topRow: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginHorizontal: 16,
    paddingLeft: 16,
    height: 48,
    lineHeight: 16,
    margin: 0,
  },
  middleRow: {
    marginHorizontal: 16,
    paddingLeft: 16,
    height: 48,
    lineHeight: 16,
    margin: 0,
  },
  bottomRow: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    marginHorizontal: 16,
    paddingLeft: 16,
    height: 48,
    lineHeight: 16,
    margin: 0,
    marginBottom: 24,
  },
  contentContainer: {
    height: 48,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 0,
    alignContent: "center",
    alignItems: "center",
  },
});
