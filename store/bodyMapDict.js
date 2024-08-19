const bodyMapDict = {
  "front-trapezius": {
    group: "trapezius",
    flag: "front",
  },
  "back-trapezius": {
    group: "trapezius",
    flag: "back",
  },
  "front-triceps": {
    group: "triceps",
    flag: "front",
  },
  "back-triceps": {
    group: "triceps",
    flag: "back",
  },
  "front-forearm": {
    group: "forearm",
    flag: "front",
  },
  "back-forearm": {
    group: "forearm",
    flag: "back",
  },
  "front-obliques": {
    group: "obliques",
    flag: "front",
  },
  "back-obliques": {
    group: "obliques",
    flag: "back",
  },
  quads: {
    group: "quadriceps",
    flag: "front",
  },
  "front-adductors": {
    group: "adductors",
    flag: "front",
  },
  "back-adductors": {
    group: "adductors",
    flag: "back",
  },
  "front-calves": {
    group: "calves",
    flag: "front",
  },
  "back-calves": {
    group: "calves",
    flag: "back",
  },
  "front-head": {
    group: "head",
    flag: "front",
  },
  "back-head": {
    group: "head",
    flag: "back",
  },
  "front-neck": {
    group: "neck",
    flag: "front",
  },
  "back-neck": {
    group: "neck",
    flag: "back",
  },
  chest: {
    group: "chest",
    flag: "front",
  },
  biceps: {
    group: "biceps",
    flag: "front",
  },
  abs: {
    group: "abs",
    flag: "front",
  },
  "upper-back": {
    group: "upper-back",
    flag: "back",
  },
  "lower-back": {
    group: "lower-back",
    flag: "back",
  },
  hamstring: {
    group: "hamstring",
    flag: "back",
  },
  gluteal: {
    group: "gluteal",
    flag: "back",
  },
  "front-delts": {
    group: "deltoids",
    flag: "front",
  },
  "back-delts": {
    group: "deltoids",
    flag: "back",
  },
  "front-hands": {
    group: "hands",
    flag: "front",
  },
  "back-hands": {
    group: "hands",
    flag: "back",
  },
  "front-feet": {
    group: "feet",
    flag: "front",
  },
  "back-feet": {
    group: "feet",
    flag: "back",
  },
  "front-ankles": {
    group: "ankles",
    flag: "front",
  },
  "back-ankles": {
    group: "ankles",
    flag: "back",
  },
  "front-tibialis": {
    group: "tibialis",
    flag: "front",
  },
  "back-tibialis": {
    group: "tibialis",
    flag: "back",
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
