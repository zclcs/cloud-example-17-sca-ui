import { defHttpWithTransform } from '/@/utils/http/axios';

enum Api {
  dataBase = '/maintenance/dataBase',
  schema = '/schema',
  select = '/select',
}

export const getSchema = () =>
  defHttpWithTransform.get<any>({
    url: Api.dataBase + Api.schema,
  });

export const select = (params: any) =>
  defHttpWithTransform.get<any>({
    url: Api.dataBase + Api.select,
    params: params,
  });
