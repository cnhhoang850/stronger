import React, { useRef, memo } from "react";
import { View, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ContextMenuButton } from "react-native-ios-context-menu";
import { useTheme } from "react-native-paper";
import { SFSymbol } from "@/components/SFSymbols";
import { muscleGroupsArray } from "@/store/bodyMapDict";
import { Chip } from "react-native-paper";

type rowIndex = "topRow" | "middleRow" | "bottomRow";

type ContextMenuItemProps = {
  title: string;
  value: string;
  rowIndex: rowIndex;
  handleInput: (filed: string, value: string) => void;
  field: string;
  chipItems: { name: string; flag: string }[];
};

const ChipMenuItem = ({ title, value, rowIndex, handleInput, field, chipItems }: ContextMenuItemProps) => {
  const contextTouchAreaRef = useRef(null);
  const theme = useTheme();

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
            borderBottomWidth: 1,
            borderStyle: "solid",
            borderBottomColor: "rgba(84, 84, 88, 0.65)",
          }}
        >
          <ThemedText>{title}</ThemedText>

          <View style={{ flexDirection: "row", alignItems: "center" }}></View>
        </View>
      </View>

      <ScrollView
        style={{
          ...styles[rowIndex],
          height: 200,
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
              <Chip
                selectedColor={theme.colors.primary}
                mode="outlined"
                key={index}
                style={{ margin: 4 }}
                onPress={(na) => {}}
              >
                <ThemedText type="menu" style={{ fontSize: 12 }}>
                  {item.name}
                </ThemedText>
              </Chip>
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
