import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';

const tscBinaryLocation = path.join(__dirname, '../node_modules/typescript/bin/tsc');
const tscCLIOptions = '--noEmit --strict';

/**
 * Recursively walks a directory to return the absolute paths of all contained files.
 */
function getFilesInDirectory(directory: string): string[] {
    const dirObjects = fs.readdirSync(directory, { withFileTypes: true });
    let out: string[] = [];
    for (const dirObject of dirObjects) {
        if (dirObject.isDirectory()) {
            out = out.concat(getFilesInDirectory(path.join(directory, dirObject.name)));
        } else {
            out.push(path.join(directory, dirObject.name));
        }
    }
    return out;
}

const compilingFiles = getFilesInDirectory(path.join(__dirname, './type-testcases/compiling'));
const failingFiles = getFilesInDirectory(path.join(__dirname, './type-testcases/failing'));

test.each(compilingFiles)('File "%s" should pass typecheck', file => {
    expect(() => {
        childProcess.execSync(`${tscBinaryLocation} ${file} ${tscCLIOptions}`);
    }).not.toThrow();
});

test.each(failingFiles)('File "%s" should not pass typecheck', file => {
    expect(() => {
        childProcess.execSync(`${tscBinaryLocation} ${file} ${tscCLIOptions}`);
    }).toThrow();
});
