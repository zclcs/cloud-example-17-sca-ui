<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <CodeEditor v-model:value="model[field]" :mode="modeValue" :readonly="readonly" />
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

  import { getRedis } from '/@/api/cloud/redis';

  export default defineComponent({
    name: 'RedisDrawer',
    components: { BasicDrawer, BasicForm, CodeEditor },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const key = ref('');
      const readonly = ref(true);
      const modeValue = ref<MODE>(MODE.JSON);

      const [registerForm, { resetFields, setFieldsValue, clearValidate }] = useForm({
        baseColProps: { span: 36 },
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        key.value = data.record.key;
        const result = await getRedis(key.value);
        setFieldsValue({
          ...result,
        });
        clearValidate();
      });

      const getTitle = computed(() => 'redis');

      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });
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
        readonly,
      };
    },
  });
</script>
