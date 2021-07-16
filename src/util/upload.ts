import * as fs from 'fs';
import { nanoid } from 'nanoid';
import { extname, join } from 'path';

export const upload = (file): string => {
  const dir = join(__dirname, '..', 'upload');
  try {
    fs.statSync(dir);
  } catch (err) {
    fs.mkdir(dir, () => console.log('文件创建成功'));
  }
  const fileName = nanoid() + extname(file.originalname);
  const path = join(__dirname, '..', 'upload', fileName);
  const writeStream = fs.createWriteStream(path);
  writeStream.write(file.buffer);
  writeStream.close();
  return 'http://127.0.0.1:3000/' + fileName;
};
