<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable } from '/@/components/Table';
  import { getConfigPage } from '/@/api/cloud/nacos';

  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './table.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'NacosConfigPage',
    components: { BasicTable, PageWrapper },
    setup() {
      const { hasPermission } = usePermission();
      const [registerTable] = useTable({
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
      });

      return {
        registerTable,
        hasPermission,
      };
    },
  });
</script>
