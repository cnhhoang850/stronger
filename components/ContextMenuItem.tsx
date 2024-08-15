import React, { useRef, memo } from "react";
import { View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ContextMenuButton } from "react-native-ios-context-menu";
import { useTheme } from "react-native-paper";
import { SFSymbol } from "@/components/SFSymbols";
import { muscleGroups } from "@/store/bodyMapDict";

type rowIndex = "topRow" | "middleRow" | "bottomRow";

type ContextMenuItemProps = {
  title: string;
  value: string;
  rowIndex: rowIndex;
  handleInput: (filed: string, value: string) => void;
  field: string;
  menuItems: { actionKey: string; actionTitle: string }[];
};

const ContextMenuItem = ({ title, value, rowIndex, handleInput, field, menuItems }: ContextMenuItemProps) => {
  const contextTouchAreaRef = useRef(null);
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        contextTouchAreaRef.current.presentMenu();
      }}
    >
      <View
        style={{
          ...styles[rowIndex],
          backgroundColor: theme.colors.elevation.onLevel1,
        }}
      >
        <View
          style={{
            ...styles.contentContainer,
            borderBottomWidth: rowIndex !== "bottomRow" ? 1 : 0,
            borderStyle: "solid",
            borderBottomColor: "rgba(84, 84, 88, 0.65)",
          }}
        >
          <ThemedText>{title}</ThemedText>

          <ContextMenuButton
            style={{ marginLeft: 100 }}
            ref={contextTouchAreaRef}
            isMenuPrimaryAction={true}
            menuConfig={{
              menuTitle: "",
              menuItems: menuItems,
            }}
            onPressMenuItem={({ nativeEvent }) => {
              handleInput(field, nativeEvent.actionTitle);
            }}
          ></ContextMenuButton>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ThemedText style={{ color: theme.colors.elevation.onLevel2 }}>{value}</ThemedText>
            <SFSymbol
              style={{ width: 16, height: 16, marginRight: 16, marginLeft: 8 }}
              name={"chevron.up.chevron.down"}
              color={theme.colors.elevation.onLevel2}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ContextMenuItem);

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
