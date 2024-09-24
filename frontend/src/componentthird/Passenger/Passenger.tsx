import React, { useState } from 'react'
import './Passenger.css'
import { Button, DatePicker, DatePickerProps, Input, Modal, Select, Space, Timeline } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';


const options = [
  {
    value: '+66',
    label: 'TH (+66)',
  },
  {
    value: '+86',
    label: 'CN (+86)',
  },
];

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };


const Passenger = () => {

  const [open, setOpen] = useState(false);

  const onFinish = async (values: any) => {
    const data = {
      flight_code: values.flightCode,
      schedule_start: values.scheduleStart.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      schedule_end: values.scheduleEnd.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      hour: values.hour,
      cost: values.cost,
      point: values.point,
      airline_id: values.airlineId,
      flying_from_id: values.flyingFrom, // ID input for Flying From
      going_to_id: values.goingTo,       // ID input for Going To
      type_id: values.type,
    };

  return (
    <div className='passenger'>
        <div className="place">
            <div className="contect">
              <h1> ข้อมูลการติดต่อ </h1>
              <div className="contect-phone">
                <h2>หมายเลขโทรศัพท์มือถือ</h2>
                <Space.Compact style={{ width: 250 }}>
                <Select defaultValue="+66" options={options} />
                <Input defaultValue="" />
                </Space.Compact>
              </div>

              <div className="contect-email">
                <h3>อีเมลล์</h3>
                <Input style={{ width: 250 }} suffix=".com" placeholder="email@example" />
              </div>
            </div>

            <div className="passinfo">
              <h1>รายละเอียดผู้โดยสาร</h1>
              <h2>คำนำหน้า
                <Select
                defaultValue=""
                style={{ width: 120 }}
                options={[
                { value: 'นาย', label: 'นาย' },
                { value: 'นาง', label: 'นาง' },
                { value: 'นางสาว', label: 'นางสาว' },
                ]} />
              </h2>
              <h3>
                ชื่อจริง
                <Input style={{ width: 250 }} placeholder="Ex. สมใจ" />
              </h3>
              <h4>
                นามสกุล
                <Input style={{ width: 250 }} placeholder="Ex. ได้เอ" />
              </h4>
              <h5>
                วันเกิด
                <DatePicker style={{ width: 250 }} onChange={onChange} />
              </h5>
              <h6>
                หมายเลขหนังสือเดินทาง
                <Input style={{ width: 250 }} placeholder="" />
                <br></br>
                วันหมดอายุหนังสือเดินทาง
                <DatePicker style={{ width: 250 }} onChange={onChange} />
              </h6>
            </div>

            <div className="passflight">
                
            </div>
            <div className="passbaggage">
              <h1>สัมภาระ</h1>
              <h2>
                สัมภาระเพิ่มเติม
                <Select
                defaultValue="+0"
                style={{ width: 250 }}
                options={[
                { value: '+0', l0abel: '+0' },
                { value: '+5', label: '+5' },
                { value: '+10', label: '+10' },
                { value: '+20', label: '+20' },
              ]} />
              </h2>
            </div>
        </div>
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
                  {children: (
                    <>
                      <p>21.00  กรุงเทพ</p>
                    </>
                  ),},
                  {children: (
                    <>
                      <p>22.15  เชียงใหม่</p>
                    </>
                  ),}
                  ]}/>
              </div>
          </div>
          <div className="total">
            <Button type="primary">ชำระเงิน</Button>
          </div>
        </div>
    </div>
  )
}
}
export default Passenger