const { error } = require("node:console");
const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");


const writeStream = fs.createWriteStream(path.join(__dirname, "text.txt"));


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let answer = "";

rl.question("Enter any text: ", (data) => {
    answer += data;
    rl.close();

});



rl.on("close", () => {
    const buff = Buffer.from(answer);
    writeStream.write(buff);
    console.log("writable stream",writeStream.writableLength);
    writeStream.end();

});


writeStream.on('close', () => {
    console.log("Answer successfully wrote to text.txt");
    console.log(writeStream.writableHighWaterMark, "THis is the writableHighMark")
})

writeStream.on('error', (err) => {
    console.log("Error :", err);
})


