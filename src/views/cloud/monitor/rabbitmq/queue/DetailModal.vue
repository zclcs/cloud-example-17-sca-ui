<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="详情"
    :okButtonProps="{ disabled: true }"
    :width="700"
  >
    <BasicForm @register="registerForm">
      <template #queueDetail="{ model, field }">
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
  import { getQueueDetail } from '/@/api/cloud/rabbitmq';
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
        if (unref(type) === 'queueDetail') {
          const result = await getQueueDetail(data.record.vhost, data.record.name);

          setFieldsValue({
            ...result,
          });
        } else {
          setFieldsValue({
            messagesReady: data.record.messagesReady,
            messagesUnacknowledged: data.record.messagesUnacknowledged,
            messages: data.record.messages,
            messageBytesReady: data.record.messageBytesReady,
            messageBytesUnacknowledged: data.record.messageBytesUnacknowledged,
            messageBytes: data.record.messageBytes,
          });
        }
        updateSchema([
          {
            field: 'queueDetail',
            show: unref(type) === 'queueDetail',
          },
          {
            field: 'messagesReady',
            show: unref(type) === 'messageStats',
          },
          {
            field: 'messagesUnacknowledged',
            show: unref(type) === 'messageStats',
          },
          {
            field: 'messages',
            show: unref(type) === 'messageStats',
          },
          {
            field: 'messageBytesReady',
            show: unref(type) === 'messageStats',
          },
          {
            field: 'messageBytesUnacknowledged',
            show: unref(type) === 'messageStats',
          },
          {
            field: 'messageBytes',
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
