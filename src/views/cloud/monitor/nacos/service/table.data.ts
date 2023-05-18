import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '服务名称',
    dataIndex: 'name',
    width: 80,
    align: 'left',
  },
  {
    title: '分组名称',
    dataIndex: 'groupName',
    width: 40,
    align: 'left',
  },
  {
    title: '集群数量',
    dataIndex: 'clusterCount',
    width: 40,
    align: 'left',
  },
  {
    title: '实例数',
    dataIndex: 'ipCount',
    width: 40,
    align: 'left',
  },
  {
    title: '健康实例数',
    dataIndex: 'healthyInstanceCount',
    width: 40,
    align: 'left',
  },
  {
    title: '触发保护阈值',
    dataIndex: 'triggerFlag',
    width: 40,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'serviceNameParam',
    label: '服务名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];
