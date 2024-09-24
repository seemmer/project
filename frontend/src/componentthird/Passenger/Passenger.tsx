import React, { useState } from 'react';
import './Passenger.css';
import { Button, DatePicker, Input, Select, Space, Timeline, Form } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const options = [
  { value: '+66', label: 'TH (+66)' },
  { value: '+86', label: 'CN (+86)' },
];

const Passenger = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const data = {
      phone: values.phone,
      email: values.email,
      first_name: values.firstname,
      last_name: values.lastname,
      birth_day: values.birthday.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      passport_number: values.passportnumber,
      passport_date: values.passportdate.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      weight: values.weight,
    };
    console.log('Form data:', data);
  };

  return (
    <div className="passenger">
      <Form form={form} onFinish={onFinish}>
        <div className="place">
          <div className="contect">
            <h1>ข้อมูลการติดต่อ</h1>
            <div className="contect-phone">
                <Form.Item label="หมายเลขโทรศัพท์มือถือ" layout='vertical' name="phone" rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' }]}>
                 <Space.Compact style={{ width: 250 }}> 
                    <Select defaultValue="+66" options={options}/>
                    <Input placeholder="Phone number" />
                  </Space.Compact>
                </Form.Item>
            </div>

            <div className="contect-email">
              <Form.Item label="อีเมลล์" name="email" layout='vertical' rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}>
                <Input style={{ width: 250 }} suffix=".com" placeholder="email@example.com" />
              </Form.Item>
            </div>
          </div>

          <div className="passinfo">
            <h1>รายละเอียดผู้โดยสาร</h1>
            <div className="h2">
            <Form.Item label='คำนำหน้า' layout='vertical' name="title" rules={[{ required: true, message: 'กรุณาเลือกคำนำหน้า' }]}>
                <Select style={{ width: 120 }} options={[
                  { value: 'นาย', label: 'นาย' },
                  { value: 'นาง', label: 'นาง' },
                  { value: 'นางสาว', label: 'นางสาว' },
                ]} />
            </Form.Item>
            </div>
            <div className="h3">
            <Form.Item label='ชื่อจริง' name="firstname" layout='vertical' rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}>
              <Input style={{ width: 250 }} placeholder="Ex. สมใจ" />
            </Form.Item>
            </div>
            <div className="h4">
            <Form.Item label='นามสกุล' name="lastname" layout='vertical' rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}>
              <Input style={{ width: 250 }} placeholder="Ex. ได้เอ" />
            </Form.Item>
            </div>
            <div className="h5">
            <Form.Item label='วันเกิด' name="birthday" layout='vertical' rules={[{ required: true, message: 'กรุณาเลือกวันเกิด' }]}>
              <DatePicker style={{ width: 250 }} />
            </Form.Item>
            </div>
            <div className="h6">
            <Form.Item label='หมายเลขหนังสือเดินทาง' layout='vertical' name="passportnumber" rules={[{ required: true, message: 'กรุณากรอกหมายเลขหนังสือเดินทาง' }]}>
              <Input style={{ width: 250 }} />
            </Form.Item>
            </div>
            <div className="h6">
            <Form.Item label='วันหมดอายุหนังสือเดินทาง' layout='vertical' name="passportdate" rules={[{ required: true, message: 'กรุณาเลือกวันหมดอายุหนังสือเดินทาง' }]}>
              <DatePicker style={{ width: 250 }} />
            </Form.Item>
            </div>
          </div>

          <div className="passbaggage">
            <h1>สัมภาระ</h1>
            <div className="b">
              <Form.Item label='สัมภาระเพิ่มเติม' name="baggage" layout='vertical' initialValue="+0">
              
                <Select style={{ width: 250 }} options={[
                  { value: '+0', label: '+0' },
                  { value: '+5', label: '+5' },
                  { value: '+10', label: '+10' },
                  { value: '+20', label: '+20' },
                ]} />
              
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
        <div className="placeside">
          <div className="dataflight">
            <h1>กรุงเทพ <ArrowRightOutlined /> เชียงใหม่</h1>
            <h3>ขาไป, date</h3>
            <div className="logoplace">
              <div className="logoflight"></div>
              <h2>นกแอร์ </h2>
            </div>
            <div className="timelineplace">
              <Timeline className="custom-timeline" items={[
                { children: <p>21.00  กรุงเทพ</p> },
                { children: <p>22.15  เชียงใหม่</p> },
              ]} />
            </div>
          </div>

          <div className="total">
            <Button type="primary" htmlType="submit">ชำระเงิน</Button>
          </div>
        </div>
      
    </div>
  );
}

export default Passenger;
