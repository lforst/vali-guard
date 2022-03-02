//@ts-check
const fs = require('node:fs');
const path = require('node:path');
const childProcess = require('node:child_process');
const os = require('node:os');
const Spinnies = require('spinnies');
const cliSpinners = require('cli-spinners');

const spinners = new Spinnies({ spinner: cliSpinners.dots });

const tscBinaryLocation = path.join(__dirname, '../../node_modules/typescript/bin/tsc');
const tscCLIOptions = '--noEmit --strict';

const cliFilter = process.argv[2];

/**
 * Recursively walks a directory to return the absolute paths of all contained files.
 * @param {string} directory
 * @returns {string[]} array of absolute file paths
 */
function getFilesInDirectory(directory) {
    const dirObjects = fs.readdirSync(directory, { withFileTypes: true });
    let out = [];
    for (const dirObject of dirObjects) {
        if (dirObject.isDirectory()) {
            out = out.concat(getFilesInDirectory(path.join(directory, dirObject.name)));
        } else {
            out.push(path.join(directory, dirObject.name));
        }
    }
    return out;
}

const compilingFiles = getFilesInDirectory(path.join(__dirname, './testcases/compiling'));
const failingFiles = getFilesInDirectory(path.join(__dirname, './testcases/failing'));

const tasks = [
    ...compilingFiles.map((f) => ({ file: f, shouldFail: false })),
    ...failingFiles.map((f) => ({ file: f, shouldFail: true })),
].filter(({ file }) => !cliFilter || file.match(RegExp(cliFilter, 'gi')));

if (cliFilter) {
    console.log(`Found ${tasks.length} tests matching "${cliFilter}".`);
}

let testsSucceeded = true;
const testAmount = tasks.length;
const fails = [];

const threads = os.cpus().map(async () => {
    let task = tasks.pop();
    while (task !== undefined) {
        spinners.add(task.file, { text: task.file });
        await new Promise((resolve) => {
            childProcess.exec(
                `${tscBinaryLocation} ${task.file} ${tscCLIOptions}`,
                (error, stdout, stderr) => {
                    const taskFailed = !!error;
                    if (taskFailed !== task.shouldFail) {
                        spinners.fail(task.file);
                        if (task.shouldFail) {
                            fails.push(
                                `FAIL: File "${task.file}" passed type-check while it should fail.`
                            );
                        } else {
                            fails.push(
                                `FAIL: File "${task.file}" failed type-check while it should succeed:\n${stdout}`
                            );
                        }
                        testsSucceeded = false;
                    } else {
                        spinners.succeed(task.file);
                    }
                    resolve();
                }
            );
        });
        task = tasks.pop();
    }
});

Promise.all(threads).then(() => {
    console.log(`-------------------`);
    console.log(`Successfully ran ${testAmount} tests.`);
    if (!testsSucceeded) {
        console.log('Not all testcases returned the expected results:\n');
        fails.forEach((fail) => {
            console.log(`● ${fail}`);
        });
        process.exit(1);
    } else {
        console.log(`All testcases returned the expected results.`);
        process.exit(0);
    }
});
