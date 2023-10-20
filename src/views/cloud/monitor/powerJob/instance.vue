<template>
  <PageWrapper
    :title="`任务名：` + jobName + `，描述：` + jobDescription"
    contentBackground
    @back="goBack"
  >
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <template v-if="record.status === 1">
            <Tag color="cyan"> 等待派发 </Tag>
          </template>
          <template v-if="record.status === 2">
            <Tag color="cyan"> 等待Worker接收 </Tag>
          </template>
          <template v-if="record.status === 3">
            <Tag color="green"> 运行中 </Tag>
          </template>
          <template v-if="record.status === 4">
            <Tag color="red"> 失败 </Tag>
          </template>
          <template v-if="record.status === 5">
            <Tag color="green"> 成功 </Tag>
          </template>
          <template v-if="record.status === 9">
            <Tag color="red"> 取消 </Tag>
          </template>
          <template v-if="record.status === 10">
            <Tag color="red"> 手动停止 </Tag>
          </template>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看日志',
                onClick: handleLogContentShow.bind(null, record),
                ifShow:
                  (hasPermission('powerJob:view') && record.status === 4) || record.status === 5,
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ShowLogModal @register="registerModal" />
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
  import { findInstancePage } from '/@/api/cloud/powerJob';
  import { columns, searchFormSchema } from './instance.data';
  import { usePermission } from '/@/hooks/web/usePermission';
  import ShowLogModal from './ShowLogModal.vue';

  export default defineComponent({
    name: 'PowerJobInstance',
    components: {
      PageWrapper,
      BasicTable,
      Tag,
      ShowLogModal,
      TableAction,
    },
    setup() {
      const { hasPermission } = usePermission();
      const route = useRoute();
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      // 路由参数
      const jobId = ref(route.params?.jobId);
      const appId = ref(route.params?.appId);
      const jobName = ref(route.params?.jobName);
      const jobDescription = ref(route.params?.jobDescription);
      const [registerTable] = useTable({
        api: findInstancePage,
        rowKey: 'instanceId',
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
          info.jobId = jobId.value;
          info.appId = appId.value;
        },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          ifShow: hasPermission('powerJob:view'),
        },
      });

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/monitor/powerJob');
      }

      function handleLogContentShow(record) {
        openModal(true, {
          record,
          appId: appId.value,
        });
      }

      return {
        registerTable,
        goBack,
        jobName,
        jobDescription,
        hasPermission,
        registerModal,
        handleLogContentShow,
      };
    },
  });
</script>

<style></style>
