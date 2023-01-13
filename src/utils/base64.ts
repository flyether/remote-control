import * as fs from 'fs';

export function base64_encode(file: string) {
   return fs.readFileSync(file, 'base64');
 }
 