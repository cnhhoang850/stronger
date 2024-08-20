import { MMKV } from "react-native-mmkv";
import exerciseData from "./exercises.json";

const storage = new MMKV();

let exerciseKeys = [];
for (let exercise of exerciseData) {
  exerciseKeys.push(exercise.id);
  storage.set(exercise.id, JSON.stringify(exercise));
}

storage.set("exerciseKeys", JSON.stringify(exerciseKeys));

const mockWorkout = {
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
};

const mockWorkoutTemplate = {
  name: "Workout Template",
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
  restTime: 60,
  location: "Home",
  date: new Date().getTime().toString(),
  id: new Date().getTime().toString(),
};

storage.set(mockWorkoutTemplate.id, JSON.stringify(mockWorkoutTemplate));
storage.set("templateKeys", JSON.stringify([mockWorkoutTemplate.id]));

function sleep(milliseconds) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < milliseconds) {}
}

function blockingSetTimeout(callback, delay) {
  sleep(delay);
  callback();
}

let workoutKeys: string[] = [];
for (let i = 0; i < 12; i++) {
  for (let k = 0; k < 30; k++) {
    blockingSetTimeout(() => {
      let now = Date.now() + i * 2629000000;
      let timeInSecWorkoutId = now.toString();
      workoutKeys.push(timeInSecWorkoutId);

      // Create a deep copy of the mockWorkout to avoid mutating the original object
      let workoutCopy = JSON.parse(JSON.stringify(mockWorkout));

      // Add unique IDs to each exercise
      workoutCopy.exercises.forEach((exercise, index) => {
        exercise.id = (now + index * 1000).toString();
      });

      let timeWorkout = {
        ...workoutCopy,

        id: timeInSecWorkoutId,
      };
      storage.set(timeInSecWorkoutId, JSON.stringify(timeWorkout));
    }, 10);
  }
}

storage.set("workoutKeys", JSON.stringify(workoutKeys));
export default storage;
