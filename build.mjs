import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const srcDir = './src/tests';
const outDir = './dist';

const build = async () => {
    try{

        const optionstoBuild = {
            entryPoints: entries,
            bundle: true,
            platform: 'node',
            format: 'esm',
            target: 'es2022',
            external:['k6','k6/http','k6/metrics','k6/ws','k6/crypto','k6/html']
        };

        if(entries.length ===1){
            optionstoBuild.outfile = path.join(outDir, path.basename(entries[0], '.ts')+'.js');
        }
        else{
            optionstoBuild.outdir=outDir;
            optionstoBuild.entryNames='[dir]/[name]';
        }
        await esbuild.build(optionstoBuild);
        console.log('Build is successfully completed.');
    }

    catch (err) {
        console.error(`Build has failed: ${err}`);
        process.exit(1);
    }
};

const getFiles = (dir) => {
    let files = [];
    fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
        const absPath = path.join(dir, file.name);
        if (file.isDirectory()){
            file = files.concat(getFiles(absPath)); //Will recursively find all files
        }
        else if (file.name.endsWith('.ts')){
            files.push(absPath);
        }
    });
    return files;
};

const entries = getFiles(srcDir);
if(!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true });
}

build();