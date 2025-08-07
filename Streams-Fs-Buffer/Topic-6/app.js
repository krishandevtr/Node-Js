const fs = require("node:fs");
const path = require("node:path");

const pathToSource = path.join(__dirname, "text.txt");
const pathToDest = path.join(__dirname, "dest.txt");

const pattern = '[ERROR]';

function findLinesWithPattern(pattern, pathToSource, pathToDest) {
    const readStream = fs.createReadStream(pathToSource, { encoding: 'utf8', highWaterMark: 16 * 1024 });
    const writeStream = fs.createWriteStream(pathToDest, { encoding: 'utf8', highWaterMark: 16 * 1024 });

    let leftover = '';
    let chunkCount = 0;
    let totalMatches = 0;
    let totalBytes = 0;

    readStream.on("data", (chunk) => {
        // increment the chunk count by 1
        chunkCount++;

        // Add the length in bytes 
        totalBytes += Buffer.byteLength(chunk, 'utf8');

        // 
        const data = leftover + chunk;

        // chatGpt - This basically break each line at \n or \n depends upon OS
        const lines = data.split(/\r?\n/);


        leftover = lines.pop();

        for (const line of lines) {
            if (line.includes(pattern)) {
                totalMatches++;
                console.log(`Chunk #${chunkCount}: Found line:`, line);
                const canContinue = writeStream.write(line + '\n');

                if (!canContinue) {
                    console.log("Need to Flush ❌❌❌❌❌")
                    readStream.pause();
                }

            }
        }
    });



    readStream.on("error", (err) => {
        console.error("Error reading file:", err);
    });

    writeStream.on('drain', () => {
        console.log("Draining 🚀🚀🚀🚀🚀🚀🚀");
        readStream.resume();
    })

    readStream.on("end", () => {
        if (leftover.includes(pattern)) {
            totalMatches++;
            console.log(`Chunk #${chunkCount} (leftover): Found line:`, leftover);
            writeStream.write(leftover + '\n');
        }

        console.log("\n=== File read complete ===");
        console.log("Total chunks read:", chunkCount);
        console.log("Total bytes read:", totalBytes);
        console.log("File size (MB):", (totalBytes / 1024 / 1024).toFixed(2));
        console.log(`Total lines containing "${pattern}":`, totalMatches);

        writeStream.end(() => {
            console.log(`Output written to ${pathToDest}`);
        });
    });

    writeStream.on("error", (err) => {
        console.error("Error writing file:", err);
    });


    writeStream.on('close', () => {
        console.log('Done with writing ');
    })
}

findLinesWithPattern(pattern, pathToSource, pathToDest);
