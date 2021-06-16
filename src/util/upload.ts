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

  const path = join(
    __dirname,
    '..',
    'upload',
    nanoid() + extname(file.originalname),
  );
  const writeStream = fs.createWriteStream(path);
  writeStream.write(file.buffer);
  writeStream.close();
  return path;
};
