import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

/**
 * DictItemAo对象，字典项
 */
export interface DictItemAo {
  /**
   * 描述
   */
  description?: string;
  /**
   * 字典key
   */
  dictName: string;
  /**
   * 是否禁用 @@yes_no
   */
  disabled?: string;
  /**
   * 主键
   */
  id: number;
  /**
   * 层级
   */
  level?: number;
  /**
   * 父级字典值
   */
  parentValue?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 排序（升序）
   */
  sorted: number;
  /**
   * 标签
   */
  title: string;
  /**
   * 字典类型 @@system.dict_item.type
   */
  type?: string;
  /**
   * 值
   */
  value: string;
  /**
   * 是否系统字典 @@yes_no
   */
  whetherSystemDict?: string;
}

enum Api {
  DICT = '/system/dictItem',
  TREE = '/system/dictItem/tree',
  DICT_NAME = '/system/dictItem/dictName/list',
  checkValue = '/system/dictItem/checkValue',
}

export const createDictApi = (params: DictItemAo) =>
  defHttpWithTransform.post<void>({
    url: Api.DICT,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateDictApi = (params: DictItemAo) =>
  defHttpWithTransform.put<void>({
    url: Api.DICT,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteDictApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.DICT + '/' + ids,
  });

export const page = (params: any) => defHttpWithTransform.get<any>({ url: Api.DICT, params });

export const dictNameList = () => defHttpWithTransform.get<any>({ url: Api.DICT_NAME });

export const tree = (params: any) => defHttpWithTransform.get<any>({ url: Api.TREE, params });

export const checkValue = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.checkValue, params }, { errorMessageMode: 'none' });
