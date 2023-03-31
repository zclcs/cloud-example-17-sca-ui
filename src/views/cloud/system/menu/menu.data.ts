import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { getMenuTree, checkMenuCode } from '/@/api/cloud/system';
import { getDict } from '/@/api/cloud/dictCache';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'label',
    width: 200,
    align: 'left',
  },
  {
    title: '菜单编码',
    dataIndex: 'code',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    width: 180,
  },
  {
    title: '菜单类型',
    dataIndex: 'typeText',
    width: 80,
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '路由地址',
    dataIndex: 'path',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: 50,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

const isMenu = (type: string) => type === '0';
const isButton = (type: string) => type === '1';
const isDir = (type: string) => type === '2';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
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
    label: '菜单编号',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'type',
    label: '菜单类型',
    component: 'ApiSelect',
    defaultValue: '0',
    componentProps: {
      api: getDict,
      params: { dictName: 'system_menu.type' },
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'code',
    label: '菜单编码',
    component: 'Input',
    helpMessage: ['菜单编码不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              console.log(values);
              const { id } = values;
              if (!value) {
                return reject('菜单编码不能为空');
              }
              checkMenuCode({ menuId: id, menuCode: value })
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
    field: 'label',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'keepAliveName',
    label: '页面缓存名称',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'parentCode',
    label: '上级菜单',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getMenuTree,
      fieldNames: {
        title: 'label',
        key: 'code',
        value: 'code',
      },
      immediate: true,
      alwaysLoad: true,
      getPopupContainer: () => document.body,
    },
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'orderNum',
    label: '排序',
    component: 'InputNumber',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'redirect',
    label: '重定向的子菜单',
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'perms',
    label: '权限标识',
    component: 'Input',
    required: ({ values }) => isButton(values.type),
    ifShow: ({ values }) => !isDir(values.type),
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'RadioButtonGroup',
  //   defaultValue: '0',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: '0' },
  //       { label: '禁用', value: '1' },
  //     ],
  //   },
  // },
  // {
  //   field: 'isExt',
  //   label: '是否外链',
  //   component: 'RadioButtonGroup',
  //   defaultValue: '0',
  //   componentProps: {
  //     options: [
  //       { label: '否', value: '0' },
  //       { label: '是', value: '1' },
  //     ],
  //   },
  //   ifShow: ({ values }) => !isButton(values.type),
  // },
  {
    field: 'hideMenu',
    label: '是否隐藏菜单',
    defaultValue: '0',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dictName: 'yes_no' },
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'ignoreKeepAlive',
    label: '是否忽略缓存',
    defaultValue: '0',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dictName: 'yes_no' },
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'hideBreadcrumb',
    label: '是否隐藏面包屑显示',
    defaultValue: '0',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dictName: 'yes_no' },
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'hideChildrenInMenu',
    label: '是否隐藏所有子菜单',
    defaultValue: '0',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dictName: 'yes_no' },
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'currentActiveMenu',
    label: '当前激活的菜单',
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.type),
  },
];
