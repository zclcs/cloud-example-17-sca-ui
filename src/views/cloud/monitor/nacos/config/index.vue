<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
                ifShow: hasPermission('nacos:view'),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <NacosDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getConfigPage } from '/@/api/cloud/nacos';

  import { useDrawer } from '/@/components/Drawer';
  import NacosDrawer from './NacosDrawer.vue';

  import { columns, searchFormSchema } from './table.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'NacosConfigPage',
    components: { BasicTable, NacosDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: 'nacos配置列表',
        api: getConfigPage,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          ifShow: hasPermission('nacos:view'),
        },
      });

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        hasPermission,
        handleEdit,
        handleSuccess,
      };
    },
  });
</script>
