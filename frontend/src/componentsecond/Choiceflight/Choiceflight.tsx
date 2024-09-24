import React, { useState } from 'react'
import './Choiceflight.css'
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Cascader, CascaderProps, Checkbox, CheckboxProps, DatePicker, DatePickerProps, Input, InputNumber, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';


interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'ชั้นประหยัด',
    label: 'ชั้นประหยัด',
  },
  {
      value: 'ชั้นธุรกิจ',
      label: 'ชั้นธุรกิจ',
  },
  {
      value: 'ชั้นหนึ่ง',
      label: 'ชั้นหนึ่ง',
  }
]

interface Option {
value: string;
label: string;
children?: Option[];
}


const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const onChang: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};


const Choiceflight = () => {

  const location = useLocation();
  const { from, to, departureDate, returnDate, passengers, flightClass } = location.state || {};


  const [searchData, setSearchData] = useState({
    from: from || '',
    to: to || '',
    departureDate: departureDate || '',
    returnDate: returnDate || '',
    passengers: passengers || 1,
    flightClass: flightClass || 'ชั้นประหยัด',
  });

  const [position, setPosition] = useState<'start' | 'end'>('end');

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handlesearchClick = () => {
    navigate("/selectflight");
  };

    // State to manage DatePicker disabled status
    const [isRoundTrip, setIsRoundTrip] = useState(false); // By default "ไป-กลับ" is checked
  
    // Handle Checkbox change
    const onCheckboxChange: CheckboxProps['onChange'] = (e) => {
      console.log(`checked = ${e.target.checked}`);
      setIsRoundTrip(e.target.checked); // Toggle the disabled state based on checkbox status
    };

    const handleInputChange = (key: string, value: any) => {
      setSearchData(prevState => ({
        ...prevState,
        [key]: value,
      }));
    };

  return (
    <div className='choice'>
       <div className="imagesmall"></div>
       <div className="changeflight">
       <h1>{searchData.from} <ArrowRightOutlined /> {searchData.to}</h1>
       <h2>{searchData.departureDate} | {searchData.passengers} ผู้โดยสาร | {searchData.flightClass}</h2>
            <Button className='custom' type="text" icon={<SearchOutlined />} iconPosition={position} onClick={() => setOpen(true)}>Change Search</Button>
            <Modal
                  title=""
                  centered
                  open={open}
                  onOk={() => setOpen(false)}
                  onCancel={() => setOpen(false)}
                  width={800}
                  
                > <div className="input">
                    <h3>
                      <Checkbox checked={isRoundTrip} onChange={onCheckboxChange}>ไป-กลับ</Checkbox>
                    </h3>
                    <h1>
                      <Input placeholder="จาก" value={searchData.from} onChange={(e) => handleInputChange('from', e.target.value)} />
                      <Input placeholder="ไปยัง" value={searchData.to} onChange={(e) => handleInputChange('to', e.target.value)} />    
                      <DatePicker onChange={onChange} />
                      <DatePicker onChange={onChange} disabled={!isRoundTrip} />
                    </h1>
                    <h2>
                      <Cascader defaultValue={['ชั้นประหยัด']} options={options} onChange={(value) => handleInputChange('flightClass', value[0])}/>
                      <InputNumber suffix="ผู้โดยสาร" style={{ width: '20%' }} min={1} max={10} value={searchData.passengers} onChange={(value) => handleInputChange('passengers', value)} />
                    </h2>
                  </div>
            </Modal>
       </div>
    </div>
  )
}

export default Choiceflight 
                
                
                
                     
                
                  
                  