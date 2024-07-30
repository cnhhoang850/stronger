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

const loadWorkouts = () => {
  const keys = storage.getAllKeys();
  return keys
    .map((key) => {
      const time = new Date(parseInt(key));
      const workout = storage.getString(key);
      if (!workout) {
        return null;
      }
      const workoutObj = JSON.parse(workout);
      workoutObj.time = time;
      return workoutObj;
    })
    .filter((workout) => workout !== null); // Filter out any null workouts
};

const useStore = create((set) => ({
  workouts: loadWorkouts(),
  updateWorkout: (id, newWorkout) => {
    set((state) => {
      const updatedWorkouts = state.workouts.map((workout) => {
        if (workout.id === id) {
          // Update workout in local storage
          storage.set(id, JSON.stringify(newWorkout));
          return newWorkout;
        }
        return workout;
      });
      return { workouts: updatedWorkouts };
    });
  },
  setWorkouts: (workouts) => set({ workouts }),
}));

storage.clearAll();

export default useStore;
