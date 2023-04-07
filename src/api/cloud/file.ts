import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  file = '/system/file',
}

export const createFileApi = (params: any) =>
  defHttpWithTransform.post<void>({
    url: Api.file,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteFileApi = (ids: any) =>
  defHttpWithTransform.delete<void>({
    url: Api.file + '/' + ids,
  });

export const getFilePage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.file, params });
