import { Image, StyleSheet,  } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import WorkoutHistoryCard from "@/components/WorkoutCard";

const date = new Date();
const DATA = [
  {
    time: date,
    duration: 10000,
    calories: 340,
    volume: 1000,
    exercises: [
      {
        name: "Pushups",
        sets: [
          {
            reps: 10,
            weight: 100,
          },
          {
            reps: 10,
            weight: 100,
          },
        ],
      },
      {
        name: "Pullups",
        sets: [
          {
            reps: 10,
            weight: 100,
          },
          {
            reps: 10,
            weight: 100,
          },
        ],
      },
    ],
  },
  {
    time: date,
    duration: 10000,
    calories: 340,
    volume: 1000,
    exercises: [
      {
        name: "Pushups",
        sets: [
          {
            reps: 10,
            weight: 100,
          },
          {
            reps: 10,
            weight: 100,
          },
        ],
      },
      {
        name: "Pullups",
        sets: [
          {
            reps: 10,
            weight: 100,
          },
          {
            reps: 10,
            weight: 100,
          },
        ],
      },
    ],
  },
  {
    time: date,
    duration: 10000,
    calories: 340,
    volume: 1000,
    exercises: [
      {
        name: "Pushups",
        sets: [
          {
            reps: 10,
            weight: 100,
          },
          {
            reps: 10,
            weight: 100,
          },
        ],
      },
      {
        name: "Pullups",
        sets: [
          {
            reps: 10,
            weight: 100,
          },
          {
            reps: 10,
            weight: 100,
          },
        ],
      },
    ],
  },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />
      }
    >
      <ThemedView>
        {DATA.map((workout) => (
          <WorkoutHistoryCard workout={workout} />
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
