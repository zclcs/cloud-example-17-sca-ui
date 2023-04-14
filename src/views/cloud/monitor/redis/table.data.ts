import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'redisKey',
    dataIndex: 'key',
    width: 200,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'key',
    label: 'redisKey',
    component: 'Input',
    colProps: { span: 6 },
    helpMessage: '模糊匹配用：*',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'key',
    label: 'redisKey',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '值',
    field: 'value',
    slot: 'menu',
    component: 'Input',
  },
  {
    label: '过期时间（秒）',
    field: 'ttl',
    component: 'Input',
    dynamicDisabled: true,
  },
];
