import React, { memo } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import capitalizeFirstLetter from "@/utils/capitalizeFirst";
import Animated from "react-native-reanimated";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const ExerciseListItem = ({ image, exercise, select }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("details", { ...exercise })}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <ImageBackground
          style={{
            borderRadius: 6,
            backgroundColor: "#fff",
            height: 50,
            width: 50,
          }}
        >
          <Animated.Image source={image} style={styles.image} />
        </ImageBackground>

        <View style={styles.textContentContainer}>
          <ThemedText type="default">
            {capitalizeFirstLetter(exercise.name)}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 26,
              lineHeight: 32,
              marginBottom: -8,
              color: theme.colors.primary,
            }}
          >
            {capitalizeFirstLetter(exercise.target)}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 12,
    paddingLeft: 20,
    paddingBottom: 2,
    height: 82,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  textContentContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    marginBottom: 6,
  },

  flexColumnSpaceAround: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default memo(ExerciseListItem);
