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
  import { formSchema } from './Dict.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { createDictApi, updateDictApi, tree } from '/@/api/cloud/dict';

  export default defineComponent({
    name: 'DictLevelDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const dictName = ref('');

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        dictName.value = data.dictName;

        setFieldsValue({ dictName: dictName.value, id: data.id });
        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await tree({ dictName: dictName.value });
        updateSchema({
          field: 'parentValue',
          componentProps: { treeData },
        });
        updateSchema({
          field: 'dictName',
          show: !unref(isUpdate),
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增字典' : '编辑字典'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (dictName.value) {
            values.dictName = dictName.value;
          }
          if (unref(isUpdate)) {
            values.id = rowId.value;
            await updateDictApi(values);
          } else {
            await createDictApi(values);
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
