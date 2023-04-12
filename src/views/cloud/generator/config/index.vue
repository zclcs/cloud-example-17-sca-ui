<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-if="hasPermission('generatorConfig:add')" type="primary" @click="handleCreate">
          新增代码生成配置
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
                ifShow: hasPermission('generatorConfig:update'),
              },
              {
                icon: 'ant-design:copy-filled',
                onClick: handleCopy.bind(null, record),
                ifShow: hasPermission('generatorConfig:add'),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
                ifShow: hasPermission('generatorConfig:delete'),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ConfigModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getGeneratorConfigPage, deleteGeneratorConfigApi } from '/@/api/cloud/generatorConfig';

  import { useModal } from '/@/components/Modal';
  import ConfigModal from './ConfigModal.vue';

  import { columns, searchFormSchema } from './config.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'GenConfig',
    components: { BasicTable, ConfigModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: '代码生成配置管理',
        api: getGeneratorConfigPage,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        handleSearchInfoFn(info) {
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
          ifShow:
            hasPermission('generatorConfig:update') ||
            hasPermission('generatorConfig:delete') ||
            hasPermission('generatorConfig:add'),
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
          isCopy: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          isCopy: false,
        });
      }

      function handleCopy(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: false,
          isCopy: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteGeneratorConfigApi(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleCopy,
        handleDelete,
        handleSuccess,
        hasPermission,
      };
    },
  });
</script>
