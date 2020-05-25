import * as types from '@babel/types';
import * as parser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import generate from '@babel/generator';

export function removeUnusedImport(code: string) {
  // 解析代码，构建ast
  const ast: types.File = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  const opts = {
    ignore: ['react'],
  };

  traverse(ast, {
    Program: {
      enter: path => {
        for (const [, binding] of Object.entries(path.scope.bindings)) {
          if (binding.kind === 'module') {
            if (!binding.referenced) {
              const source = binding.path.parentPath.get('source');
              if (
                types.isStringLiteral(source) &&
                (!opts.ignore || !match(opts.ignore, (source as NodePath<types.StringLiteral>).node.value))
              ) {
                if (binding.path.node.type === 'ImportSpecifier') {
                  binding.path.remove();
                } else if (binding.path.parentPath) {
                  binding.path.parentPath.remove();
                }
              }
            }
          }
        }
      },
    },
  });
  return generate(ast, {}).code;
}

function match(rule: any, value: any): boolean {
  if (typeof rule === 'string') {
    return rule === value;
  }
  if (rule instanceof RegExp) {
    return rule.test(value);
  }
  if (typeof rule === 'function') {
    return rule(value);
  }
  if (Array.isArray(rule)) {
    return rule.some(r => match(r, value));
  }
  return false;
}
