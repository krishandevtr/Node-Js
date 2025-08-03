const fs = require("fs");
const { Transform } = require("stream");
const path = require("path");

const inputPath = path.join(__dirname, "text.txt");
const outputPath = path.join(__dirname, "uppercase.txt");


const toUpperCase = new Transform({
  transform(chunk, encoding, callback) {
    const upper = chunk.toString().toUpperCase();
    this.push(upper);
    callback();
  }
});


const readStream = fs.createReadStream(inputPath);
const writeStream = fs.createWriteStream(outputPath);


readStream.on("data", (chunk) => {
  const transformed = toUpperCase._transform(chunk, "utf-8", () => {});

  
  let data;
  while ((data = toUpperCase.read()) !== null) {
    const canContinue = writeStream.write(data);
    if (!canContinue) {
      readStream.pause();
    }
  }
});


writeStream.on("drain", () => {
  readStream.resume();
});


readStream.on("end", () => {
  writeStream.end();
  console.log("✅ Transformation complete (without .pipe).");
});


readStream.on("error", (err) => console.error("Read error:", err));
writeStream.on("error", (err) => console.error("Write error:", err));
toUpperCase.on("error", (err) => console.error("Transform error:", err));
