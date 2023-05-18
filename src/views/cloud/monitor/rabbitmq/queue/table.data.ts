import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '队列名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '队列类型',
    dataIndex: 'type',
    width: 30,
  },
  {
    title: '特性',
    dataIndex: 'features',
    width: 50,
    helpMessage:
      'D 代表是否持久化 TTL 代表有最大超时时间 DLX 代表有死信队列 DLK 代表有死信队列路由key',
  },
  {
    title: '队列状态',
    dataIndex: 'state',
    width: 30,
  },
  {
    title: '准备中',
    dataIndex: 'messagesReady',
    width: 20,
  },
  {
    title: '未消费',
    dataIndex: 'messagesUnacknowledged',
    width: 20,
  },
  {
    title: '总数',
    dataIndex: 'messages',
    width: 15,
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
    label: '队列名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const schema: FormSchema[] = [
  {
    field: 'queueDetail',
    label: '绑定关系',
    slot: 'queueDetail',
    component: 'Input',
  },
  {
    field: 'messagesReady',
    label: '准备中',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'messagesUnacknowledged',
    label: '未消费',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'messages',
    label: '总数',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'messageBytesReady',
    label: '准备中消息',
    component: 'Input',
    dynamicDisabled: true,
    suffix: '字节',
  },
  {
    field: 'messageBytesUnacknowledged',
    label: '未消费消息',
    component: 'Input',
    dynamicDisabled: true,
    suffix: '字节',
  },
  {
    field: 'messageBytes',
    label: '消息',
    component: 'Input',
    dynamicDisabled: true,
    suffix: '字节',
  },
];
