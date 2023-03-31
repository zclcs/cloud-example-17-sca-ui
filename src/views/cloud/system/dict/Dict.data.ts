import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDict } from '/@/api/cloud/dictCache';
import { checkValue } from '/@/api/cloud/dict';

export const columns: BasicColumn[] = [
  {
    dataIndex: 'dictName',
    title: '字典唯一值',
    width: 100,
  },
  {
    title: '字典项唯一值',
    dataIndex: 'value',
    width: 60,
  },
  {
    title: '父级字典值',
    dataIndex: 'parentValue',
    width: 60,
  },
  {
    title: '标签',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '字典类型',
    dataIndex: 'typeText',
    width: 50,
  },
  {
    title: '是否系统字典',
    dataIndex: 'whetherSystemDictText',
    width: 50,
  },
  {
    title: '排序',
    dataIndex: 'sorted',
    width: 50,
  },
  {
    title: '是否禁用',
    dataIndex: 'isDisabledText',
    width: 50,
  },
  // {
  //   title: '描述',
  //   dataIndex: 'description',
  //   width: 180,
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'value',
    label: '字典项唯一值',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'title',
    label: '标签',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'parentValue',
    label: '上级字典唯一值',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '表id',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'dictName',
    label: '字典唯一值',
    component: 'Input',
    required: true,
  },
  {
    field: 'value',
    label: '字典项唯一值',
    component: 'Input',
    helpMessage: ['字典项唯一值不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { id, dictName } = values;
              if (!dictName) {
                return resolve();
              }
              if (!value) {
                return reject('字典项唯一值不能为空');
              }
              checkValue({ id: id, dictName: dictName, value: value })
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
    field: 'title',
    label: '标签',
    component: 'Input',
    required: true,
  },
  {
    field: 'type',
    label: '字典类型',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: getDict,
      params: { dictName: 'system_dict_item.type' },
      labelField: 'title',
      allowClear: false,
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    defaultValue: '0',
  },
  {
    field: 'parentValue',
    label: '上级字典',
    component: 'TreeSelect',
    componentProps: {
      search: true,
      fieldNames: {
        title: 'label',
        key: 'code',
        value: 'code',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
    ifShow: ({ values }) => values.type == 1,
  },
  {
    field: 'whetherSystemDict',
    label: '是否系统字典',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dictName: 'yes_no' },
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    defaultValue: '1',
  },
  {
    field: 'sorted',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 0,
  },
  {
    field: 'isDisabled',
    label: '是否禁用',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dictName: 'yes_no' },
      labelField: 'title',
      valueField: 'value',
      immediate: true,
      alwaysLoad: true,
    },
    defaultValue: '0',
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
  },
];
