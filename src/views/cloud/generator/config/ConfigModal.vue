<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './config.data';
  import { createGeneratorConfigApi, updateGeneratorConfigApi } from '/@/api/cloud/generatorConfig';

  export default defineComponent({
    name: 'ConfigModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const isCopy = ref(true);
      const id = ref('');

      const [registerForm, { setFieldsValue, resetFields, validate, clearValidate }] = useForm({
        labelWidth: 150,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        isCopy.value = !!data?.isCopy;
        if (unref(isUpdate) || unref(isCopy)) {
          if (unref(isCopy)) {
            data.record.id = undefined;
          } else {
            id.value = data.record.id;
          }
          setFieldsValue({
            ...data.record,
          });
        }
        clearValidate();
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增代码生成配置' : '编辑代码生成配置'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            values.id = id.value;
            await updateGeneratorConfigApi(values);
          } else {
            await createGeneratorConfigApi(values);
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
