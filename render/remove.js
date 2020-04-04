
module.exports = function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const node = path.node;
        const args = node.arguments || [];

        if (node.source.value === 'electron') {
          path.remove();
        }
      }
    }
  };
}