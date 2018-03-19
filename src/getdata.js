import fs from 'fs';

export default pathToFile => fs.readFileSync(pathToFile, 'utf8');
