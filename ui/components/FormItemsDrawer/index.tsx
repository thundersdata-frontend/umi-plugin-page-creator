import React, { useState } from 'react';
import {
  Drawer,
  Form,
  Cascader,
  Checkbox,
  Input,
  DatePicker,
  InputNumber,
  Radio,
  Switch,
  Slider,
  Select,
  TreeSelect,
  Upload,
  TimePicker,
  Rate,
  Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormItemType } from '../../../interfaces/common';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default ({
  setVisible,
  visible,
  onSubmit,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (checkedComponents: FormItemType[]) => void;
}) => {
  const [checkedComponents, setCheckedComponents] = useState<FormItemType[]>([]);

  /** 复选框是否选中 */
  const handleChange = (type: FormItemType) => (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      // 加到checkedComponents里面
      setCheckedComponents(checked => [...checked, type]);
    } else {
      // 从checkedComponents移出
      const checked = checkedComponents.slice();
      const index = checked.findIndex(item => item === type);
      if (index > -1) {
        checked.splice(index, 1);
      }
      setCheckedComponents(checked);
    }
  };

  /** 将选中的这些表单元素传出去 */
  const handleSubmit = () => {
    onSubmit(checkedComponents);
    setCheckedComponents([]);
  };

  return (
    <Drawer
      title="选择表单元素"
      visible={visible}
      width={360}
      onClose={() => setVisible(false)}
      destroyOnClose
    >
      <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} labelAlign="left">
        <Form.Item label={<Checkbox onChange={handleChange('input')}>文本输入框</Checkbox>}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('password')}>密码输入框</Checkbox>}>
          <Input.Password autoComplete="off" />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('textarea')}>文本域输入框</Checkbox>}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('cascader')}>级联选择</Checkbox>}>
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                      {
                        value: 'xihu',
                        label: 'West Lake',
                      },
                    ],
                  },
                ],
              },
              {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                  {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                      {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('date')}>日期选择器</Checkbox>}>
          <DatePicker />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('range')}>日期范围选择器</Checkbox>}>
          <RangePicker />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('time')}>时间选择器</Checkbox>}>
          <TimePicker />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('number')}>数字输入框</Checkbox>}>
          <InputNumber value={24} />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('radio')}>单选框</Checkbox>}>
          <Radio.Group defaultValue={1}>
            <Radio value={1}>男</Radio>
            <Radio value={0}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('checkbox')}>复选框</Checkbox>}>
          <Checkbox.Group options={['Apple', 'Pear']} defaultValue={['Apple']} />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('switch')}>开关</Checkbox>}>
          <Switch checked />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('slider')}>滑动输入条</Checkbox>}>
          <Slider value={45} />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('select')}>下拉选择</Checkbox>}>
          <Select style={{ width: '100%' }}>
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
          </Select>
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('treeselect')}>树形选择</Checkbox>}>
          <TreeSelect
            style={{ width: '100%' }}
            treeData={[
              {
                title: 'Node1',
                value: '0-0',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-0-1',
                  },
                  {
                    title: 'Child Node2',
                    value: '0-0-2',
                  },
                ],
              },
              {
                title: 'Node2',
                value: '0-1',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('upload')}>上传</Checkbox>}>
          <Upload>
            <Button>
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('rate')}>评分</Checkbox>}>
          <Rate allowHalf defaultValue={2.5} />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          确定
        </Button>
      </Form>
    </Drawer>
  );
};
