import { checkBucketName } from '/@/api/cloud/bucket';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '桶名称',
    dataIndex: 'bucketName',
    width: 120,
  },
  {
    title: '桶权限',
    dataIndex: 'bucketPolicy',
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
    field: 'bucketName',
    label: '桶名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '桶编号',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'bucketName',
    label: '桶名称',
    component: 'Input',
    helpMessage: ['桶名称不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          trigger: 'change',
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { id } = values;
              if (!value) {
                return reject('桶名称不能为空');
              }
              checkBucketName({ bucketId: id, bucketName: value })
                .then(() => {
                  return resolve();
                })
                .catch((error) => {
                  return reject(error.data.msg || '验证失败');
                });
            });
          },
        },
      ];
    },
  },
  {
    field: 'bucketPolicy',
    label: '桶权限',
    component: 'Select',
    helpMessage: ['这里的权限指的是Anonymous(访客的权限)'],
    componentProps: {
      options: [
        {
          label: 'read-only',
          value: 'read-only',
          key: 'read-only',
        },
        {
          label: 'write-only',
          value: 'write-only',
          key: 'write-only',
        },
        {
          label: 'read-write',
          value: 'read-write',
          key: 'read-write',
        },
        {
          label: 'none',
          value: 'none',
          key: 'none',
        },
      ],
      default: 'none',
    },
  },
];
