import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '任务描述',
    dataIndex: 'jobDesc',
    width: 40,
    align: 'left',
  },
  {
    title: '调度类型',
    dataIndex: 'scheduleType',
    width: 40,
    align: 'left',
  },
  {
    title: '运行模式',
    dataIndex: 'glueType',
    width: 80,
    align: 'left',
  },
  {
    title: '负责人',
    dataIndex: 'author',
    width: 40,
    align: 'left',
  },
  {
    title: '任务状态',
    dataIndex: 'triggerStatus',
    width: 40,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'triggerStatus',
    label: '任务状态',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '全部',
          value: '-1',
          key: '-1',
        },
        {
          label: '运行',
          value: '1',
          key: '1',
        },
        {
          label: '停止',
          value: '0',
          key: '0',
        },
      ],
    },
    colProps: { span: 6 },
    defaultValue: '-1',
  },
  {
    field: 'jobDesc',
    label: '任务描述',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'executorHandler',
    label: '执行器',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'author',
    label: '负责人',
    component: 'Input',
    colProps: { span: 6 },
  },
];
