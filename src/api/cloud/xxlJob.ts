import { defHttpWithTransform } from '/@/utils/http/axios';

enum Api {
  XXL_JOB = '/system/xxl/job',
}

export const getJobInfoPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.XXL_JOB + '/jobInfos', params });

export const getJobLogPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.XXL_JOB + '/jobLogs', params });

export const getJobLogDetail = (logId: string) =>
  defHttpWithTransform.get<any>({ url: Api.XXL_JOB + '/jobLogDetail', params: { logId } });

export const startJob = (id: string) =>
  defHttpWithTransform.get<any>({ url: Api.XXL_JOB + '/jobInfo/start', params: { id } });

export const stopJob = (id: string) =>
  defHttpWithTransform.get<any>({ url: Api.XXL_JOB + '/jobInfo/stop', params: { id } });
