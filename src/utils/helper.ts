"use client";

const AUTH_USER_KEY = "AUTH_USER";
const CURRENT_APP_KEY = "CURRENT_APP";

export const setCurrentApp = (app: any) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CURRENT_APP_KEY, JSON.stringify(app));
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return;
  window!.localStorage.getItem(AUTH_USER_KEY);
};

export const setCurrentUser = (user: any) => {
  if (typeof window === "undefined") return;
  window!.localStorage.setItem(AUTH_USER_KEY, user);
};

export const getPathByKey = (targetKey: string, treeList: Array<any>) => {
  /** 存放搜索到的树节点到顶部节点的路径节点 */
  let pathRes: Array<any> = [];
  /**
   * 路径节点追踪
   * @param {*} targetKey 树节点标识的值
   * @param {*} treeList 树
   * @param {array} path 存放搜索到的树节点到顶部节点的路径节点
   * @returns undefined
   */
  const queryPath = (targetKey: string, treeList: Array<any>, path: any) => {
    // 树为空时，不执行函数
    if (!treeList.length) return [];

    // 遍历存放树的数组
    for (let i = 0; i < treeList.length; i++) {
      const { key, children } = treeList[i];
      // 遍历的节点key存入path数组中
      path.push(treeList[i]);
      // 把获取到的目标节点路径数组path赋值到pathRes数组
      // if (key === targetKey) return (pathRes = [...path]);
      if (new RegExp(key).test(targetKey)) return (pathRes = [...path]);

      // 递归遍历子数组内容
      if (children) {
        queryPath(targetKey, children, path);
      }
      // 利用回溯思想，当没有在当前叶树找到目的节点，依次删除存入到的path数组路径
      path.pop();
    }
  };
  queryPath(targetKey, treeList, []);
  return pathRes;
};

// 获取文件后缀
export const getFileExtension = (fileName: string) => {
  return fileName?.split(".")?.length > 1
    ? fileName.split(".").pop()?.toLowerCase()
    : "";
};

export const isJSON = (str: string) => {
  try {
    if (typeof JSON.parse(str) === "object") {
      return true;
    }
  } catch (error) {}
  return false;
};

export const switchOptionToMap = (
  options = [],
  labelKey = "label",
  valueKey = "value"
) => {
  return options.reduce((calc, curr) => {
    return { ...calc, [curr[valueKey]]: curr[labelKey] };
  }, {});
};
