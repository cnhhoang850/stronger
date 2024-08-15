import React, { useState } from "react";
import { Chip } from "react-native-paper";

const ChipCheckbox = ({ name, selectedColor, ...props }) => {
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    setChecked(!checked);
  };

  return (
    <Chip
      {...props}
      selected={checked}
      onPress={handlePress}
      style={{
        margin: 4,
        backgroundColor: checked ? selectedColor : "transparent",
      }}
    >
      {props.children || name}
    </Chip>
  );
};

export default ChipCheckbox;
