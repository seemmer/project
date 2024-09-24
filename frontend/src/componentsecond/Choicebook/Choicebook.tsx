import React from 'react'
import './Choicebook.css'
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"

const Choicebook = () => {

    const navigate = useNavigate();

    const handleBookingClick = () => {
      navigate("/passengerall");
    };

  return (
    <div className='choicebook'>
   
        <div className="choiceselect">
            <div className="airline">
                <div className="logo-flight"></div>
                <div className="name">นกแอร์</div>
            </div>
  
            <div className="flight-time">
                <div className="departure">
                    <div className="time">16:45</div>
                    <div className="location">กรุงเทพฯ</div>
                </div>
            </div>

            <div className="duration">
                <div className="time">7 ชม. 10 น.</div>
                <ArrowRightOutlined />
                <div className="type">ชั้นประหยัด</div>
            </div>

           
            <div className="arrival">
                <div className="time">23:55</div>
                <div className="location">เชียงใหม่</div>
            </div>

            <div className="price-section">
                <div className="price">฿6,600</div>
                <button className="book-btn" onClick={handleBookingClick} >จอง</button>
            </div>
            
        </div>
        
       
    </div>
  )
}

export default Choicebook