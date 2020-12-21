import { resolve } from 'path';
import { promises } from 'fs';
// Has client-side rendering patch
const { readdir, readFile } = promises || {};

export async function* getFilesInDirectory(dir) {
	const directoryEntries = await readdir(dir, { withFileTypes: true });
	for (const directoryEntry of directoryEntries) {
		const res = resolve(dir, directoryEntry.name);
		if (directoryEntry.isDirectory()) {
			yield* getFilesInDirectory(res);
		} else {
			yield res;
		}
	}
}

export async function readText(filePath) {
	return await readFile(filePath, 'utf8');
}

export default {
	readText,
	getFilesInDirectory
};
