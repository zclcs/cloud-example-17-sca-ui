import {
  getRoleOptions,
  checkUsername,
  checkUserMobile,
  getDeptTree,
  getDeptOptions,
} from '/@/api/cloud/system';
import { checkUserPasswordApi } from '/@/api/cloud/user';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDict } from '/@/api/cloud/dictCache';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '角色',
    dataIndex: 'roleNameString',
    width: 200,
  },
  {
    title: '用户状态',
    dataIndex: 'statusText',
    width: 80,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'userId',
    label: '用户编号',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    helpMessage: ['用户名不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          trigger: 'change',
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { userId } = values;
              if (!value) {
                return reject('用户名不能为空');
              }
              checkUsername({ userId: userId, username: value })
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
    field: 'realName',
    label: '用户昵称',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    ifShow: false,
  },
  {
    label: '角色',
    field: 'roleIds',
    component: 'ApiSelect',
    componentProps: {
      api: getRoleOptions,
      mode: 'multiple',
      labelField: 'roleName',
      valueField: 'roleId',
      immediate: true,
      alwaysLoad: true,
    },
    required: true,
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getDeptTree,
      fieldNames: {
        title: 'label',
        key: 'id',
        value: 'id',
      },
      immediate: true,
      alwaysLoad: true,
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    label: '数据权限',
    field: 'deptIds',
    component: 'ApiSelect',
    componentProps: {
      api: getDeptOptions,
      mode: 'multiple',
      labelField: 'deptName',
      valueField: 'deptId',
      immediate: true,
      alwaysLoad: true,
    },
    required: true,
  },
  {
    label: '状态',
    field: 'status',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dictName: 'system_user.status' },
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    defaultValue: '1',
  },
  {
    field: 'mobile',
    label: '手机号',
    component: 'Input',
    helpMessage: ['手机号不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: false,
          trigger: 'change',
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { userId } = values;
              if (!value) {
                return resolve();
              }
              checkUserMobile({ userId: userId, mobile: value })
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
    label: '邮箱',
    field: 'email',
    component: 'Input',
  },
  {
    label: '描述',
    field: 'description',
    component: 'InputTextArea',
  },
];

export const accountPasswordFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'password',
    label: '原密码',
    component: 'InputPassword',
    helpMessage: ['输入原密码'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { username } = values;
              if (!username) {
                return resolve();
              }
              if (!value) {
                return reject('原密码不能为空');
              }
              checkUserPasswordApi(username, value)
                .then((res) => {
                  if (!res) {
                    return reject('原密码错误');
                  } else {
                    return resolve();
                  }
                })
                .catch((error) => {
                  return reject(error.msg || '验证失败');
                });
            });
          },
        },
      ];
    },
  },
  {
    field: 'newPassword',
    label: '新密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'rePassword',
    label: '确认密码',
    component: 'InputPassword',
    helpMessage: ['二次输入新密码'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { newPassword } = values;
              if (!newPassword) {
                return resolve();
              }
              if (!value) {
                return reject('确认密码不能为空');
              }
              if (value === newPassword) {
                return resolve();
              } else {
                return reject('请确认两次密码输入是否一致');
              }
            });
          },
        },
      ];
    },
  },
];
