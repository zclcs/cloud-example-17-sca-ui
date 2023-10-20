<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'scheduleInfo'">
          {{ record.timeExpressionType + ' ' + record.timeExpression }}
        </template>
        <template v-if="column.key === 'executeType'">
          <template v-if="record.executeType === 'STANDALONE'">
            <Tag color="green"> 单机执行 </Tag>
          </template>
          <template v-if="record.executeType === 'BROADCAST'">
            <Tag color="green"> 广播执行 </Tag>
          </template>
          <template v-if="record.executeType === 'MAP_REDUCE'">
            <Tag color="green"> mapReduce执行 </Tag>
          </template>
          <template v-if="record.executeType === 'MAP'">
            <Tag color="green"> map执行 </Tag>
          </template>
        </template>
        <template v-if="column.key === 'processorType'">
          <template v-if="record.processorType === 'BUILT_IN'">
            <Tag color="green"> 内建处理器 </Tag>
          </template>
          <template v-if="record.processorType === 'EXTERNAL'">
            <Tag color="green"> 外部处理器（动态加载） </Tag>
          </template>
        </template>
        <template v-if="column.key === 'enable'">
          <template v-if="record.enable === true">
            <Tag color="green"> 运行 </Tag>
          </template>
          <template v-if="record.enable === false">
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
                ifShow: hasPermission('powerJob:view'),
              },
              {
                icon: 'ant-design:caret-right-filled',
                color: 'success',
                popConfirm: {
                  title: '是否确认启动',
                  confirm: handleStart.bind(null, record),
                },
                ifShow: hasPermission('powerJob:view') && record.enable === false,
              },
              {
                icon: 'ant-design:poweroff-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认停止',
                  confirm: handleStop.bind(null, record),
                },
                ifShow: hasPermission('powerJob:view') && record.enable === true,
              },
              {
                icon: 'ant-design:field-time-outlined',
                tooltip: '运行',
                onClick: handleRun.bind(null, record),
                ifShow: hasPermission('powerJob:view') && record.enable === true,
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
  import { findJobInfoPage, saveOrUpdateJobInfo, jobRun } from '/@/api/cloud/powerJob';

  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './table.data';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { Tag } from 'ant-design-vue';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'PowerJobJobInfo',
    components: { BasicTable, PageWrapper, Tag, TableAction },
    setup() {
      const go = useGo();
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: 'powerJob任务管理',
        api: findJobInfoPage,
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
          ifShow: hasPermission('powerJob:view'),
        },
      });

      function handleView(record: Recordable) {
        go(
          '/monitor/powerJobInstance/' +
            record.id +
            '/' +
            record.appId +
            '/' +
            record.jobName +
            '/' +
            record.jobDescription,
        );
      }

      async function handleStart(record: Recordable) {
        record.enable = true;
        await saveOrUpdateJobInfo(record);
        reload();
      }

      async function handleStop(record: Recordable) {
        record.enable = false;
        await saveOrUpdateJobInfo(record);
        reload();
      }

      async function handleRun(record: Recordable) {
        await jobRun(record.appId, record.id, '');
        reload();
      }

      return {
        registerTable,
        hasPermission,
        handleView,
        handleStart,
        handleStop,
        handleRun,
      };
    },
  });
</script>
