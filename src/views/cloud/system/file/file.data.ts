import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '文件名称',
    dataIndex: 'fileName',
    width: 120,
  },
  {
    title: '原文件名称',
    dataIndex: 'originalFileName',
    width: 120,
  },
  {
    title: '桶名称',
    dataIndex: 'bucketName',
    width: 120,
  },
  {
    title: '文件路径',
    dataIndex: 'filePath',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'originalFileName',
    label: '原文件名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];
