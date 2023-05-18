<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="详情"
    :okButtonProps="{ disabled: true }"
    :width="700"
  >
    <BasicForm @register="registerForm">
      <template #exchangeDetail="{ model, field }">
        <CodeEditor v-model:value="model[field]" :mode="modeValue" :readonly="readonly" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schema } from './table.data';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';
  import { getExchangeDetail } from '/@/api/cloud/rabbitmq';
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
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: schema,
        showActionButtonGroup: false,
      });

      const [register, { setModalProps }] = useModalInner(async (data) => {
        type.value = data.type;
        setModalProps({ confirmLoading: false });
        if (unref(type) === 'exchangeDetail') {
          const result = await getExchangeDetail(data.record.vhost, data.record.name);

          setFieldsValue({
            ...result,
          });
        } else {
          setFieldsValue({
            publishIn: data.record.messageStats?.publishIn,
            publishInRate: data.record.messageStats?.publishInDetails?.rate,
            publishOut: data.record.messageStats?.publishOut,
            publishOutRate: data.record.messageStats?.publishOutDetails?.rate,
          });
        }
        updateSchema([
          {
            field: 'exchangeDetail',
            show: unref(type) === 'exchangeDetail',
          },
          {
            field: 'publishIn',
            show: unref(type) === 'messageStats',
          },
          {
            field: 'publishInRate',
            show: unref(type) === 'messageStats',
          },
          {
            field: 'publishOut',
            show: unref(type) === 'messageStats',
          },
          {
            field: 'publishOutRate',
            show: unref(type) === 'messageStats',
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
