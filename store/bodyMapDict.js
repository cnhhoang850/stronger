const bodyMapDict = {
  abs: {
    group: "abs",
    flag: "front",
  },
  obliques: {
    group: "obliques",
    flag: "both",
  },
  "hip flexors": {
    group: "adductors",
    flag: "front",
  },
  quads: {
    group: "quadriceps",
    flag: "front",
  },
  hamstrings: {
    group: "hamstring",
    flag: "back",
  },
  glutes: {
    group: "gluteal",
    flag: "back",
  },
  lats: {
    group: "upper-back",
    flag: "back",
  },
  biceps: {
    group: "biceps",
    flag: "front",
  },
  rhomboids: {
    group: "upper-back",
    flag: "back",
  },
  calves: {
    group: "calves",
    flag: "both",
  },
  "ankle stabilizers": {
    group: "ankles",
    flag: "both",
  },
  forearms: {
    group: "forearm",
    flag: "both",
  },
  pectorals: {
    group: "chest",
    flag: "front",
  },
  triceps: {
    group: "triceps",
    flag: "both",
  },
  shoulders: {
    group: "deltoids",
    flag: "both",
  },
  core: {
    group: "abs",
    flag: "front",
  },
  back: {
    group: "upper-back",
    flag: "back",
  },
  quadriceps: {
    group: "quadriceps",
    flag: "front",
  },
  "lower back": {
    group: "lower-back",
    flag: "back",
  },
  adductors: {
    group: "adductors",
    flag: "front",
  },
  chest: {
    group: "chest",
    flag: "front",
  },
  "cardiovascular system": {
    group: "chest",
    flag: "front",
  },
  spine: {
    group: "upper-back",
    flag: "back",
  },
  "upper back": {
    group: "upper-back",
    flag: "back",
  },
  "rear deltoids": {
    group: "deltoids",
    flag: "back",
  },
  delts: {
    group: "deltoids",
    flag: "both",
  },
  traps: {
    group: "trapezius",
    flag: "both",
  },
  trapezius: {
    group: "trapezius",
    flag: "both",
  },
  ankles: {
    group: "ankles",
    flag: "both",
  },
  feet: {
    group: "feet",
    flag: "both",
  },
  deltoids: {
    group: "deltoids",
    flag: "both",
  },
  "serratus anterior": {
    group: "chest",
    flag: "front",
  },
  brachialis: {
    group: "biceps",
    flag: "front",
  },
  groin: {
    group: "adductors",
    flag: "front",
  },
  wrists: {
    group: "forearm",
    flag: "both",
  },
  "rotator cuff": {
    group: "deltoids",
    flag: "both",
  },
  "upper chest": {
    group: "chest",
    flag: "front",
  },
  "latissimus dorsi": {
    group: "upper-back",
    flag: "back",
  },
  "wrist flexors": {
    group: "forearm",
    flag: "both",
  },
  "wrist extensors": {
    group: "forearm",
    flag: "both",
  },
  abdominals: {
    group: "abs",
    flag: "front",
  },
  "grip muscles": {
    group: "forearm",
    flag: "both",
  },
  "lower abs": {
    group: "abs",
    flag: "front",
  },
  "inner thighs": {
    group: "adductors",
    flag: "front",
  },
  soleus: {
    group: "calves",
    flag: "both",
  },
  abductors: {
    group: "adductors",
    flag: "front",
  },
  "levator scapulae": {
    group: "upper-back",
    flag: "back",
  },
  sternocleidomastoid: {
    group: "neck",
    flag: "both",
  },
  hands: {
    group: "hands",
    flag: "both",
  },
  shins: {
    group: "tibialis",
    flag: "both",
  },
};

const muscleGroups = {};

Object.values(bodyMapDict).forEach((item) => {
  if (!muscleGroups[item.group]) {
    muscleGroups[item.group] = { flag: item.flag };
  }
});

const muscleGroupsArray = Object.keys(bodyMapDict).map((key) => ({
  name: key,
  flag: bodyMapDict[key].flag,
  group: bodyMapDict[key].group,
}));

export { muscleGroups, muscleGroupsArray };
export default bodyMapDict;
