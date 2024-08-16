import React, { useState, useEffect } from "react";
import { Chip, useTheme } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { SFSymbol } from "@/components/SFSymbols";
import { View, LayoutAnimation } from "react-native";

const ChipCheckbox = ({
  name,
  selectedColor,
  reset,
  setReset,
  value,
  handleInput,
  field,
  ...props
}) => {
  const [checked, setChecked] = useState(false);
  const theme = useTheme();

  const handlePress = () => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: { type: "linear", property: "opacity" },
      update: { type: "spring", springDamping: 0.9 },
      delete: { type: "linear", property: "opacity" },
    });
    setChecked(!checked);
    let newValue = value.includes(name)
      ? value.filter((item) => item === name)
      : [...value, name];
    console.log(value, newValue);
    handleInput(field, newValue);
  };

  useEffect(() => {
    if (reset) {
      setChecked(false);
    }
  }, [reset]);

  return (
    <Chip
      mode="outlined"
      {...props}
      selected={checked}
      onPress={handlePress}
      compact={true}
      style={{
        margin: 4,
        backgroundColor: checked ? selectedColor : "transparent",
        borderWidth: 1,
        borderColor: checked ? selectedColor : theme.colors.elevation.onLevel2,
        height: 36,
        padding: 0,
      }}
      icon={{ source: null }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked && (
          <SFSymbol
            style={{ width: 16, height: 16, marginRight: 8, paddingTop: 8 }}
            name={"checkmark"}
            color={"rgb(0,0,0)"}
          />
        )}

        <ThemedText
          style={{
            color: checked ? "rgb(0,0,0)" : theme.colors.elevation.onLevel2,
          }}
        >
          {props.children || name}
        </ThemedText>
      </View>
    </Chip>
  );
};

export default ChipCheckbox;
