import { each, pick, omit } from "underscore";
import "core-js/shim";

import TopNavConfig from "./config/top_nav_config";

export const origConfig: MenuElement[] = TopNavConfig;

interface MenuElement {
  id?: string;
  displayText?: string;
  url?: string;
  anchorId?: string;
  subElements?: MenuElement[];
  display?: boolean;
  internal_url?: string;
};

let flattenConfig = () => {
  let navHash:any = {};
  let flatten = function(nestedConfig:MenuElement[]) {
    each(nestedConfig, function(elem) {
      let subElem = elem.subElements;

      if(subElem && subElem.length) {
        navHash[elem.id] = omit(elem, 'subElements');
        flatten(subElem);
      } else {
        navHash[elem.id] = elem;
      }
    });
  };

  flatten(origConfig);
  return navHash;
};

const flatConfig = flattenConfig();

export const customConfig = function(id:string, ...fields:string[]) {
  if(fields.length === 0) {
    return flatConfig[id];
  }
  return pick(flatConfig[id], ...fields);
};

export const isInInnerConfig = (category: string, id: string) => {
  console.log(`origConfig:${JSON.stringify(origConfig)}`);
  return origConfig.find((config: MenuElement) => {
    if(category === config.id) {
      const subElements = config.subElements;
      const actualId = config.subElements.find((config: MenuElement) => {
        return config.id === id;
      });

      return actualId ? actualId : undefined;
    }
  });
}
