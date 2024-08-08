const fs = require('fs');
const path = require('path');

// Path to the text file

const txtFilePath = path.resolve("images.txt")

// Output JavaScript file path
const outputFilePath = path.resolve("./index.js")

// Read all lines from the text file
fs.readFile(txtFilePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading the text file:', err);
    return;
  }

  // Split data into lines and filter out any empty lines
  const lines = data.split('\n').filter(line => line.trim() !== '');

  // Generate the JS object for images
  let output = 'const Images = {\n';

  lines.forEach((line, index) => {
    const value = `require('./${line.trim()}')`;
    const key = removePngExtension(line.trim())
    output += `  'img${key}': ${value},\n`;
  });

  output += '};\n\nexport default Images;\n';

  // Write the output to the output file
  fs.writeFile(outputFilePath, output, (err) => {
    if (err) {
      console.error('Error writing the output file:', err);
      return;
    }
    console.log('Images.js file has been generated successfully.');
  });
});


function removePngExtension(filename) {
  return filename.replace(/\.png$/, '');
}
