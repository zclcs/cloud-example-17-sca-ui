<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a @click="handleNameShow(record)">{{ record.name }}</a>
        </template>
        <template v-if="column.key === 'features'">
          <span>
            <template v-if="record.durable === 'true'">
              <Tag color="green"> D </Tag>
            </template>
            <template v-if="record.arguments.XMessageTtl">
              <Tag color="volcano"> TTL </Tag>
            </template>
            <template v-if="record.arguments.XDeadLetterExchange">
              <Tag color="geekblue"> DLX </Tag>
            </template>
            <template v-if="record.arguments.XDeadLetterRoutingKey">
              <Tag color="blue"> DLK </Tag>
            </template>
          </span>
        </template>
        <template v-if="column.key === 'state'">
          <Tag color="green"> {{ record.state }} </Tag>
        </template>
        <template v-if="column.key === 'messageStats'">
          <a @click="handleMessageStatsShow(record)">查看</a>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:bg-colors-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认清空',
                  confirm: handlePurge.bind(null, record),
                },
                ifShow: hasPermission('rabbitmq:view'),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
                ifShow: hasPermission('rabbitmq:view'),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DetailModal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getQueuePage, deleteQueue, purgeQueue } from '/@/api/cloud/rabbitmq';

  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './table.data';
  import { useModal } from '/@/components/Modal';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { Tag } from 'ant-design-vue';
  import DetailModal from './DetailModal.vue';

  export default defineComponent({
    name: 'RabbitmqQueue',
    components: { BasicTable, PageWrapper, Tag, TableAction, DetailModal },
    setup() {
      const { hasPermission } = usePermission();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '队列',
        api: getQueuePage,
        rowKey: 'name',
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 40,
          title: '操作',
          dataIndex: 'action',
          ifShow: hasPermission('rabbitmq:view'),
        },
      });

      function handleNameShow(record: Recordable) {
        openModal(true, {
          record,
          type: 'queueDetail',
        });
      }

      function handleMessageStatsShow(record: Recordable) {
        openModal(true, {
          record,
          type: 'messageStats',
        });
      }

      async function handlePurge(record: Recordable) {
        await purgeQueue(record.vhost, record.name);
        reload();
      }

      async function handleDelete(record: Recordable) {
        await deleteQueue(record.vhost, record.name);
        reload();
      }

      return {
        registerTable,
        hasPermission,
        handleDelete,
        registerModal,
        handleNameShow,
        handleMessageStatsShow,
        handlePurge,
      };
    },
  });
</script>
