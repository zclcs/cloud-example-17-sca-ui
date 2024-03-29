<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './dept.data';

  import { getDeptTree } from '/@/api/cloud/system';
  import { createDeptApi, updateDeptApi } from '/@/api/cloud/dept';
  export default defineComponent({
    name: 'DeptModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate, clearValidate }] =
        useForm({
          baseColProps: { span: 24 },
          labelWidth: 100,
          schemas: formSchema,
          showActionButtonGroup: false,
        });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          data.record.createAt = data.record.extra.createAt;
          data.record.orderNum = data.record.extra.orderNum;
          data.record.harPar = data.record.extra.harPar;
          data.record.deptName = data.record.extra.deptName;
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getDeptTree();
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

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          values.deptName = values.label;
          values.deptCode = values.code;
          values.label = undefined;
          if (unref(isUpdate)) {
            values.deptId = rowId.value;
            await updateDeptApi(values);
          } else {
            await createDeptApi(values);
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
