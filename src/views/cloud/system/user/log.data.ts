import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '操作用户',
    dataIndex: 'username',
    ifShow: false,
  },
  {
    title: '操作内容',
    dataIndex: 'operation',
  },
  {
    title: '耗时',
    dataIndex: 'time',
    customRender: ({ record }) => {
      return record.time + '毫秒';
    },
  },
  {
    title: '操作方法',
    dataIndex: 'method',
  },
  {
    title: '方法参数',
    dataIndex: 'params',
  },
  {
    title: '操作者ip',
    dataIndex: 'ip',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
  },
  {
    title: '操作地点',
    dataIndex: 'location',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'createAtDate',
    label: '创建时间起',
    component: 'RangePicker',
    componentProps: {
      style: { width: '100%' },
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: { span: 6 },
  },
  {
    field: 'operation',
    label: '操作内容',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'location',
    label: '操作地点',
    component: 'Input',
    colProps: { span: 6 },
  },
];
