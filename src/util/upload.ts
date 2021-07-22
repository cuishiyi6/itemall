import { extname, join } from 'path';
import * as fs from 'fs';
import { nanoid } from 'nanoid';

export const upload = (file): string => {
  // 文件夹的路径
  const dir = join(__dirname, '..', 'upload');
  try {
    // 判断文件是否存在 不存在文件夹会抛出异常，捕获异常
    fs.statSync(dir);
  } catch (err) {
    // 创建文件夹
    fs.mkdir(dir, () => console.log('文件夹创建成功'));
  }
  const fileName = nanoid() + extname(file.originalname);
  // 文件保存路径
  const path = join(__dirname, '..', 'upload', fileName);
  // 创建文件输出流
  const writeStream = fs.createWriteStream(path);
  // 写入文件
  writeStream.write(file.buffer);
  // 关闭流
  writeStream.close();
  return 'http://127.0.0.1:3000/' + fileName;
};
