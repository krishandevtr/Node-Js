const fs = require("node:fs");
const path = require("node:path");


const pathToSource = path.join(__dirname, "DataSet.txt");
const pathToReplaceOutput = path.join(__dirname, "Replace.txt");
const pathToRepairOutput = path.join(__dirname, "Repair.txt");

function main() {
    const readStream = fs.createReadStream(pathToSource);
    const replaceStream = fs.createWriteStream(pathToReplaceOutput);
    const repairStream = fs.createWriteStream(pathToRepairOutput);
    let TOTAL_NUMBER_OF_CHUNKS = 0;

    let leftOver = '';

    readStream.on('data', (chunk) => {
        const data = leftOver + chunk;
        const lines = data.split(/\r?\n/);
        leftOver = lines.pop(); 

        const { repairBuff, replaceBuff } = processLines(lines);

        const canReplaceContinue = replaceStream.write(replaceBuff);
        const canRepairContinue = repairStream.write(repairBuff);

        if (!canReplaceContinue || !canRepairContinue) {
            readStream.pause();
        }

        TOTAL_NUMBER_OF_CHUNKS++;
        console.log(`Chunk size: ${data.length}`);
    });

    readStream.on('end', () => {

        if (leftOver.trim()) {
            const { repairBuff, replaceBuff } = processLines([leftOver]);
            replaceStream.write(replaceBuff);
            repairStream.write(repairBuff);
        }

        console.log("Done with reading the file");
        console.log("TOTAL NUMBER OF CHUNKS: ", TOTAL_NUMBER_OF_CHUNKS);
        repairStream.end();
        replaceStream.end();
    });

 
    repairStream.on('drain', () => {
        console.log("Repair stream drained, resuming read stream...");
        readStream.resume();
    });

    replaceStream.on('drain', () => {
        console.log("Replace stream drained, resuming read stream...");
        readStream.resume();
    });

    repairStream.on('close', () => {
        console.log("Done writing to repair file.");
    });

    replaceStream.on('close', () => {
        console.log("Done writing to replace file.");
    });
}

function processLines(lines) {
    let replaceRecords = [];
    let repairRecords = [];
    let unknownRecords = [];

    for (let line of lines) {
        if (line.includes('REPLACE')) {
            replaceRecords.push(line);
        } else if (line.includes("REPAIR")) {
            repairRecords.push(line);
        } else {
            unknownRecords.push(line);
        }
    }

    // Optional: Print stats for this batch
    console.log(`
    >>>> Processed batch:
        Replace: ${replaceRecords.length}
        Repair : ${repairRecords.length}
        Unknown: ${unknownRecords.length}
        Total  : ${lines.length}
    `);

    return {
        replaceBuff: Buffer.from(replaceRecords.join('\n') + '\n'),
        repairBuff: Buffer.from(repairRecords.join('\n') + '\n')
    };
}

main();
