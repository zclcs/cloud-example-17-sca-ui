import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '状态',
    dataIndex: 'status',
    width: 40,
  },
  {
    title: '触发时间',
    dataIndex: 'actualTriggerTime',
    width: 60,
  },
  {
    title: '结束时间',
    dataIndex: 'finishedTime',
    width: 40,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '全部',
          value: '-1',
          key: '-1',
        },
        {
          label: '等待派发',
          value: 'WAITING_DISPATCH',
          key: 'WAITING_DISPATCH',
        },
        {
          label: '等待Worker接收',
          value: 'WAITING_WORKER_RECEIVE',
          key: 'WAITING_WORKER_RECEIVE',
        },
        {
          label: '运行中',
          value: 'RUNNING',
          key: 'RUNNING',
        },
        {
          label: '失败',
          value: 'FAILED',
          key: 'FAILED',
        },
        {
          label: '成功',
          value: 'SUCCEED',
          key: 'SUCCEED',
        },
        {
          label: '取消',
          value: 'CANCELED',
          key: 'CANCELED',
        },
        {
          label: '手动停止',
          value: 'STOPPED',
          key: 'STOPPED',
        },
      ],
    },
    colProps: { span: 6 },
    defaultValue: '-1',
  },
];

export const schema: FormSchema[] = [
  {
    field: 'logContent',
    label: '日志',
    slot: 'logContent',
    component: 'Input',
  },
];
