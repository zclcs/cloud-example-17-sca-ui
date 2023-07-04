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
                ifShow: hasPermission('loginLog:delete'),
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
  import { getLoginLogPage, deleteLoginLogApi } from '/@/api/cloud/loginLog';

  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './table.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'LoginLog',
    components: { BasicTable, TableAction, PageWrapper },
    setup() {
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: '系统登录日志',
        api: getLoginLogPage,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        beforeFetch(info) {
          if (info.loginTime) {
            const loginTime = info.loginTime;
            info.loginTime = undefined;
            info.loginTimeFrom = loginTime[0];
            info.loginTimeTo = loginTime[1];
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
        await deleteLoginLogApi(record.id);
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
