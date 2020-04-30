import React from "react";
import {
  Form,
  Input,
  Cascader,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Select,
  TreeSelect,
  Upload,
  Button,
  DatePicker,
  TimePicker,
  InputNumber,
  Rate,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FormItemProps } from "ui/interfaces/common";
import ConfigActions from "../ConfigActions";
import styles from "./index.module.less";
import { LabeledValue } from "antd/lib/select";

const { RangePicker } = DatePicker;
const { Option } = Select;

const defaultOptions = [{label: '男', value: '1'}, {label: '女', value: '0'}]

/** 根据选择的表单组件类型，渲染成真实的表单元素 */
export default ({
  formItem,
  config,
  moveUp,
  moveDown,
  configItem,
}: {
  formItem: FormItemProps;
  config: boolean;
  moveUp: () => void;
  moveDown: () => void;
  configItem: () => void;
}) => {
  const { type, label, name, placeholder, ...restProps } = formItem;

  switch (type) {
    case "input":
    default:
      const inputItem = (
        <Form.Item label={label} name={name}>
          <Input placeholder={placeholder as string} {...restProps} />
        </Form.Item>
      );

      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {inputItem}
          </div>
        );
      }
      return inputItem;

    case "password":
      const passwordItem = (
        <Form.Item label={label} name={name}>
          <Input.Password placeholder={placeholder as string} {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {passwordItem}
          </div>
        );
      }
      return passwordItem;

    case "textarea":
      const textareaItem = (
        <Form.Item label={label} name={name}>
          <Input.TextArea placeholder={placeholder as string} {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {textareaItem}
          </div>
        );
      }
      return textareaItem;

    case "cascader":
      const cascaderItem = (
        <Form.Item label={label} name={name}>
          <Cascader placeholder={placeholder as string} {...restProps} />
        </Form.Item>
      );

      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {cascaderItem}
          </div>
        );
      }
      return cascaderItem;

    case "date":
      const dateItem = (
        <Form.Item label={label} name={name}>
          <DatePicker
            placeholder={placeholder as string}
            style={{ width: "100%" }}
            {...restProps}
          />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {dateItem}
          </div>
        );
      }
      return dateItem;

    case "range":
      const rangeItem = (
        <Form.Item label={label} name={name}>
          <RangePicker
            placeholder={placeholder as [string, string]}
            style={{ width: "100%" }}
            {...restProps}
          />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {rangeItem}
          </div>
        );
      }
      return rangeItem;

    case "time":
      const timeItem = (
        <Form.Item label={label} name={name}>
          <TimePicker
            placeholder={placeholder as string}
            style={{ width: "100%" }}
            {...restProps}
          />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {timeItem}
          </div>
        );
      }
      return timeItem;

    case "number":
      const numberItem = (
        <Form.Item label={label} name={name}>
          <InputNumber
            placeholder={placeholder as string}
            style={{ width: "100%" }}
            {...restProps}
          />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {numberItem}
          </div>
        );
      }
      return numberItem;

    case "checkbox":
      const checkboxItem = (
        <Form.Item label={label} name={name}>
          <Checkbox.Group options={defaultOptions} {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {checkboxItem}
          </div>
        );
      }
      return checkboxItem;

    case "radio":
      const radioItem = (
        <Form.Item label={label} name={name}>
          <Radio.Group options={defaultOptions} {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {radioItem}
          </div>
        );
      }
      return radioItem;

    case "switch":
      const switchItem = (
        <Form.Item label={label} name={name} valuePropName="checked">
          <Switch {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {switchItem}
          </div>
        );
      }
      return switchItem;

    case "slider":
      const sliderItem = (
        <Form.Item label={label} name={name}>
          <Slider {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {sliderItem}
          </div>
        );
      }
      return sliderItem;

    case "select":
      const selectItem = (
        <Form.Item label={label} name={name}>
          <Select {...restProps}>
            {((formItem.options as LabeledValue[]) || []).map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {selectItem}
          </div>
        );
      }
      return selectItem;

    case "treeselect":
      const treeselectItem = (
        <Form.Item label={label} name={name}>
          <TreeSelect {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {treeselectItem}
          </div>
        );
      }
      return treeselectItem;

    case "upload":
      const uploadItem = (
        <Form.Item label={label} name={name}>
          <Upload {...restProps}>
            <Button>
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {uploadItem}
          </div>
        );
      }
      return uploadItem;

    case "rate":
      const rateItem = (
        <Form.Item label={label} name={name}>
          <Rate />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={styles.formItemConfig}>
            <ConfigActions
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
            />
            {rateItem}
          </div>
        );
      }
      return rateItem;
  }
};
