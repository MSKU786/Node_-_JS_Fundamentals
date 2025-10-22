import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';

export async function processMarkdownJob({ filepath }) {
  const markdown = await fs.readFile(filepath, 'utf-8');
  const htmlContent = marked(markdown);

  const outputDir = path.join('src', 'output');
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(
    outputDir,
    path.basename(filePath, '.md') + '.html'
  );
  await fs.writeFile(outputPath, htmlContent);

  return outputPath;
}
