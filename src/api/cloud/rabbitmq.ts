import { defHttpWithTransform } from '/@/utils/http/axios';

enum Api {
  RABBITMQ = '/system/rabbitmq',
}

export const getExchangePage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.RABBITMQ + '/exchanges', params });

export const getExchangeDetail = (vhost: string, name: string) =>
  defHttpWithTransform.get<any>({ url: Api.RABBITMQ + '/exchangeDetail', params: { vhost, name } });

export const deleteExchange = (vhost: string, name: string) =>
  defHttpWithTransform.get<any>({
    url: Api.RABBITMQ + '/delete/exchange',
    params: { vhost, name },
  });

export const getQueuePage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.RABBITMQ + '/queues', params });

export const getQueueDetail = (vhost: string, name: string) =>
  defHttpWithTransform.get<any>({ url: Api.RABBITMQ + '/queueDetail', params: { vhost, name } });

export const deleteQueue = (vhost: string, name: string) =>
  defHttpWithTransform.get<any>({
    url: Api.RABBITMQ + '/delete/queue',
    params: { vhost, name },
  });

export const purgeQueue = (vhost: string, name: string) =>
  defHttpWithTransform.get<any>({
    url: Api.RABBITMQ + '/purge/queue',
    params: { vhost, name },
  });
