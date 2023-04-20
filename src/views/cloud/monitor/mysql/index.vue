<template>
  <div class="p-4">
    <a-button type="primary" class="ml-2" :loading="runLoading" @click="onRunCode"> 运行 </a-button>
    <a-button type="primary" class="ml-2" :loading="stopLoading" @click="onStopRun">
      停止
    </a-button>
  </div>
  <div class="p-4">
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      @change="onChange"
      @ready="onReady"
      @focus="onFocus"
    />
  </div>
  <div class="p-4">
    <BasicTable
      title="返回数据"
      titleHelpMessage="仅仅用作开发排查问题，不要查询过多的数据"
      :columns="columns"
      :dataSource="data"
      ref="tableRef"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import Codemirror from 'codemirror-editor-vue3';

  import { getSchema, select } from '/@/api/cloud/dataBase';
  import { BasicTable } from '/@/components/Table';

  // @types/codemirror
  import type { Doc, Editor, EditorChange, EditorConfiguration } from 'codemirror';
  import { BasicColumn, TableActionType } from '/@/components/Table/src/types/table';

  // language
  import 'codemirror/mode/sql/sql.js';

  // 引入代码自动提示插件
  import 'codemirror/addon/hint/show-hint.css';
  import 'codemirror/addon/hint/sql-hint';
  import 'codemirror/addon/hint/show-hint';

  export default defineComponent({
    name: 'Mysql',
    components: {
      Codemirror,
      BasicTable,
    },
    setup() {
      const cminstance = ref<Editor>();
      const tableRef = ref<Nullable<TableActionType>>(null);
      const code = ref(`select now() from dual`);
      const data = ref<Recordable[]>([]);
      const columns = ref<BasicColumn[]>([]);
      const runLoading = ref(false);
      const stopLoading = ref(false);

      const cmOptions: EditorConfiguration = {
        mode: 'text/x-mysql',
        lineWrapping: true,
        // 缩进格式
        tabSize: 2,
        // 显示行号
        lineNumbers: true,
        extraKeys: {
          // 触发按键
          Ctrl: 'autocomplete',
        },
      };

      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }

      async function onRunCode() {
        runLoading.value = true;
        getTableAction().setLoading(true);
        getTableAction().setColumns([]);
        getTableAction().setTableData([]);
        await select({ sql: code.value })
          .then((res) => {
            data.value = res.data;
            columns.value = res.columns;
            getTableAction().setColumns(res.columns);
            getTableAction().setTableData(res.data);
          })
          .catch((_error) => {
            getTableAction().setLoading(false);
            runLoading.value = false;
          });
        getTableAction().setLoading(false);
        runLoading.value = false;
      }

      function onStopRun() {
        getTableAction().setLoading(false);
        runLoading.value = false;
      }

      return {
        tableRef,
        code,
        data,
        columns,
        runLoading,
        stopLoading,
        cmOptions,
        async onReady(cm: Editor) {
          cminstance.value = cm;
          const data = await getSchema();
          cm.setOption('hintOptions', { completeSingle: false, tables: data });
        },
        onChange(_value: string, cm: Editor) {
          cm.showHint();
        },
        onFocus(cm: Editor, _event: FocusEvent) {
          cm.getDoc().on('beforeChange', (_instance: Doc, _obj: EditorChange) => {});
        },
        onRunCode,
        onStopRun,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .sql-editor {
    position: relative;

    // 工具栏
    .header-tools {
      height: 40px;
      user-select: none;

      .tools-list {
        list-style: none;
        padding: 0 0 0 20px;
        margin: 0;
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 12px;
        color: #666;

        .tools-item {
          margin: 0px 10px;
          cursor: pointer;

          &:hover {
            color: #999;
          }

          .el-icon-video-play {
            color: #4bc451;
          }
          .el-icon-video-pause {
            color: #f35353;
          }
          .el-icon-document-checked,
          .el-icon-s-promotion,
          .el-icon-document {
            color: #4381e6;
          }
        }
      }
    }

    // 加载状态
    .run-loadings {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: calc(100% - 40px);
      z-index: 999;
      background: rgba($color: #000000, $alpha: 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #462cf4;
      font-size: 12px;

      .el-icon-loading {
        font-size: 22px;
        margin-bottom: 10px;
        color: #462cf4;
      }
    }
  }
</style>
