<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable } from '/@/components/Table';
  import { getServicePage } from '/@/api/cloud/nacos';

  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './table.data';

  export default defineComponent({
    name: 'NacosServicePage',
    components: { BasicTable, PageWrapper },
    setup() {
      const [registerTable] = useTable({
        title: 'nacos服务列表',
        api: getServicePage,
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
      };
    },
  });
</script>
