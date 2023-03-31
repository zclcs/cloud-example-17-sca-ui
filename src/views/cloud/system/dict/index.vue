<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <DictNameTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button v-if="hasPermission('dictItem:add')" type="primary" @click="handleCreate">
          新增字典
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
                ifShow: hasPermission('dictItem:update'),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
                ifShow: hasPermission('dictItem:delete'),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DictDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { page, deleteDictApi } from '/@/api/cloud/dict';
  import { PageWrapper } from '/@/components/Page';
  import DictNameTree from './DictNameTree.vue';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDrawer } from '/@/components/Drawer';
  import DictDrawer from './DictDrawer.vue';

  import { columns, searchFormSchema } from './Dict.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'Dict',
    components: { BasicTable, PageWrapper, DictNameTree, DictDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { notification } = useMessage();
      const searchInfo = reactive<Recordable>({});
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: '字典列表',
        api: page,
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
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          fixed: undefined,
          ifShow: hasPermission('dictItem:update') || hasPermission('dictItem:delete'),
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
          dictName: searchInfo.dictName,
        });
      }

      function handleEdit(record: Recordable) {
        const isSelect = handleDataChange();
        if (isSelect) {
          openDrawer(true, {
            record,
            isUpdate: true,
            dictName: searchInfo.dictName,
          });
        }
      }

      async function handleDelete(record: Recordable) {
        await deleteDictApi(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function handleSelect(dictName = '') {
        searchInfo.dictName = dictName;
        reload();
      }

      function handleDataChange() {
        if (searchInfo.dictName === '' || searchInfo.dictName === undefined) {
          notification.success({
            message: '请在左侧选择字典表名后操作',
            duration: 3,
          });
          return false;
        }
        return true;
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        hasPermission,
        searchInfo,
        handleSelect,
      };
    },
  });
</script>
