<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getMenuTree } from '/@/api/cloud/system';
  import { createMenuApi, updateMenuApi } from '/@/api/cloud/menu';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate, clearValidate }] =
        useForm({
          baseColProps: { lg: 12, md: 24 },
          labelWidth: 150,
          schemas: formSchema,
          showActionButtonGroup: false,
        });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          data.record.keepAliveName = data.record.extra.keepAliveName;
          data.record.path = data.record.extra.path;
          data.record.component = data.record.extra.component;
          data.record.redirect = data.record.extra.redirect;
          data.record.perms = data.record.extra.perms;
          data.record.icon = data.record.extra.icon;
          data.record.type = data.record.extra.type;
          data.record.hideMenu = data.record.extra.hideMenu;
          data.record.ignoreKeepAlive = data.record.extra.ignoreKeepAlive;
          data.record.hideBreadcrumb = data.record.extra.hideBreadcrumb;
          data.record.hideChildrenInMenu = data.record.extra.hideChildrenInMenu;
          data.record.currentActiveMenu = data.record.extra.currentActiveMenu;
          data.record.createAt = data.record.extra.createAt;
          data.record.orderNum = data.record.extra.orderNum;
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getMenuTree();
        updateSchema({
          field: 'parentId',
          componentProps: { treeData },
        });
        updateSchema({
          field: 'code',
          show: !unref(isUpdate),
        });
        clearValidate();
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          values.menuName = values.label;
          values.label = undefined;
          values.menuCode = values.code;
          values.code = undefined;
          if (values.parentCode === undefined) {
            values.parentCode = '0';
          }
          if (unref(isUpdate)) {
            values.menuId = rowId.value;
            await updateMenuApi(values);
          } else {
            await createMenuApi(values);
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
