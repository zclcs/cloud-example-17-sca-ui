import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { checkRoleName, checkRoleCode } from '/@/api/cloud/system';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleId',
    label: '角色编号',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    helpMessage: ['角色名不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { roleId } = values;
              if (!value) {
                return reject('角色名不能为空');
              }
              checkRoleName({ roleId: roleId, roleName: value })
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
    field: 'roleCode',
    label: '角色编码',
    component: 'Input',
    helpMessage: ['角色编码不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { roleId } = values;
              if (!value) {
                return reject('角色编码不能为空');
              }
              checkRoleCode({ roleId: roleId, roleCode: value })
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
    label: '',
    field: 'menuIds',
    slot: 'menu',
    component: 'Input',
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
