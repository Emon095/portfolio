import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.join(root, 'src', 'content', '_assets');
const targetDir = path.join(root, 'public', 'content-assets');

const removeDirContents = (dirPath) => {
  if (!fs.existsSync(dirPath)) return;
  for (const entry of fs.readdirSync(dirPath, {withFileTypes: true})) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      fs.rmSync(fullPath, {recursive: true, force: true});
    } else {
      fs.unlinkSync(fullPath);
    }
  }
};

const copyRecursive = (from, to) => {
  fs.mkdirSync(to, {recursive: true});
  for (const entry of fs.readdirSync(from, {withFileTypes: true})) {
    const sourcePath = path.join(from, entry.name);
    const targetPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
};

fs.mkdirSync(targetDir, {recursive: true});
removeDirContents(targetDir);

if (fs.existsSync(sourceDir)) {
  copyRecursive(sourceDir, targetDir);
}

console.log('Synced content assets:', sourceDir, '->', targetDir);
