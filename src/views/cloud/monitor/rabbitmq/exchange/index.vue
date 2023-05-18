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
            <template v-if="record.internal === 'true'">
              <Tag color="geekblue"> I </Tag>
            </template>
            <template v-if="record.autoDelete === 'true'">
              <Tag color="volcano"> AD </Tag>
            </template>
          </span>
        </template>
        <template v-if="column.key === 'publishIn'">
          {{ record.messageStats?.publishIn }}
        </template>
        <template v-if="column.key === 'publishOut'">
          {{ record.messageStats?.publishOut }}
        </template>
        <template v-if="column.key === 'messageStats'">
          <a @click="handleMessageStatsShow(record)">查看</a>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
                ifShow: hasPermission('rabbitmq:view') && record.name !== '(AMQP default)',
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
  import { getExchangePage, deleteExchange } from '/@/api/cloud/rabbitmq';

  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './table.data';
  import { useModal } from '/@/components/Modal';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { Tag } from 'ant-design-vue';
  import DetailModal from './DetailModal.vue';

  export default defineComponent({
    name: 'RabbitmqExchange',
    components: { BasicTable, PageWrapper, Tag, TableAction, DetailModal },
    setup() {
      const { hasPermission } = usePermission();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '交换机',
        api: getExchangePage,
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
          type: 'exchangeDetail',
        });
      }

      function handleMessageStatsShow(record: Recordable) {
        openModal(true, {
          record,
          type: 'messageStats',
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteExchange(record.vhost, record.name);
        reload();
      }

      return {
        registerTable,
        hasPermission,
        handleDelete,
        registerModal,
        handleNameShow,
        handleMessageStatsShow,
      };
    },
  });
</script>
