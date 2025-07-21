console.time('Search Finished IN');
import fs from 'node:fs';

const { readdirSync, readFileSync, statSync } = fs;
import path from 'node:path';
import { EnvSchema } from './env.schema';

const excludedDirs = new Set(['.git', 'node_modules', 'dist', '.idea', '.husky', 'coverage', 'docker', '.vscode']);
const listDefaultsKeys = new Set(['PWD', 'DEV']);

const keysNotInExample = new Set();
const exampleFile = readFileSync('.env.example').toString();
const exampleKeys = new Set(
    exampleFile
        .split('\n')
        .filter((line) => line && !line.startsWith('#') && line !== '\r')
        .map((line) => line.split('=')[0]),
);
const schemaDescription = EnvSchema.describe();
const schemaKeys: Set<string> = new Set(Object.keys((schemaDescription.keys as Record<string, unknown>) ?? {}));
const keysNotInSchema: Set<string> = new Set();
const allUsedKeys: Set<string> = new Set();

/**
 * Validates the specified key against the example and schema keys.
 * @param key The key to validate.
 */
function validateKey(key: string | undefined) {
    if (key) {
        allUsedKeys.add(key);
        if (!listDefaultsKeys.has(key)) {
            if (!exampleKeys.has(key)) {
                keysNotInExample.add(key);
            }
            if (!schemaKeys.has(key)) {
                keysNotInSchema.add(key);
            }
        }
    }
}

/**
 * Searches the specified directory for TypeScript files and checks for environment variable usage.
 * @param directoryPath The path of the directory to search.
 */
function searchDirectory(directoryPath: string) {
    const files = readdirSync(directoryPath);
    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const stats = statSync(filePath);
        if (stats.isDirectory() && !excludedDirs.has(file)) {
            searchDirectory(filePath);
        } else if (stats.isFile() && file.endsWith('.ts')) {
            const data = readFileSync(filePath).toString();
            const matches = data.match(new RegExp(/process\.env\.\w+/, 'g'));
            const matches2 = data.match(new RegExp(/%\w+%/, 'g'));
            const matches3 = data.match(new RegExp(/import\.meta\.env\.\w+/, 'g'));
            if (matches) matches.forEach((m) => validateKey(m.split('process.env.').pop()?.trim()));
            if (matches2) matches2.forEach((m) => validateKey(m.replace(/%/g, '')));
            if (matches3) matches3.forEach((m) => validateKey(m.split('import.meta.env.').pop()?.trim()));
        } else if (stats.isFile() && file.endsWith('.yml')) {
            const data = readFileSync(filePath).toString();
            const matches = data.match(new RegExp(/\$\{\s*\w+\s*(-\s*\w+\s*)?}/, 'g'));
            if (matches) {
                matches.forEach((match) => {
                    const key = match.match(/\w+/)?.pop()?.trim();
                    if (key) {
                        allUsedKeys.add(key);
                        if (!listDefaultsKeys.has(key)) {
                            if (!exampleKeys.has(key)) {
                                keysNotInExample.add(key);
                            }
                        }
                    }
                });
            }
        }
    });
}

const directoryToSearch = '.';
searchDirectory(directoryToSearch);
let error = '';
if (keysNotInExample.size > 0) {
    error += `Keys not in example keys: \n${Array.from(keysNotInExample).join('\n')}`;
}

if (keysNotInSchema.size > 0) {
    error += `${error ? '\n\n' : ''}Keys not in joy schema keys: \n${Array.from(keysNotInSchema).join('\n')}`;
}

const exampleNotUsed = Array.from(exampleKeys).filter((exKey) => !allUsedKeys.has(exKey));
if (exampleNotUsed.length > 0) {
    error += `${error ? '\n\n' : ''}Keys not used in example: \n${exampleNotUsed.join('\n')}`;
}

const schemaNotUsed = Array.from(schemaKeys).filter((schKey) => !allUsedKeys.has(schKey));
if (schemaNotUsed.length > 0) {
    error += `${error ? '\n\n' : ''}Keys not used in schema: \n${schemaNotUsed.join('\n')}`;
}

if (error) {
    console.timeEnd('Search Finished IN');
    throw new Error(error);
}
console.timeEnd('Search Finished IN');
