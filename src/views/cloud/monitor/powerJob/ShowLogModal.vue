<template>
  <BasicModal v-bind="$attrs" @register="register" title="详情" :okButtonProps="{ disabled: true }">
    <BasicForm @register="registerForm">
      <template #logContent="{ model, field }">
        <h4 style="white-space: pre-line">{{ model[field] }}</h4>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schema } from './instance.data';
  import { findLogPage } from '/@/api/cloud/powerJob';
  export default defineComponent({
    name: 'ShowLogModal',
    components: { BasicModal, BasicForm },
    emits: ['register'],
    setup(_) {
      const readonly = ref(true);
      const dataModal = ref<Recordable>({});

      const [registerForm, { setFieldsValue, resetFields }] = useForm({
        baseColProps: { span: 36 },
        labelWidth: 100,
        schemas: schema,
        showActionButtonGroup: false,
      });

      const [register, { setModalProps }] = useModalInner(async (data) => {
        resetFields();

        setModalProps({ confirmLoading: false });
        const result = await findLogPage(data.appId, data.record.instanceId);

        setFieldsValue({
          logContent: result.data,
        });
      });

      return {
        register,
        dataModal,
        schema,
        readonly,
        registerForm,
      };
    },
  });
</script>
