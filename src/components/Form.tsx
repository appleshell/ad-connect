import {
  useState,
  ReactNode,
  ReactElement,
  ForwardRefRenderFunction,
  FormEvent,
  forwardRef,
  useImperativeHandle,
  FC,
  isValidElement,
  cloneElement,
} from "react";
import { get, isEqual } from "lodash";
import {
  Form as AntdForm,
  Spin,
  Row,
  Col,
  Popover,
  Input,
  Space,
  Divider,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Store, StoreValue } from "antd/lib/form/interface";
// import { ColProps } from "antd/lib/col";
import {
  FormProps as AntdFormProps,
  FormItemProps as AntdFormItemProps,
  FormInstance,
} from "antd/lib/form";
import { InputProps, ColProps, CardProps } from "antd/lib";

function useForceUpdate() {
  const [, setValue] = useState<number>(0); // integer state
  return () => setValue((value) => value + 1);
}

function isFunc(value: unknown): value is (...args: any[]) => any {
  return typeof value === "function";
}

function showPlaceHolder(value: ReactNode, placeholder?: string) {
  if (value === null || value === undefined || value === "") {
    return placeholder;
  }
  return value;
}

export interface FormCommonProps {
  /**
   * If show when data nullish in View mode
   * @default -
   */
  placeholder?: string;
  /**
   * Priority is greater than Form isView
   * @default false
   */
  isView?: boolean;
  /**
   * Set form item layout
   * Priority is greater than Form layoutCol
   * @default { span: 24 }
   * @see https://ant.design/components/grid/#Col
   */
  layoutCol?: ColProps;

  // 标题
  title?: string;
}

export interface FormItemProps extends AntdFormItemProps, FormCommonProps {
  /**
   * @example () => <Input />
   */
  render?: (
    fieldValue: StoreValue,
    fieldsValue: Store,
    form: FormInstance
  ) => ReactElement;
  /**
   * @example (fieldValue) => fieldValue + 1
   */
  renderView?: (
    fieldValue: StoreValue,
    fieldsValue: Store,
    form: FormInstance
  ) => ReactNode;
  /**
   * Hide Form item by condition
   * @example (fieldValue) => !!fieldValue
   */
  isHidden?: (fieldValue: StoreValue, fieldsValue: Store) => boolean;
  tip?:
    | ReactNode
    | ((
        fieldValue: StoreValue,
        fieldsValue: Store,
        form: FormInstance
      ) => ReactNode);
  //   extra?: ReactNode | ((fieldsValue: Store) => ReactNode);
  suffix?: ReactNode | ((fieldsValue: Store) => ReactNode);

  // Default render
  type?: "divider" | "subTitle";

  // disabled
  disabled?: boolean;

  // width: width of the default input
  inputWidth?: number;

  // maxLength: maxLength of the default input
  inputMaxLength?: number;

  // inputProps: props of the default input
  inputProps?: InputProps;
}

export interface FormProps extends AntdFormProps, FormCommonProps {
  items: FormItemProps[];
  children?: React.ReactNode;
  /** Enhance initialValues, but only trigger once  */
  initialValues?: Store | (() => Promise<Store>);
  /** Show mode */
  mode?: "card";
  /** Effective in card mode */
  cardProps?: CardProps;
  onFinish?: (values: Store) => Promise<unknown> | any;
  childrenProps?: {
    single?: boolean;
  };
}

const { useForm, Item, List, Provider } = AntdForm;

const RenderChild = ({ suffix, type, label, children, ...props }: any) => {
  if (type === "divider") {
    return <Divider orientation="left">{label}</Divider>;
  }

  if (type === "subTitle") {
    return <h3>{label}</h3>;
  }

  if (suffix) {
    return (
      <Space>
        {isValidElement(children) ? cloneElement(children, props) : children}
        {suffix}
      </Space>
    );
  }

  if (isValidElement(children)) {
    return cloneElement(children, props);
  }

  return children as any;
};

const InternalForm: ForwardRefRenderFunction<FormInstance, FormProps> = (
  {
    title,
    form,
    isView = false,
    placeholder: placeholderInternal = "-",
    onReset: onResetInternal,
    onFinish: onFinishInternal,
    onValuesChange: onValuesChangeInternal,
    initialValues: initialValuesInternal,
    items,
    children,
    childrenProps,
    layoutCol = { span: 24 },
    ...props
  },
  ref
) => {
  const [formInstance] = useForm(form);
  const [loading, setLoading] = useState(false);
  const forceUpdate = useForceUpdate();

  useImperativeHandle(ref, () => formInstance);

  const onFinish = async (values: Store) => {
    try {
      setLoading(true);
      if (onFinishInternal) {
        await onFinishInternal(values);
      }
    } finally {
      setLoading(false);
    }
  };

  const onReset = (e: FormEvent<HTMLFormElement>) => {
    formInstance.resetFields();
    isFunc(onResetInternal) && onResetInternal(e);
  };

  const onValuesChange = (changeValues: Store, values: Store) => {
    forceUpdate();
    isFunc(onValuesChangeInternal) &&
      onValuesChangeInternal(changeValues, values);
  };

  const renderItems = (
    {
      render,
      renderView,
      isView: isItemView = isView,
      isHidden,
      layoutCol: itemLayoutCol,
      label,
      tip,
      placeholder = placeholderInternal,
      extra,
      suffix,
      name,
      type,
      noStyle = !!type,
      hidden,
      //   desensitize,
      disabled,
      inputWidth,
      inputMaxLength,
      inputProps = {},
      ...itemProps
    }: FormItemProps,
    index: number
  ) => {
    // 补充缺失的rules
    if (itemProps.required && !itemProps.rules) {
      itemProps.rules = [{ required: true, message: label + "不能为空" }];
    }

    let Comp: ReactNode;
    const { getFieldsValue } = formInstance;
    const fieldsValue = {
      ...initialValuesInternal,
      //   ...initialStates.initialValues,
      ...getFieldsValue(),
    };
    const fieldValue: StoreValue = get(fieldsValue, name as string);
    const itemLayoutColCombination = hidden
      ? { span: 0 }
      : itemLayoutCol ?? (type ? { span: 24 } : layoutCol);

    if (isFunc(isHidden) && isHidden(fieldValue, fieldsValue)) {
      return null;
    }

    const key = `form-item-${(name || index).toString()}`;

    const LabelWrap = tip ? (
      <>
        {label}
        <Popover
          content={
            isFunc(tip) ? () => tip(fieldValue, fieldsValue, formInstance) : tip
          }
        >
          <QuestionCircleOutlined
            style={{
              marginLeft: 4,
            }}
          />
        </Popover>
      </>
    ) : (
      label
    );

    if (isItemView) {
      Comp = showPlaceHolder(
        renderView && isFunc(renderView)
          ? renderView(fieldValue, fieldsValue, formInstance)
          : fieldValue,
        name ? placeholder : undefined
      );
    } else {
      Comp =
        render && isFunc(render) ? (
          render(fieldValue, fieldsValue, formInstance)
        ) : (
          <Input
            allowClear
            placeholder={`请输入${label}`}
            style={
              inputWidth && inputWidth > 0 ? { width: inputWidth } : void 0
            }
            maxLength={inputMaxLength}
            {...inputProps}
          />
        );
    }

    return (
      <Col key={key} {...itemLayoutColCombination}>
        <Item
          label={type ? undefined : LabelWrap}
          extra={isFunc(extra) ? extra(fieldsValue) : extra}
          name={isItemView ? undefined : name}
          noStyle={noStyle}
          hidden={hidden}
          {...itemProps}
        >
          <RenderChild
            {...(isValidElement(Comp) ? (Comp as any).props : {})}
            suffix={isFunc(suffix) ? suffix(fieldsValue) : suffix}
            type={type}
            disabled={!!disabled}
            label={LabelWrap}
          >
            {Comp}
          </RenderChild>
        </Item>
      </Col>
    );
  };

  const FormChildren = (
    <Row gutter={24}>
      {items.map((item, index) => renderItems(item, index))}
      {children && (
        <Col
          style={{
            flex: "1",
            flexBasis: childrenProps?.single ? "100%" : "auto",
          }}
        >
          <Item label={<span />} colon={false}>
            {children as ReactElement}
          </Item>
        </Col>
      )}
    </Row>
  );

  return (
    <Spin spinning={loading}>
      {title && <h2>{title}</h2>}
      <AntdForm
        form={formInstance}
        onFinish={onFinish}
        onReset={onReset}
        onValuesChange={onValuesChange}
        initialValues={initialValuesInternal}
        {...props}
      >
        {FormChildren}
      </AntdForm>
    </Spin>
  );
};

const WrapperForm = forwardRef<FormInstance, FormProps>(InternalForm);

type Form = typeof WrapperForm &
  Pick<typeof AntdForm, "Item" | "List" | "useForm" | "Provider">;

const Form: Form = WrapperForm as Form;

Form.Item = Item;
Form.List = List;
Form.useForm = useForm;
Form.Provider = Provider;

export default Form;
