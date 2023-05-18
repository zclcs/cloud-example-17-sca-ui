import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '任务id',
    dataIndex: 'taskId',
    width: 40,
  },
  {
    title: '调度时间',
    dataIndex: 'triggerTime',
    width: 60,
  },
  {
    title: '调度结果',
    dataIndex: 'triggerResult',
    width: 40,
  },
  {
    title: '调度备注',
    dataIndex: 'triggerRemark',
    width: 40,
  },
  {
    title: '执行时间',
    dataIndex: 'handleTime',
    width: 60,
  },
  {
    title: '执行结果',
    dataIndex: 'handleResult',
    width: 40,
  },
  {
    title: '执行备注',
    dataIndex: 'handleMsg',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'logStatus',
    label: '日志状态',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '全部',
          value: '-1',
          key: '-1',
        },
        {
          label: '成功',
          value: '1',
          key: '1',
        },
        {
          label: '失败',
          value: '2',
          key: '2',
        },
        {
          label: '运行中',
          value: '3',
          key: '3',
        },
      ],
    },
    colProps: { span: 6 },
    defaultValue: '-1',
  },
  {
    field: 'filterTimeDate',
    label: '调度时间',
    component: 'RangePicker',
    componentProps: {
      style: { width: '100%' },
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: { span: 6 },
    helpMessage: '默认当天',
  },
];

export const schema: FormSchema[] = [
  {
    field: 'triggerMsg',
    label: '消息',
    slot: 'triggerMsg',
    component: 'Input',
  },
  {
    field: 'executorAddress',
    label: '地址',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'executorHandler',
    label: '任务',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'executorParam',
    label: '参数',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'logContent',
    label: '日志',
    slot: 'logContent',
    component: 'Input',
  },
];
