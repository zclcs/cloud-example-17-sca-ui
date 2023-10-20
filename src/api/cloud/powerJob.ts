import { ContentTypeEnum } from '/@/enums/httpEnum';
import { defHttpWithTransform } from '/@/utils/http/axios';

enum Api {
  POWER_JOB = '/maintenance/power/job',
}

export const findAppInfoList = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.POWER_JOB + '/app/info', params });

export const findJobInfoPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.POWER_JOB + '/job/info', params });

export const findInstancePage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.POWER_JOB + '/instance', params });

export const findLogPage = (appId: string, instanceId: string) =>
  defHttpWithTransform.get<any>({
    url: Api.POWER_JOB + '/log',
    params: { appId, instanceId },
  });

export const saveOrUpdateJobInfo = (params: any) =>
  defHttpWithTransform.post<any>({
    url: Api.POWER_JOB + '/job/info/saveOrUpdate',
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const jobRun = (appId: string, jobId: string, instanceParams: string) =>
  defHttpWithTransform.get<any>({
    url: Api.POWER_JOB + '/job/info/run',
    params: { appId, jobId, instanceParams },
  });
