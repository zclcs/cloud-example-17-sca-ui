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
                ifShow: hasPermission('routeLog:delete'),
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
  import { getRouteLogPage, deleteRouteLogApi } from '/@/api/cloud/routeLog';

  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './table.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'RouteLog',
    components: { BasicTable, TableAction, PageWrapper },
    setup() {
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: '网关日志',
        api: getRouteLogPage,
        rowKey: 'routeId',
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        beforeFetch(info) {
          if (info.createTime) {
            const createTime = info.createTime;
            info.createTime = undefined;
            info.createTimeFrom = createTime[0];
            info.createTimeTo = createTime[1];
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
          ifShow: hasPermission('routeLog:delete'),
        },
      });

      async function handleDelete(record: Recordable) {
        await deleteRouteLogApi(record.routeId);
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
