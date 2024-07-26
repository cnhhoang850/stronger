import storage from "@/store/LocalStore";
import { create } from "zustand";

const keys = storage.getAllKeys();
let workouts = keys.map((key) => {
  let time = new Date(parseInt(key));
  let workout = storage.getString(key);
  if (!workout) {
    return null;
  }
  let workoutObj = JSON.parse(workout);
  workoutObj.time = time;
  return workoutObj;
});

const useStore = create((set) => ({
  workouts: workouts,
  getWorkout: (id) => {
    return workouts.find((workout) => workout.id === id);
  },
  updateWorkout: (id, newWorkout) => {
    set((state) => ({
      workouts: state.workouts.map((workout) => {
        if (workout.id === id) {
          storage.set(id, JSON.stringify(newWorkout));
          return newWorkout;
        }
        return workout;
      }),
    }));
  },
  setWorkouts: (workouts) => set({ workouts }),
}));

storage.clearAll();

export default useStore;
