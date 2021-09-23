import { createReadStream, createWriteStream } from 'fs';
import { parse, join } from 'path';
import { readdir } from 'fs/promises';
import { pipeline } from 'stream';
import csv from 'csvtojson';

const INPUT_DIRNAME = 'csv';
const OUTPUT_DIRNAME = 'output';

const errorCallback = (error) => {
  if (error) {
    console.error(error);
  }
};

function transformCsvToJson(file) {
  const filename = parse(file).name;
  const readStream = createReadStream(join(__dirname, INPUT_DIRNAME, file), { highWaterMark: 30 });
  const writeStream = createWriteStream(join(__dirname, OUTPUT_DIRNAME, `${filename}.txt`));

  pipeline(readStream, csv({ ignoreColumns: /amount/gi }), writeStream, errorCallback);
}

async function getFilesAndTransformToJson() {
  const files = await readdir(join(__dirname, INPUT_DIRNAME));

  for (let file of files) {
    transformCsvToJson(file);
  }
}

getFilesAndTransformToJson().catch((error) => console.error(error));
