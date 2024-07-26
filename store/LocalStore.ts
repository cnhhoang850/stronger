import { MMKV, Mode } from "react-native-mmkv";

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
  ],
};

function sleep(milliseconds: number) {
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
      let timeWorkout = { ...mockWorkout, time: timeInSec, id: timeInSec };
      storage.set(timeInSec, JSON.stringify(timeWorkout));
    }, 10);
  }
}

export default storage;
