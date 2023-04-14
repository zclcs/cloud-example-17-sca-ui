<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看用户详情',
                onClick: handleView.bind(null, record),
                ifShow: hasPermission('redis:view'),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
                ifShow: hasPermission('redis:delete'),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <RedisDrawer @register="registerDrawer" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRedisPage, deleteRedisApi } from '/@/api/cloud/redis';

  import { PageWrapper } from '/@/components/Page';
  import RedisDrawer from './RedisDrawer.vue';

  import { columns, searchFormSchema } from '../redis/table.data';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useDrawer } from '/@/components/Drawer';

  export default defineComponent({
    name: 'Redis',
    components: { BasicTable, TableAction, PageWrapper, RedisDrawer },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: 'redis缓存监控',
        api: getRedisPage,
        rowKey: 'key',
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
          fixed: undefined,
          ifShow: hasPermission('redis:delete'),
        },
      });

      function handleView(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteRedisApi(record.key);
        reload();
      }

      return {
        registerTable,
        handleDelete,
        hasPermission,
        handleView,
        registerDrawer,
      };
    },
  });
</script>
