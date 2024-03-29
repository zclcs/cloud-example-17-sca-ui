<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
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
                ifShow: hasPermission('blockLog:delete'),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBlockLogPage, deleteBlockLogApi } from '/@/api/cloud/blockLog';

  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './table.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'BlockLog',
    components: { BasicTable, TableAction, PageWrapper },
    setup() {
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: '黑名单日志',
        api: getBlockLogPage,
        rowKey: 'blockId',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        beforeFetch(info) {
          if (info.requestTime) {
            const requestTime = info.requestTime;
            info.requestTime = undefined;
            info.requestTimeFrom = requestTime[0];
            info.requestTimeTo = requestTime[1];
          }
          return info;
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          fixed: undefined,
          ifShow: hasPermission('blockLog:delete'),
        },
      });

      async function handleDelete(record: Recordable) {
        await deleteBlockLogApi(record.routeId);
        reload();
      }

      return {
        registerTable,
        handleDelete,
        hasPermission,
      };
    },
  });
</script>
