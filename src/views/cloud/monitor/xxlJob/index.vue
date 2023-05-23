<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'scheduleType'">
          {{ record.scheduleType + '：' + record.scheduleConf }}
        </template>
        <template v-if="column.key === 'glueType'">
          {{ record.glueType + '：' + record.executorHandler }}
        </template>
        <template v-if="column.key === 'triggerStatus'">
          <template v-if="record.triggerStatus === 1">
            <Tag color="green"> 运行 </Tag>
          </template>
          <template v-if="record.triggerStatus === 0">
            <Tag color="red"> 停止 </Tag>
          </template>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看任务日志',
                onClick: handleView.bind(null, record),
                ifShow: hasPermission('jobLog:view'),
              },
              {
                icon: 'ant-design:caret-right-filled',
                color: 'error',
                popConfirm: {
                  title: '是否确认启动',
                  confirm: handleStart.bind(null, record),
                },
                ifShow: hasPermission('jobLog:view') && record.triggerStatus === 0,
              },
              {
                icon: 'ant-design:poweroff-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认停止',
                  confirm: handleStop.bind(null, record),
                },
                ifShow: hasPermission('jobLog:view') && record.triggerStatus === 1,
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
  import { getJobInfoPage, startJob, stopJob } from '/@/api/cloud/xxlJob';

  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './table.data';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { Tag } from 'ant-design-vue';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'XxlJobJobInfo',
    components: { BasicTable, PageWrapper, Tag, TableAction },
    setup() {
      const go = useGo();
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: 'xxlJob任务管理',
        api: getJobInfoPage,
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
        actionColumn: {
          width: 40,
          title: '操作',
          dataIndex: 'action',
          ifShow: hasPermission('jobLog:view'),
        },
      });

      function handleView(record: Recordable) {
        go(
          '/monitor/jobLog/' +
            record.id +
            '/' +
            record.jobGroup +
            '/' +
            record.executorHandler +
            '/' +
            record.jobDesc,
        );
      }

      async function handleStart(record: Recordable) {
        await startJob(record.id);
        reload();
      }

      async function handleStop(record: Recordable) {
        await stopJob(record.id);
        reload();
      }

      return {
        registerTable,
        hasPermission,
        handleView,
        handleStart,
        handleStop,
      };
    },
  });
</script>
