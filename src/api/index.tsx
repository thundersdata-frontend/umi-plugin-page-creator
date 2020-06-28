import { IApi } from 'umi';
import { existsSync } from 'fs';
import { ApiJSON } from '../../interfaces/api';

/**
 * 根据项目根目录下的services/api-lock.json，生成一个接口和声明的关联文件。
 * 在UI侧选择某个接口，
 */
export default function(api: IApi) {
  const jsonPath = api.paths.absSrcPath + '/services/api-lock.json';
  if (!existsSync(jsonPath)) {
    return {
      databases: null,
      // mods: null,
      baseClasses: null,
    };
  }
  const apiJson: ApiJSON[] = require(jsonPath);

  const databases = apiJson.map(db => ({
    label: db.name,
    value: db.name,
    children: db.mods.map(mod => ({
      label: mod.description,
      value: mod.name,
      children: mod.interfaces.map(({ name, response, description, method, parameters }) => {
        // 提交表单数据时的DTO
        const paramsName = parameters.find(param => param.in === 'body')?.dataType.typeName;
        // 获取数据时的DTO
        let responseName;
        if (response.typeArgs.length > 0) {
          responseName = response.typeArgs.find(arg => arg.isDefsType)?.typeName;
        } else {
          if (response.isDefsType) {
            responseName = response.typeName;
          }
        }
        const value = `${name}-${paramsName}-${responseName}`;
        return {
          label: `${description}(${method})`,
          value,
        };
      }),
    })),
  }));

  const mods = apiJson.reduce(
    (accu, curr) =>
      accu.concat(
        curr.mods.map(mod => ({
          name: mod.name,
          description: mod.description,
          dbId: curr.name,
        })) as [],
      ),
    [],
  );

  const baseClasses = apiJson.reduce(
    (accu, curr) =>
      accu.concat(
        curr.baseClasses.map(mod => ({
          name: mod.name,
          dbId: curr.name,
          description: mod.description || '',
          properties: mod.properties.map(prop => ({
            label: prop.description,
            value: prop.name,
            required: prop.required,
          })),
        })) as [],
      ),
    [],
  );

  return {
    databases,
    // mods,
    baseClasses,
  };
}
