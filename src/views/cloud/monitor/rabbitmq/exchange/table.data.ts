import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '交换机名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '交换机类型',
    dataIndex: 'type',
    width: 30,
  },
  {
    title: '特性',
    dataIndex: 'features',
    width: 40,
    helpMessage: 'D 代表是否持久化 AD 代表是否自动删除 I 代表是否内部交换',
  },
  {
    dataIndex: 'publishIn',
    title: '入数量',
    width: 40,
  },
  {
    dataIndex: 'publishOut',
    title: '出数量',
    width: 40,
  },
  {
    title: '消息统计',
    dataIndex: 'messageStats',
    width: 40,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '交换机名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const schema: FormSchema[] = [
  {
    field: 'exchangeDetail',
    label: '绑定关系',
    slot: 'exchangeDetail',
    component: 'Input',
  },
  {
    field: 'publishIn',
    label: '入数量',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'publishInRate',
    label: '入百分比',
    component: 'Input',
    dynamicDisabled: true,
    suffix: '/s',
  },
  {
    field: 'publishOut',
    label: '出数量',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'publishOutRate',
    label: '出百分比',
    component: 'Input',
    dynamicDisabled: true,
    suffix: '/s',
  },
];
