import storage from "@/store/LocalStore";
import { create } from "zustand";

const loadExercises = () => {
  let keys = storage.getString("exerciseKeys");
  keys = JSON.parse(keys);

  if (!keys) {
    return [];
  }
  return keys.map((key) => {
    const exercise = storage.getString(key);
    if (!exercise) {
      return null;
    }
    const exerciseObj = JSON.parse(exercise);
    return exerciseObj;
  });
};

const loadWorkouts = () => {
  let keys = storage.getString("workoutKeys");
  if (!keys) {
    return [];
  }
  keys = JSON.parse(keys);
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

const loadTemplates = () => {
  let keys = storage.getString("templateKeys");
  if (!keys) {
    return [];
  }
  keys = JSON.parse(keys);
  return keys.map((key) => {
    const template = storage.getString(key);
    if (!template) {
      return null;
    }
    const templateObj = JSON.parse(template);
    return templateObj;
  });
};

const useStore = create((set) => ({
  currentWorkout: {},
  templates: loadTemplates(),
  updateTemplate: (id, newTemplate) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === id) {
          // Update template in local storage
          // please add error handling when not finding id
          storage.set(id, JSON.stringify(newTemplate));
          return newTemplate;
        }
        return template;
      });
      return { templates: updatedTemplates };
    });
  },
  exercises: loadExercises(),
  workouts: loadWorkouts(),
  updateWorkout: (id, newWorkout) => {
    set((state) => {
      const updatedWorkouts = state.workouts.map((workout) => {
        if (workout.id === id) {
          // Update workout in local storage
          // please add error handling when not finding id
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
