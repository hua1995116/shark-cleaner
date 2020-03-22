import * as loadPkg from 'load-json-file';

export interface Parser {
  file: string;
  parse: Function;
  values: string[];
}

export interface RecursiveRule {
  has: string[];
  computed: string;
  type: string;
  time: number;
  info?: Parser;
}

export interface StaticRule {
  path: string,
  type: string,
  computed: string
}

interface Rule {
  static: StaticRule[],
  recursive: RecursiveRule[],
  ignore: string[],
}

const rules: Rule = {
  recursive: [{
    has: ['node_modules', 'package.json'],
    computed: 'node_modules',
    info: {
      file: 'package.json',
      parse: loadPkg.sync,
      values: ['description', 'author']
    },
    type: 'node_modules',
    time: 1000 * 60 * 60 * 24 * 2, // 2 months
  }],
  static: [{
    path: '~/.npm',
    type: 'npm_cache',
    computed: './'
  }, {
    path: '~/.nvm/versions/node',
    type: 'node_cache',
    computed: './**'
  }],
  ignore: []
}

rules.ignore = rules.recursive.reduce((arr, item) => (arr.concat(item.has)), []);

export default rules;
