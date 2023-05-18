<template>
  <PageWrapper
    :title="`任务名：` + executorHandler + `，描述：` + jobDesc"
    contentBackground
    @back="goBack"
  >
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'taskId'">
          <a @click="handleTaskShow(record)">{{ record.jobId }}</a>
        </template>
        <template v-if="column.key === 'triggerResult'">
          <template v-if="record.triggerCode === 200">
            <Tag color="green"> 成功 </Tag>
          </template>
          <template v-if="record.triggerCode === 500">
            <Tag color="red"> 失败 </Tag>
          </template>
        </template>
        <template v-if="column.key === 'triggerRemark'">
          <a @click="handleRemarkShow(record)">查看</a>
        </template>
        <template v-if="column.key === 'handleResult'">
          <template v-if="record.handleCode === 200">
            <Tag color="green"> 成功 </Tag>
          </template>
          <template v-if="record.handleCode === 500">
            <Tag color="red"> 失败 </Tag>
          </template>
          <template v-if="record.handleCode === 502">
            <Tag color="red"> 失败(超时) </Tag>
          </template>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看日志',
                onClick: handleLogContentShow.bind(null, record),
                ifShow: hasPermission('jobLog:view') && record.triggerCode === 200,
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DetailModal @register="registerModal" />
  </PageWrapper>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { Tag } from 'ant-design-vue';
  import { getJobLogPage } from '/@/api/cloud/xxlJob';
  import { columns, searchFormSchema } from './log.data';
  import { usePermission } from '/@/hooks/web/usePermission';
  import DetailModal from './DetailModal.vue';

  export default defineComponent({
    name: 'XxlJobLog',
    components: {
      PageWrapper,
      BasicTable,
      Tag,
      DetailModal,
      TableAction,
    },
    setup() {
      const { hasPermission } = usePermission();
      const route = useRoute();
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      // 路由参数
      const jobId = ref(route.params?.jobId);
      const jobGroup = ref(route.params?.jobGroup);
      const executorHandler = ref(route.params?.executorHandler);
      const jobDesc = ref(route.params?.jobDesc);
      const [registerTable] = useTable({
        api: getJobLogPage,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        beforeFetch(info) {
          if (info.filterTimeDate) {
            const filterTimeDate = info.filterTimeDate;
            info.filterTimeFrom = filterTimeDate[0] + ' 00:00:00';
            info.filterTimeTo = filterTimeDate[1] + ' 23:59:59';
          }
          info.jobId = jobId.value;
          info.jobGroup = jobGroup.value;
        },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          ifShow: hasPermission('jobLog:view'),
        },
      });

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/monitor/xxlJob');
      }

      function handleTaskShow(record) {
        openModal(true, {
          record,
          type: 'task',
        });
      }

      function handleRemarkShow(record) {
        openModal(true, {
          record,
          type: 'remark',
        });
      }

      function handleLogContentShow(record) {
        openModal(true, {
          record,
          type: 'logContent',
        });
      }

      return {
        registerTable,
        goBack,
        executorHandler,
        jobDesc,
        hasPermission,
        handleTaskShow,
        registerModal,
        handleRemarkShow,
        handleLogContentShow,
      };
    },
  });
</script>

<style></style>
