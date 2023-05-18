<template>
  <BasicModal v-bind="$attrs" @register="register" title="详情" :okButtonProps="{ disabled: true }">
    <BasicForm @register="registerForm">
      <template #triggerMsg="{ model, field }">
        <CodeEditor v-model:value="model[field]" :mode="modeValue" :readonly="readonly" />
      </template>
      <template #logContent="{ model, field }">
        <CodeEditor v-model:value="model[field]" :mode="modeValue" :readonly="readonly" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schema } from './log.data';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';
  import { getJobLogDetail } from '/@/api/cloud/xxlJob';
  export default defineComponent({
    name: 'DetailModal',
    components: { BasicModal, CodeEditor, BasicForm },
    emits: ['register'],
    setup(_) {
      const readonly = ref(true);
      const type = ref('');
      const modeValue = ref<MODE>(MODE.JSON);
      const dataModal = ref<Recordable>({});

      const [registerForm, { setFieldsValue, updateSchema }] = useForm({
        baseColProps: { span: 24 },
        labelWidth: 80,
        schemas: schema,
        showActionButtonGroup: false,
      });

      const [register, { setModalProps }] = useModalInner(async (data) => {
        type.value = data.type;
        setModalProps({ confirmLoading: false });
        if (unref(type) === 'logContent') {
          const result = await getJobLogDetail(data.record.id);

          setFieldsValue({
            ...result,
          });
        } else {
          setFieldsValue({
            ...data.record,
          });
        }
        updateSchema([
          {
            field: 'triggerMsg',
            show: unref(type) === 'remark',
          },
          {
            field: 'executorAddress',
            show: unref(type) === 'task',
          },
          {
            field: 'executorHandler',
            show: unref(type) === 'task',
          },
          {
            field: 'executorParam',
            show: unref(type) === 'task',
          },
          {
            field: 'logContent',
            show: unref(type) === 'logContent',
          },
        ]);
      });

      return {
        register,
        dataModal,
        schema,
        modeValue,
        readonly,
        registerForm,
      };
    },
  });
</script>
