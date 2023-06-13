import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'dataId',
    dataIndex: 'dataId',
    width: 40,
    align: 'left',
  },
  {
    title: '分组名称',
    dataIndex: 'group',
    width: 40,
    align: 'left',
  },
  {
    title: '配置内容',
    dataIndex: 'content',
    width: 300,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dataId',
    label: 'dataId',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '值',
    field: 'content',
    slot: 'content',
    component: 'Input',
  },
];
