import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDatasource } from '/@/api/cloud/gen';
import { getDict } from '/@/api/cloud/dictCache';
import { getMenuTree } from '/@/api/cloud/system';
import { getGeneratorConfigList } from '/@/api/cloud/generatorConfig';

export const columns: BasicColumn[] = [
  {
    title: '表名',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '表字符集',
    dataIndex: 'tableCollation',
  },
  {
    title: '数据量（行）',
    dataIndex: 'dataRows',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    width: 180,
  },
  {
    title: '修改时间',
    dataIndex: 'updateAt',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '表名',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '库名',
    field: 'datasource',
    component: 'ApiSelect',
    componentProps: {
      api: getDatasource,
      labelField: 'value',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    required: true,
    colProps: { span: 8 },
  },
];

const isYes = (type: string) => type === '1';

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '表名',
    component: 'Input',
    required: true,
    dynamicDisabled: true,
  },
  {
    field: 'datasource',
    label: '库名',
    component: 'Input',
    required: true,
    dynamicDisabled: true,
  },
  {
    label: '配置',
    field: 'generatorConfigId',
    component: 'ApiSelect',
    componentProps: {
      api: getGeneratorConfigList,
      labelField: 'serverName',
      valueField: 'id',
      immediate: true,
      alwaysLoad: true,
    },
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '是否创建菜单',
    field: 'isCreateMenu',
    component: 'ApiRadioGroup',
    componentProps: {
      api: getDict,
      params: { dictName: 'yes_no' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    defaultValue: '0',
  },
  {
    field: 'menuId',
    label: '上级菜单',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getMenuTree,
      params: { types: '0,2' },
      fieldNames: {
        title: 'label',
        key: 'code',
        value: 'code',
      },
      immediate: true,
      alwaysLoad: true,
      getPopupContainer: () => document.body,
    },
    required: true,
    ifShow: ({ values }) => isYes(values.isCreateMenu) && !isYes(values.isCreateDir),
  },
  {
    label: '菜单名称',
    helpMessage: '不填默认表注释',
    field: 'menuName',
    component: 'Input',
    ifShow: ({ values }) => isYes(values.isCreateMenu) || isYes(values.isCreateDir),
  },
  {
    label: '菜单路径',
    helpMessage: '不填默认类名',
    field: 'menuPath',
    component: 'Input',
    ifShow: ({ values }) => isYes(values.isCreateMenu) || isYes(values.isCreateDir),
  },
  {
    label: '路由组件',
    field: 'menuComponent',
    component: 'Input',
    ifShow: ({ values }) => isYes(values.isCreateMenu) || isYes(values.isCreateDir),
  },
  {
    label: '是否创建目录',
    field: 'isCreateDir',
    component: 'ApiRadioGroup',
    componentProps: {
      api: getDict,
      params: { dictName: 'yes_no' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    defaultValue: '0',
  },
  {
    label: '目录名称',
    field: 'dirName',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isYes(values.isCreateDir),
  },
  {
    label: '目录路径',
    field: 'dirPath',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isYes(values.isCreateDir),
  },
];
