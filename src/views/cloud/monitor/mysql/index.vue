<template>
  <div class="sql-editor">
    <div class="header-tools">
      <ul class="tools-list">
        <li class="tools-item" @click="onRunCode">
          <i class="el-icon-video-play"></i>
          运行
        </li>
        <li class="tools-item" @click="onStopRun">
          <i class="el-icon-video-pause"></i>
          停止
        </li>
      </ul>
    </div>
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
      titleHelpMessage="只支持查询"
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
    components: {
      Codemirror,
      BasicTable,
    },
    setup() {
      const cminstance = ref<Editor>();
      const tableRef = ref<Nullable<TableActionType>>(null);
      const code = ref(`select now() from dual`);
      const data = ref<Recordable[]>([]);
      const columns = ref<BasicColumn[]>();

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
        const data = await select({ sql: code.value });
        data.value = data.data;
        columns.value = data.columns;
        getTableAction().setColumns(data.columns);
        getTableAction().setTableData(data.value);
      }

      function onStopRun() {}

      return {
        tableRef,
        code,
        data,
        columns,
        cmOptions,
        async onReady(cm: Editor) {
          const data = await getSchema();
          cm.setOption('hintOptions', { completeSingle: false, tables: data });
          cminstance.value = cm;
        },
        onChange(value: string, cm: Editor) {
          cm.showHint();
          console.log(value, cm);
        },
        onFocus(cm: Editor, event: FocusEvent) {
          console.log('onFocus', cm, event);
          cm.getDoc().on('beforeChange', (instance: Doc, obj: EditorChange) => {
            console.log('beforeChange', instance, obj);
          });
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
