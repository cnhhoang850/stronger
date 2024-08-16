const bodyMapDict = {
  abs: {
    group: "abs",
    flag: "front",
  },
  obliques: {
    group: "obliques",
    flag: "front",
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
    flag: "side",
  },
  "ankle stabilizers": {
    group: "ankles",
    flag: "side",
  },
  forearms: {
    group: "forearm",
    flag: "side",
  },
  pectorals: {
    group: "chest",
    flag: "front",
  },
  triceps: {
    group: "triceps",
    flag: "back",
  },
  shoulders: {
    group: "deltoids",
    flag: "side",
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
    flag: "side",
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
    flag: "side",
  },
  traps: {
    group: "trapezius",
    flag: "side",
  },
  trapezius: {
    group: "trapezius",
    flag: "side",
  },
  ankles: {
    group: "ankles",
    flag: "side",
  },
  feet: {
    group: "feet",
    flag: "side",
  },
  deltoids: {
    group: "deltoids",
    flag: "side",
  },
  "serratus anterior": {
    group: "chest",
    flag: "side",
  },
  brachialis: {
    group: "biceps",
    flag: "side",
  },
  groin: {
    group: "adductors",
    flag: "front",
  },
  wrists: {
    group: "forearm",
    flag: "side",
  },
  "rotator cuff": {
    group: "deltoids",
    flag: "side",
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
    flag: "side",
  },
  "wrist extensors": {
    group: "forearm",
    flag: "side",
  },
  abdominals: {
    group: "abs",
    flag: "front",
  },
  "grip muscles": {
    group: "forearm",
    flag: "side",
  },
  "lower abs": {
    group: "abs",
    flag: "front",
  },
  "inner thighs": {
    group: "adductors",
    flag: "side",
  },
  soleus: {
    group: "calves",
    flag: "side",
  },
  abductors: {
    group: "adductors",
    flag: "side",
  },
  "levator scapulae": {
    group: "upper-back",
    flag: "back",
  },
  sternocleidomastoid: {
    group: "neck",
    flag: "side",
  },
  hands: {
    group: "hands",
    flag: "side",
  },
  shins: {
    group: "tibialis",
    flag: "side",
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
