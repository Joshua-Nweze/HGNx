import path from 'path';
import { read } from 'fs';
import fs from 'fs'

async function saveToDb (data, id) {
  try {
    let currData = await fs.readdir('./dB');

    const file = currData.filter((item) => item === `${id}.json`);

    if (file.length > 0) {
      let currData = await fs.readFile(`./dB/${id}.json`, {
        encoding: 'utf-8',
      });

      let parsedData = JSON.parse(currData);

      if (parsedData.length < 1) {
        parsedData = [];
      }

      // Update data in the object
      parsedData.push(data);
      currData = JSON.stringify(parsedData);

      return await fs.writeFile(`./dB/${id}.json`, currData, 'utf-8');
    }

    //convert the modified object back to JSON
    currData = JSON.stringify([data]);

    await fs.writeFile(`./dB/${id}.json`, currData, 'utf-8');
  } catch (error) {
    throw error;
  }
};

async function getFileById (fileId) {
  let fileDirectory = await fs.readdir('./dB');

  const file = fileDirectory.filter((item) => item === `${fileId}.json`);

  if (file.length < 0) {
    return;
  }

  let fileToRead = await fs.readFile(`./dB/${file}`, { encoding: 'utf-8' });

  const parsedFile = JSON.parse(fileToRead);

  const extractedBufferArr = [];
  for (const singleBuff of parsedFile) {
    for (const eachData of singleBuff.data) {
      extractedBufferArr.push(eachData);
    }
  }

  return extractedBufferArr;
};

async function deleteFile (fileId) {
  let fileDirectory = await fs.readdir('./dB');

  const file = fileDirectory.find((item) => item === `${fileId}.json`);

  if (file) {
    fs.unlink(`./dB/${file}`, (err) => {
      if (err) {
        throw err;
      }
      console.log('File delete successfully');
    });
  }
};

export default {
  saveToDb,
  getFileById,
  deleteFile,
};