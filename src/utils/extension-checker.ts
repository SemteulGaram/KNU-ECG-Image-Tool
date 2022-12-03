import path from 'path';

export function extensionChecker(
  extensions: string[],
  pathOrFilename: string
): boolean {
  const ext = path.extname(pathOrFilename).toLowerCase();
  return extensions.includes(ext);
}
