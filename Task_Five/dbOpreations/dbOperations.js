import path from 'path';
import { read } from 'fs';
import fs from 'fs'

const saveToDb = async (data, id) => {
  try {
    let currentData = await fs.readdir('./dB');

    const file = currentData.filter((item) => item === `${id}.json`);

    if (file.length > 0) {
      let currentData = await fs.readFile(`./dB/${id}.json`, {
        encoding: 'utf-8',
      });

      let parsedData = JSON.parse(currentData);

      if (parsedData.length < 1) {
        parsedData = [];
      }

      // Update data in the object
      parsedData.push(data);
      currentData = JSON.stringify(parsedData);

      return await fs.writeFile(`./dB/${id}.json`, currentData, 'utf-8');
    }

    //convert the modified object back to JSON
    currentData = JSON.stringify([data]);

    await fs.writeFile(`./dB/${id}.json`, currentData, 'utf-8');
  } catch (error) {
    throw error;
  }
};

const getFileById = async (fileId) => {
  let fileDirectory = await fs.readdir('./dB');

  const file = fileDirectory.filter((item) => item === `${fileId}.json`);

  if (file.length < 0) {
    return;
  }

  let fileToRead = await fs.readFile(`./dB/${file}`, { encoding: 'utf-8' });

  const parsedFile = JSON.parse(fileToRead);

  const extractedBuffArr = [];
  for (const singleBuff of parsedFile) {
    for (const eachData of singleBuff.data) {
      extractedBuffArr.push(eachData);
    }
  }

  return extractedBuffArr;
};

const deleteFile = async (fileId) => {
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