import { findAppInfoList } from '/@/api/cloud/powerJob';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '任务名称',
    dataIndex: 'jobName',
    width: 120,
    align: 'left',
  },
  {
    title: '定时信息',
    dataIndex: 'scheduleInfo',
    width: 60,
    align: 'left',
  },
  {
    title: '执行类型',
    dataIndex: 'executeType',
    width: 40,
    align: 'left',
  },
  {
    title: '处理器类型',
    dataIndex: 'processorType',
    width: 40,
    align: 'left',
  },
  {
    title: '任务状态',
    dataIndex: 'enable',
    width: 40,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '应用',
    field: 'appId',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: findAppInfoList,
      labelField: 'appName',
      valueField: 'id',
      immediate: true,
      alwaysLoad: true,
    },
    defaultValue: '1',
    required: true,
  },
  {
    field: 'keyword',
    label: '任务名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];
