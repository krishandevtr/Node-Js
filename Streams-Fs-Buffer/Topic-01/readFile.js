const fs = require('node:fs');
const path = require('node:path');




// - Read a `.txt` file using `fs.readFile`.
// - Log its content to the console.




// File path to text.txt
const filePath = path.join(__dirname, 'text.txt');


function logFile(path) {
    const readStream = fs.createReadStream(path);
    let result = '';

    readStream.on('data', (chunk) => {
        result += chunk;
    });

    readStream.on('end', () => {
        console.log(' Done reading file');
        console.log(result.toString("utf-8"));
    });

    readStream.on('error', (err) => {
        console.error(' Error reading file:', err);
    });

}

logFile(filePath);
