<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="1200px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #content="{ model, field }">
        <CodeEditor v-model:value="model[field]" :mode="modeValue" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './table.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';

  import { getConfig, updateConfig } from '/@/api/cloud/nacos';

  export default defineComponent({
    name: 'NacosDrawer',
    components: { BasicDrawer, BasicForm, CodeEditor },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const dataId = ref('');
      const modeValue = ref<MODE>(MODE.JSON);

      const [registerForm, { resetFields, setFieldsValue, validate, clearValidate }] = useForm({
        baseColProps: { span: 36 },
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        dataId.value = data.record.dataId;
        const result = await getConfig(dataId.value);
        setFieldsValue({
          ...result,
        });
        clearValidate();
      });

      const getTitle = computed(() => 'nacos');

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          const result = await getConfig(dataId.value);
          result.dataId = dataId.value;
          result.content = values.content;
          await updateConfig(result);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        modeValue,
      };
    },
  });
</script>
