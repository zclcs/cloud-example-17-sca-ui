<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <BasicUpload
          :maxSize="20"
          :maxNumber="10"
          :uploadParams="{ bucketName: 'file' }"
          @change="handleChange"
          @delete="handleUploadDelete"
          @close="handleClose"
          :api="uploadApi"
        />
        <!-- <a-button type="primary" @click="handleCreate"> 新增文件 </a-button> -->
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
                ifShow: hasPermission('bucket:delete'),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicUpload } from '/@/components/Upload';
  import { FileItem } from '/@/components/Upload/src/typing';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getFilePage, deleteFileApi } from '/@/api/cloud/file';
  import { uploadApi } from '/@/api/sys/upload';

  import { useModal } from '/@/components/Modal';

  import { columns, searchFormSchema } from './file.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'File',
    components: { BasicTable, TableAction, BasicUpload },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: '文件管理',
        api: getFilePage,
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
          ifShow: hasPermission('file:delete'),
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteFileApi(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function handleChange() {
        reload();
      }

      function handleUploadDelete(record: FileItem) {
        deleteFileApi(record.responseData?.data.id);
      }

      function handleClose() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        hasPermission,
        uploadApi,
        handleChange,
        handleUploadDelete,
        handleClose,
      };
    },
  });
</script>
