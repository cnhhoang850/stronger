import { Dimensions } from "react-native";

export const MARGIN = 8;

export const getPosition = (index, colCount) => {
  "worklet";
  const SIZE = Dimensions.get("window").width / colCount - MARGIN;
  return {
    x: (index % colCount) * SIZE,
    y: Math.floor(index / colCount) * SIZE,
  };
};

export const getOrder = (x, y, colCount) => {
  "worklet";
  const SIZE = Dimensions.get("window").width / colCount - MARGIN;
  const row = Math.round(y / SIZE);
  const col = Math.round(x / SIZE);
  return row * colCount + col;
};
