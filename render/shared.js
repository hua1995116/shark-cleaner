export function byteConvert(bytes) {
  if (isNaN(bytes)) {
    return "";
  }
  const symbols = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let exp = Math.floor(Math.log(bytes) / Math.log(2));
  if (exp < 1) {
    exp = 0;
  }
  const i = Math.floor(exp / 10);
  bytes = bytes / Math.pow(2, 10 * i);

  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    bytes = bytes.toFixed(2);
  }
  return bytes + " " + symbols[i];
}

export function join(root, path) {
  if (path === './') {
    return root;
  }
  if (root.indexOf('/') > -1) {
    return root + `/${path}`;
  }
  return root + `\\${path}`;
}
