import { StyleSheet, View, Dimensions } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import ExerciseWebps from "@/assets/exercises/webps";
import { Image as ExpoImage } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import capitalizeFirstLetter from "@/utils/capitalizeFirst";
import Body from "react-native-body-highlighter";
import { Collapsible } from "@/components/Collapsible";
import { useTheme } from "react-native-paper";
import bodyMapDict from "@/store/bodyMapDict";
import Animated from "react-native-reanimated";

export default function Details() {
  const theme = useTheme();
  const exercise = useLocalSearchParams();
  const { width: screenWidth } = Dimensions.get("window");
  Object.keys(exercise).forEach((key) => {
    let value = exercise[key];
    if (typeof value === "string") {
      exercise[key] = capitalizeFirstLetter(value);
    }
  });

  const { id, name, instructions, target, secondaryMuscles } = exercise;
  const muscles = [target, ...secondaryMuscles];
  const { frontMuscleData, backMuscleData } = mapMuscles(muscles, target);

  const AnimatedExpoImage = Animated.createAnimatedComponent(ExpoImage);

  const renderHeaderImage = (() => (
    <>
      <AnimatedExpoImage source={ExerciseWebps["webp" + id]} style={{ width: 260, height: 260 }} />
    </>
  ))();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#fff", dark: "#000" }}
      headerImage={renderHeaderImage}
    >
      <View style={[styles.titleContainer]}>
        <ThemedText type="title">{name}</ThemedText>
      </View>

      <Collapsible style={{ marginTop: 12 }} title="Instructions:">
        <View style={styles.listTextContainer}>
          {instructions.map((instruction, index) => (
            <ThemedText
              style={{ maxWidth: screenWidth * 0.7 }}
              key={index}
              type="default"
            >{`\u2043 ${instruction}`}</ThemedText>
          ))}
        </View>
      </Collapsible>

      <ThemedText style={styles.listTextHeader} type="defaultSemiBold">
        Target muscles:{" "}
      </ThemedText>

      <View style={[styles.listTextContainer, { gap: 2 }]}>
        <ThemedText
          style={{
            fontSize: 26,
            lineHeight: 26,
            color: theme.colors.primary,
          }}
          type="default"
        >
          {target}
        </ThemedText>
        {secondaryMuscles.map((muscle) => {
          return (
            <ThemedText style={{ color: "rgba(64, 167, 235, 100)" }} key={muscle} type="subtitle">
              {capitalizeFirstLetter(muscle)}
            </ThemedText>
          );
        })}
      </View>
      <View
        style={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-around",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Body
          data={frontMuscleData}
          gender="male"
          side="front"
          scale={0.7}
          colors={["#0984e3", theme.colors.primary]}
        />
        <Body
          data={backMuscleData}
          gender="male"
          side="back"
          scale={0.7}
          colors={["#0984e3", theme.colors.primary]}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  listTextHeader: {
    marginTop: 12,
  },
  listTextContainer: {
    flexDirection: "column",
    gap: 8,
  },

  titleContainer: {
    flexDirection: "row",
  },
});

function mapMuscles(muscles, target) {
  const frontMuscles = [];
  const backMuscles = [];

  muscles.forEach((muscle) => {
    const value = JSON.parse(JSON.stringify(bodyMapDict[muscle.toLowerCase()]));

    const flag = value.flag;
    if (muscle === target) {
      value.target = true;
    }
    if (flag === "front") {
      frontMuscles.push(value);
    } else if (flag === "back") {
      backMuscles.push(value);
    } else if (flag === "both") {
      frontMuscles.push(value);
      backMuscles.push(value);
    } else {
      console.log("Muscle not found in bodyMapDict " + muscle);
    }
  });

  const mapMuscles = (muscles) => {
    return muscles.map((muscle) => ({
      slug: muscle.group,
      intensity: muscle.target ? 2 : 1,
    }));
  };

  const frontMuscleData = mapMuscles(frontMuscles);
  const backMuscleData = mapMuscles(backMuscles);
  return { frontMuscleData, backMuscleData };
}
