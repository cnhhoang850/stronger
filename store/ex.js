const fs = require("fs");

// Read the JSON file
fs.readFile("exercises.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  const exercises = JSON.parse(data);

  // Create a set to store unique muscles
  const uniqueMuscles = new Set();

  // Extract unique target and secondary muscles
  exercises.forEach((exercise) => {
    if (exercise.target) {
      uniqueMuscles.add(exercise.target);
    }
    if (exercise.secondaryMuscles) {
      exercise.secondaryMuscles.forEach((muscle) => uniqueMuscles.add(muscle));
    }
  });

  // Convert the set to an array
  const uniqueMusclesArray = Array.from(uniqueMuscles);

  // Loop through each unique muscle and log it
  uniqueMusclesArray.forEach((muscle) => {
    console.log(muscle);
  });
});
