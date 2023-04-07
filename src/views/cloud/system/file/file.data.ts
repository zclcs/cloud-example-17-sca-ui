import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { uploadApi } from '/@/api/sys/upload';
import { getBucketList } from '/@/api/cloud/bucket';

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

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '文件编号',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'bucketId',
    label: '桶',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getBucketList,
      labelField: 'bucketName',
      valueField: 'id',
      immediate: true,
      alwaysLoad: true,
    },
  },
  {
    field: 'file',
    component: 'Upload',
    label: '文件',
    colProps: {
      span: 8,
    },
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi,
    },
  },
];
