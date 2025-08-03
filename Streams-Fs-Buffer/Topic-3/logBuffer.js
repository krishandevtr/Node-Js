const readline = require("node:readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a text: ", (answer) => {

    const buffer = Buffer.from(answer, 'utf-8');


    console.log(" Buffer content:", buffer);


    console.log(" Base64 encoded string:", buffer.toString('base64'));

    console.log("Buffer length:", buffer.length);

    rl.close();
});
