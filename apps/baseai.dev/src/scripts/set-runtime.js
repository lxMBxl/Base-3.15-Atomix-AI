const fs = require('fs');

function getPath(type) {
	return [
		`${process.cwd()}/src/app/${type}/[section]/page.tsx`,
		`${process.cwd()}/src/app/${type}/[section]/[slug]/page.tsx`
	];
}

async function main() {
	const runTime = `export const runtime = 'edge';\n\n`;

	getPath('docs').forEach(async path => {
		const file = fs.readFileSync(path, 'utf-8');

		if (!file.includes(runTime)) {
			await fs.promises.writeFile(path, runTime.concat(file));
		}
	});

	getPath('learn').forEach(async path => {
		const file = fs.readFileSync(path, 'utf-8');
		if (!file.includes(runTime)) {
			await fs.promises.writeFile(path, runTime.concat(file));
		}
	});
}

main();
