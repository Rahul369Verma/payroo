import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Navigator from '../TopNavbar/Navigator'
import AddHotel from '../AddHotel/AddHotel';
import Api from '../../Api/Api.js';


function Home() {

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [hotels, setHotels] = useState([])
  const [show, setShow] = useState(false);

  let navigate = useNavigate();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This property offers great value (measured in terms of - for example - price, star rating, review score and facilities )
      compare to similar properties within this market.
    </Tooltip>
  );

  const hotelClick = (hotel) => {
    navigate(`/hotel/${hotel._id}`, { replace: true })
  }

  const newHotelAdd = (data, images, id) => {
    setHotels(prev => ([...prev, { ...data, images, "_id": id}]))
  }

  useEffect(() => {
    const getHotels = async () => {
      try {
        const { data } = await Api.GetHotels();
        setHotels(data)
      } catch (e) {
        console.log(e);
      }
    }
    getHotels();
  }, [])


  return (
    <div>
      <Navigator />
      <div className='mx-5' style={{ marginTop: "6%" }}>
        <div className='row'>
          <div className='col-6'>
            <h2>
              Hotels Near You
            </h2>
          </div>
          <div className='col-6 text-end pe-5'>
            <button className='btn btn-info' onClick={handleShow}>Add Hotel</button>
            <AddHotel handleClose={handleClose} show={show} newHotelAdd={newHotelAdd} />
          </div>
        </div>
        <div className='row'>
          {hotels?.map((hotel, index) => {
            return <Link to={`/hotel/${hotel._id}`} className='col-lg-6 col-sm-12 d-flex my-3 justify-content-between' key={index}
              style={{ cursor: "pointer", color: 'inherit', textDecoration: 'inherit' }} >
              <div className='row' style={{ marginLeft: "0%" }}>
                <div className='col-4'>
                  <img src={hotel.images[0]}
                    className="m-0 p-0"
                    alt='hotel'
                    style={{ width: "100%" }} />
                </div>
                <div className='col-6'>
                  <div className='w-100'>
                    <h6 className='m-0'>
                      <b>{hotel.name}</b>
                    </h6>
                  </div>
                  <small className='text-muted'>{hotel.ownerName}</small>
                  <div>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Button style={{ height: "5%", cursor: "default" }} className="p-1" variant="warning" size="sm">Great Value</Button>
                    </OverlayTrigger>
                  </div>
                </div>


                <div className='col-2' >
                  <div className='text-white p-1 rounded' style={{ backgroundColor: "#003580" }}>
                    {hotel.rating}
                  </div>
                  <div className=''>
                    <small className='text-muted'>From</small>
                    <h4 className='m-0'>{hotel.price}</h4>
                    <small className='text-muted py-0 m-0'>For tonight</small>
                  </div>
                </div>

              </div>
            </Link>
          })}


        </div>
      </div>
    </div>
  )
}

export default Home