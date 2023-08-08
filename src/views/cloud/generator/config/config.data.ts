import { checkServerName } from '/@/api/cloud/generatorConfig';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '服务名称',
    dataIndex: 'serverName',
    width: 120,
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: 200,
  },
  {
    title: '是否去除前缀',
    dataIndex: 'isTrimText',
    width: 200,
  },
  {
    title: '前缀内容',
    dataIndex: 'trimValue',
    width: 200,
  },
  {
    title: '需要排除的字段',
    dataIndex: 'excludeColumns',
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
    field: 'serverName',
    label: '服务名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

const isYes = (type: string) => type === '1';

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '主键',
    component: 'Input',
    show: false,
  },
  {
    field: 'serverName',
    label: '服务名',
    component: 'Input',
    helpMessage: ['服务名不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          trigger: 'change',
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { id } = values;
              if (!value) {
                return reject('服务名不能为空');
              }
              checkServerName({ id: id, serverName: value })
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
    field: 'author',
    label: '作者',
    component: 'Input',
    required: true,
  },
  {
    field: 'basePackage',
    label: '基础包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'entityPackage',
    label: 'entity包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'aoPackage',
    label: '入参包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'voPackage',
    label: '出参包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'mapperPackage',
    label: 'mapper包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'mapperXmlPackage',
    label: 'mapper xml包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'servicePackage',
    label: 'service包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'serviceImplPackage',
    label: 'serviceImpl包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'controllerPackage',
    label: 'controller包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'isTrim',
    label: '是否去除前缀',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: () => {
      return {
        options: [
          { label: '否', value: '0' },
          { label: '是', value: '1' },
        ],
      };
    },
  },
  {
    field: 'trimValue',
    label: '前缀内容',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isYes(values.isTrim),
  },
  {
    field: 'excludeColumns',
    label: '需要排除的字段',
    helpMessage: ['多个逗号分隔'],
    component: 'Input',
    required: true,
  },
];
