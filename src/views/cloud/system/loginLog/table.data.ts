import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDict } from '/@/api/cloud/dictCache';

export const columns: BasicColumn[] = [
  {
    title: '登录用户',
    dataIndex: 'username',
    width: 40,
    align: 'left',
  },
  {
    title: '操作系统',
    dataIndex: 'system',
    width: 80,
    align: 'left',
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    width: 30,
    align: 'left',
  },
  {
    title: '登录类型',
    dataIndex: 'loginTypeText',
    width: 30,
    align: 'left',
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    width: 60,
    align: 'left',
  },
  {
    title: '请求IP',
    dataIndex: 'ip',
    width: 40,
    align: 'left',
  },
  {
    title: 'IP对应地址',
    dataIndex: 'location',
    width: 80,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'ip',
    label: '请求IP',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'username',
    label: '登录用户',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'loginType',
    label: '登录类型',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dictName: 'system_login_log.type' },
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    colProps: { span: 6 },
  },
  {
    field: 'loginTime',
    label: '登录时间',
    component: 'RangePicker',
    componentProps: { style: { width: '100%' }, valueFormat: 'YYYY-MM-DD' },
    colProps: { span: 8 },
  },
];
