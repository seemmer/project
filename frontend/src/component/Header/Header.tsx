import React, { useEffect, useState } from 'react'
import './Header.css'
import { Button, Cascader, Checkbox, DatePicker, Input, InputNumber } from 'antd'
import type { CheckboxProps, DatePickerProps } from 'antd';
import type { CascaderProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"

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

export const Header = () => {

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('th-TH', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  const navigate = useNavigate();
  // State to store form values
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('ชั้นประหยัด');

  // Handle Checkbox change
  const onCheckboxChange: CheckboxProps['onChange'] = (e) => {
    setIsRoundTrip(e.target.checked);
  };

  // Handle Input Changes
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
  };

  const onDepartureDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    const formattedDate = formatDate(new Date(dateString)); 
    setDepartureDate(formattedDate);
  };

  const onReturnDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    const formattedDate = formatDate (new Date(dateString)); 
    setReturnDate(formattedDate);
  };

  const onClassChange: CascaderProps<Option>['onChange'] = (value) => {
    setFlightClass(value[0]);
  };

  const handlePassengerChange = (value: number | null) => {
    if (value !== null) {
      setPassengers(value);
    }
  };

  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    // Set the current date and time when the component mounts
    setDate(new Date());
  }, []); // Run once when component mounts


  const handleSearchClick = () => {
    // Navigate to another page with the captured state
    navigate('/selectflight', {
      state: {
        from,
        to,
        departureDate,
        returnDate: isRoundTrip ? returnDate : null,
        passengers,
        flightClass,
      },
    });
  };

  return (
    <div className='Home'>
        <div className = 'image'>
            <h1>จองเลย!</h1>
            <h2>ค้นหาเที่ยวบินมากมายจากทั่วทุกมุมโลก</h2>
        </div>

        <div className='searchflight'>
            <div className="input">
                <h3>
                  <Checkbox checked={isRoundTrip} onChange={onCheckboxChange}>ไป-กลับ</Checkbox>
                </h3>
                <h1>
                  <Input placeholder="จาก" value={from} onChange={handleFromChange} />
                  <Input placeholder="ไปยัง" value={to} onChange={handleToChange} />
                  <DatePicker onChange={onDepartureDateChange} />
                  <DatePicker onChange={onReturnDateChange} disabled={!isRoundTrip} />
                </h1>
                <h2>
                  <Cascader defaultValue={['ชั้นประหยัด']} options={options} onChange={onClassChange} />
                  <InputNumber suffix="ผู้โดยสาร" style={{ width: '20%'}} min={1} max={10} defaultValue={1} onChange={handlePassengerChange} /> 
                </h2>
            </div>
            <div className="search">
              <Button className='custom-button' type="text" icon={<SearchOutlined />}  onClick={handleSearchClick}>Search</Button>
            </div>
        </div>
    </div>
  )
}

export default Header