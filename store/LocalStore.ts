import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

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

function sleep(milliseconds) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < milliseconds) {}
}

function blockingSetTimeout(callback, delay) {
  sleep(delay);
  callback();
}

for (let i = 0; i < 12; i++) {
  for (let k = 0; k < 30; k++) {
    blockingSetTimeout(() => {
      let now = Date.now() + i * 2629000000;
      let timeInSec = now.toString();

      // Create a deep copy of the mockWorkout to avoid mutating the original object
      let workoutCopy = JSON.parse(JSON.stringify(mockWorkout));

      // Add unique IDs to each exercise
      workoutCopy.exercises.forEach((exercise, index) => {
        exercise.id = (now + index * 1000).toString();
      });

      let timeWorkout = { ...workoutCopy, time: timeInSec, id: timeInSec };
      storage.set(timeInSec, JSON.stringify(timeWorkout));
    }, 10);
  }
}

export default storage;
