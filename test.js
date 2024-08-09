function countingValleys(steps, path) {
  // Write your code here
  let level = 0;
  let count = 0;
  let inVal = false;
  for (let i = 0; i < steps; i++) {
    if (level < 0) {
      inVal = true;
    }

    let curr = path[i];
    console.log(curr);
    if (i === 0) {
      if (curr === "U") {
        level++;
        continue;
      } else {
        level--;
        continue;
      }
    }

    if (curr == "U") {
      level++;
    } else {
      level--;
    }
    if (inVal && level === 0) {
      count++;
      inVal = false;
    }
  }
  return count;
}

console.log(countingValleys(12, "DDUUDDUDUUUD"));
