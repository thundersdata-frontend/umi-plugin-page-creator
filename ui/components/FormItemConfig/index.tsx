import React from 'react';
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
  Tooltip,
} from 'antd';
import { UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FormItemProps } from '../../../interfaces/common';
import ConfigActions from '../ConfigActions';
import styles from './index.module.less';
import { LabeledValue } from 'antd/lib/select';
import classNames from 'classnames';

const { RangePicker } = DatePicker;
const { Option } = Select;

const defaultRadioOptions = [{ label: '男', value: '1' }, { label: '女', value: '0' }];
const defaultCheckboxOptions = ['Apple', 'Pear'];

/** 根据选择的表单组件类型，渲染成真实的表单元素 */
export default function renderFormItem({
  formItem,
  config = false,
  position = 'left',
  moveUp,
  moveDown,
  configItem,
  deleteItem,
  copyItem,
}: {
  formItem: FormItemProps;
  config?: boolean;
  position?: 'left' | 'top';
  moveUp?: () => void;
  moveDown?: () => void;
  configItem?: () => void;
  deleteItem?: () => void;
  copyItem?: () => void;
}) {
  const { type, label, name, placeholder, ...restProps } = formItem;

  switch (type) {
    case 'input':
    default:
      const inputItem = (
        <Form.Item label={label} name={name}>
          <Input placeholder={placeholder as string} {...restProps} />
        </Form.Item>
      );

      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {inputItem}
          </div>
        );
      }
      return inputItem;

    case 'password':
      const passwordItem = (
        <Form.Item label={label} name={name}>
          <Input.Password placeholder={placeholder as string} {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {passwordItem}
          </div>
        );
      }
      return passwordItem;

    case 'textarea':
      const textareaItem = (
        <Form.Item required={(formItem.required || false) as boolean} label={
          <label>
            <span style={{ paddingRight: 10 }}>{label}</span>
            {formItem.tooltip && (
              <Tooltip
                overlay={(formItem.tooltip) as string}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            )}
          </label>
        } name={name}>
          <Input.TextArea placeholder={placeholder as string} {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {textareaItem}
          </div>
        );
      }
      return textareaItem;

    case 'cascader':
      const cascaderItem = (
        <Form.Item label={label} name={name}>
          <Cascader placeholder={placeholder as string} {...restProps} />
        </Form.Item>
      );

      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {cascaderItem}
          </div>
        );
      }
      return cascaderItem;

    case 'date':
      const dateItem = (
        <Form.Item label={label} name={name}>
          <DatePicker
            placeholder={placeholder as string}
            style={{ width: '100%' }}
            {...restProps}
          />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {dateItem}
          </div>
        );
      }
      return dateItem;

    case 'range':
      const rangeItem = (
        <Form.Item label={label} name={name}>
          <RangePicker
            placeholder={placeholder as [string, string]}
            style={{ width: '100%' }}
            {...restProps}
          />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {rangeItem}
          </div>
        );
      }
      return rangeItem;

    case 'time':
      const timeItem = (
        <Form.Item label={label} name={name}>
          <TimePicker
            placeholder={placeholder as string}
            style={{ width: '100%' }}
            {...restProps}
          />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {timeItem}
          </div>
        );
      }
      return timeItem;

    case 'number':
      const numberItem = (
        <Form.Item label={label} name={name}>
          <InputNumber
            placeholder={placeholder as string}
            style={{ width: '100%' }}
            {...restProps}
          />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {numberItem}
          </div>
        );
      }
      return numberItem;

    case 'checkbox':
      const { options: checkboxOptions, ...checkboxProps } = restProps;
      const checkboxItem = (
        <Form.Item label={label} name={name}>
          <Checkbox.Group
            name={name}
            options={!checkboxOptions ? defaultCheckboxOptions : eval(checkboxOptions as string)}
            {...checkboxProps}
          />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {checkboxItem}
          </div>
        );
      }
      return checkboxItem;

    case 'radio':
      const { options: radioOptions, ...radioProps } = restProps;
      const radioItem = (
        <Form.Item label={label} name={name}>
          <Radio.Group
            name={name}
            options={!radioOptions ? defaultRadioOptions : eval(radioOptions as string)}
            {...radioProps}
          />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {radioItem}
          </div>
        );
      }
      return radioItem;

    case 'switch':
      const switchItem = (
        <Form.Item label={label} name={name} valuePropName="checked">
          <Switch {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {switchItem}
          </div>
        );
      }
      return switchItem;

    case 'slider':
      const sliderItem = (
        <Form.Item label={label} name={name}>
          <Slider {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {sliderItem}
          </div>
        );
      }
      return sliderItem;

    case 'select':
      const { options: selectOptions, ...selectProps } = restProps;
      const selectItem = (
        <Form.Item label={label} name={name}>
          <Select {...selectProps}>
            {selectOptions &&
              ((eval(selectOptions as string) as LabeledValue[]) || []).map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
          </Select>
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {selectItem}
          </div>
        );
      }
      return selectItem;

    case 'treeselect':
      const treeselectItem = (
        <Form.Item label={label} name={name}>
          <TreeSelect {...restProps} />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {treeselectItem}
          </div>
        );
      }
      return treeselectItem;

    case 'upload':
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
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {uploadItem}
          </div>
        );
      }
      return uploadItem;

    case 'rate':
      const rateItem = (
        <Form.Item label={label} name={name}>
          <Rate />
        </Form.Item>
      );
      if (config) {
        return (
          <div className={classNames(styles.formItemConfig, position === 'top' ? styles.top : '')}>
            <ConfigActions
              position={position}
              moveUp={moveUp}
              moveDown={moveDown}
              configItem={configItem}
              deleteItem={deleteItem}
              copyItem={copyItem}
            />
            {rateItem}
          </div>
        );
      }
      return rateItem;
  }
}
