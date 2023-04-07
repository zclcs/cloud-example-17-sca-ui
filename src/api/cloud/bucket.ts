import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  bucket = '/system/bucket',
  checkBucketName = '/system/bucket/checkBucketName',
}

export const createBucketApi = (params: any) =>
  defHttpWithTransform.post<void>({
    url: Api.bucket,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateBucketApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.bucket,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteBucketApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.bucket + '/' + ids,
  });

export const getBucketPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.bucket, params });

export const getBucketList = () => defHttpWithTransform.get<any>({ url: Api.bucket + '/list' });

export const checkBucketName = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.checkBucketName, params }, { errorMessageMode: 'none' });
