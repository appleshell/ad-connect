import React, {
  ReactElement,
  ReactNode,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  Ref,
} from "react";
import { Table, Space, Row, Button, Form as AntdForm } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import Form, { FormProps } from "./Form";
import TableLayout from "./TableLayout";
import { TablePaginationConfig } from "antd/lib/table/interface";
interface ISearch {
  itemList: any[];
}

export interface TableSearchProps extends FormProps {
  /**
   * Show search form item count
   * @default 3
   */
  initialCount?: number;
  /**
   * Support search form string value trim
   */
  allowTrim?: boolean;
  addonButtons?: React.ReactNode;
  disabledSearchBtn?: boolean;
  disabledSearchBtnAddonAfter?: React.ReactNode; // 隐藏搜索按钮之后，替代组件
}

interface ITable {
  columns: any[];
  dataSource: any[];
  pagination?: TablePaginationConfig | false;
  queryData: (formValue: any, pageData: TablePaginationConfig) => void;
}

interface IProps {
  tableSearchProps: TableSearchProps;
  tableProps: ITable;
  operateCom?: ReactNode;
}

export interface TableRef {
  refresh: () => void;
}

const { useForm } = AntdForm;

const TableCom = (
  { tableSearchProps, tableProps, operateCom }: IProps,
  ref: Ref<TableRef>
) => {
  const [form] = useForm(tableSearchProps?.form);
  const { items, ...restSearchPorps } = tableSearchProps;
  const {
    columns,
    dataSource,
    pagination: paginationProps,
    queryData,
    ...restTableProps
  } = tableProps;
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    total: 0,
    pageSize: 10,
    pageSizeOptions: ["10", "20", "50", "100"],
    showSizeChanger: true,
  });
  const [tableLoading, setTableLoading] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  useImperativeHandle(ref, () => ({ refresh }));

  useEffect(() => {
    handleSearch(pagination);
  }, []);

  const handleSearch = async (pagination: TablePaginationConfig) => {
    setTableLoading(true);
    const formValue = await form.validateFields();
    await queryData(formValue, pagination);
    setTableLoading(false);
  };

  const handleTableChange = (pageData: TablePaginationConfig) => {
    setPagination({ ...pagination, ...pageData });
    handleSearch(pageData);
  };

  const requeryData = () => {
    const resetPageData = { ...pagination, current: 1 };
    setPagination(resetPageData);
    handleSearch(resetPageData);
  };

  const refresh = () => requeryData();

  const renderSearchColumns = () => {
    if (!tableSearchProps) {
      return null;
    }
    const {
      initialCount = 3,
      items,
      addonButtons,
      ...searchProps
    } = tableSearchProps;

    const { disabledSearchBtn, disabledSearchBtnAddonAfter } = searchProps;

    return (
      <>
        <Form
          items={
            isExpand
              ? items
              : items.map((item, index) => {
                  if (index >= initialCount) {
                    return {
                      ...item,
                      hidden: true,
                    };
                  }
                  return item;
                })
          }
          form={form}
          layoutCol={{
            span: 6,
            xs: 12,
            sm: 12,
            md: 12,
            lg: 8,
            xl: 6,
          }}
          onReset={requeryData}
          {...searchProps}
        >
          <Form.Item noStyle>
            <Row justify="end">
              <Space>
                {disabledSearchBtn ? (
                  disabledSearchBtnAddonAfter
                ) : (
                  <Button
                    onClick={requeryData}
                    type="primary"
                    icon={<SearchOutlined />}
                    loading={tableLoading}
                  >
                    搜索
                  </Button>
                )}
                <Button htmlType="reset">重置</Button>
                {addonButtons}
                {items.length > initialCount && (
                  <Button
                    type="link"
                    style={{
                      padding: "0 0 0 4px",
                    }}
                    onClick={() => {
                      setIsExpand(!isExpand);
                    }}
                  >
                    {isExpand ? "收起" : "展开"}
                    <DownOutlined rotate={isExpand ? 180 : 0} />
                  </Button>
                )}
              </Space>
            </Row>
          </Form.Item>
        </Form>
      </>
    );
  };

  return (
    <TableLayout>
      {renderSearchColumns()}
      <>
        {operateCom}
        <Table
          columns={columns}
          dataSource={dataSource}
          // @ts-ignore
          onChange={handleTableChange}
          loading={tableLoading}
          pagination={
            paginationProps === false
              ? paginationProps
              : { ...pagination, ...(paginationProps as any) }
          }
          {...restTableProps}
        />
      </>
    </TableLayout>
  );
};

export default forwardRef(TableCom);
