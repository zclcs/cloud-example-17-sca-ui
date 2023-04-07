<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './bucket.data';
  import { createBucketApi, updateBucketApi } from '/@/api/cloud/bucket';

  export default defineComponent({
    name: 'BucketModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const bucketId = ref('');

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate, clearValidate }] =
        useForm({
          labelWidth: 100,
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

        if (unref(isUpdate)) {
          bucketId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
        clearValidate();

        updateSchema([
          {
            field: 'bucketName',
            show: !unref(isUpdate),
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增桶' : '编辑桶'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            values.id = bucketId.value;
            await updateBucketApi(values);
          } else {
            await createBucketApi(values);
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
