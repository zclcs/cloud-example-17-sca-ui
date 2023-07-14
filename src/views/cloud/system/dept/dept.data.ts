import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDeptTree, checkDeptName, checkDeptCode } from '/@/api/cloud/system';

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'label',
    width: 160,
    align: 'left',
  },
  {
    title: '部门编码',
    dataIndex: 'code',
    width: 160,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: 50,
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   width: 80,
  //   customRender: ({ record }) => {
  //     const status = record.status;
  //     const enable = ~~status === 0;
  //     const color = enable ? 'green' : 'red';
  //     const text = enable ? '启用' : '停用';
  //     return h(Tag, { color: color }, () => text);
  //   },
  // },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: '0' },
  //       { label: '停用', value: '1' },
  //     ],
  //   },
  //   colProps: { span: 8 },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '部门编号',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'label',
    label: '部门名称',
    component: 'Input',
    helpMessage: ['部门名称不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { id } = values;
              if (!value) {
                return reject('部门名称不能为空');
              }
              checkDeptName({ deptId: id, deptName: value })
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
    field: 'code',
    label: '部门编码',
    component: 'Input',
    helpMessage: ['部门编码不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { id } = values;
              if (!value) {
                return reject('部门编码不能为空');
              }
              checkDeptCode({ deptId: id, deptCode: value })
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
    field: 'harPar',
    label: '是否顶级部门',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: '是', value: false },
          { label: '否', value: true },
        ],
        onChange(e: any) {
          if (e) {
            formModel.parentCode = '0';
          }
        },
      };
    },
    required: true,
  },
  {
    field: 'parentCode',
    label: '上级部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getDeptTree,
      fieldNames: {
        title: 'label',
        key: 'code',
        value: 'code',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
    ifShow: ({ values }) => values.harPar,
  },
  {
    field: 'orderNum',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'RadioButtonGroup',
  //   defaultValue: '0',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: '0' },
  //       { label: '停用', value: '1' },
  //     ],
  //   },
  //   required: true,
  // },
];
