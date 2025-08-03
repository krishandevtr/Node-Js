const fs = require("node:fs");
const path = require("node:path");

const textPath = path.join(__dirname, "text.txt");
const destPath = path.join(__dirname, "dest.txt");

function Copy(source, destination) {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);

    readStream.on("data", (chunk) => {
        const canContinue = writeStream.write(chunk);
        if (!canContinue) {
            console.log(" Buffer full, pausing read stream...");
            readStream.pause();
        }
    });

    writeStream.on("drain", () => {
        console.log(" Drain event fired, resuming read stream...");
        readStream.resume();
    });

    readStream.on("end", () => {
        console.log(" Finished reading.");
        writeStream.end(); 
    });

    writeStream.on("finish", () => {
        console.log(" Finished writing.");
    });

    readStream.on("error", (err) => {
        console.error(" Read stream error:", err.message);
    });

    writeStream.on("error", (err) => {
        console.error(" Write stream error:", err.message);
    });
}

Copy(textPath, destPath);
