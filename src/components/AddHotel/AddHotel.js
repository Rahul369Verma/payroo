import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Api from '../../Api/Api'

function AddHotel({ handleClose, show, newHotelAdd }) {
  const [hotel, setHotel] = useState({
    name: "",
    description: "",
    address: "",
    ownerName: "",
    price: "",
    rating: "",
  })
  const [images, setImages] = useState([])



  const handleChange = (e) => {
    setHotel((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }
    ))
  }

  const handleImage = (e, index) => {
    setImages((prev) => {
      prev[index] = e.target.value
      return prev
    })
  }

  const checkForm = () => {
    if ((hotel.name === "") || (hotel.address === "") || (hotel.price === "") || (hotel.rating === "") || (hotel.ownerName === "")) {
      alert("Fill required fields")
      return
    }
    if (!(hotel.rating <= 5 && hotel.rating >= 1)) {
      alert("rating is not correct")
      return
    }
    if (isNaN(+hotel.price)) {
      alert("price must be integers")
      return
    }
  }

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    checkForm();
    try {
      const {data} = await Api.AddHotel(hotel, images);
      console.log("responseeeeeee",data);
      newHotelAdd(hotel, images, data._id)
      setHotel({})
      setImages({})
      handleClose()
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <Modal show={show} onHide={() => {
      setHotel({})
      setImages({})
      handleClose()
    }}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Hotel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name<small>*</small></Form.Label>
            <Form.Control type="name" placeholder="Name of the hotel" name="name" value={hotel.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description<small>(optional)</small></Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={hotel.description} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address<small>*</small></Form.Label>
            <Form.Control type="address" placeholder="Address of the hotel" name="address" value={hotel.address} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Owner Name<small>*</small></Form.Label>
            <Form.Control type="address" placeholder="Address of the hotel" name="ownerName" value={hotel.ownerName} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price<small>*</small></Form.Label>
            <Form.Control type="price" placeholder="One Night Price" name="price" value={hotel.price} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rating(1 to 5)<small>*</small></Form.Label>
            <Form.Control type="rating" placeholder="Rating for the hotel" name="rating" value={hotel.rating} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image 1 URL<small>*</small></Form.Label>
            <Form.Control type="image1" name='image1' value={images[0]} onChange={(e) => { handleImage(e, 0) }} placeholder="title Image URL" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image 2 URL<small>(optional)</small></Form.Label>
            <Form.Control type="image2" name='image2' value={images[1]} onChange={(e) => { handleImage(e, 1) }} placeholder="Second Image URL" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image 3 URL<small>(optional)</small></Form.Label>
            <Form.Control type="image3" name='image3' value={images[2]} onChange={(e) => { handleImage(e, 2) }} placeholder="Third Image URL" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image 4 URL<small>(optional)</small></Form.Label>
            <Form.Control type="image4" name='image4' value={images[3]} onChange={(e) => { handleImage(e, 3) }} placeholder="Fourth Image URL" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image 5 URL<small>(optional)</small></Form.Label>
            <Form.Control type="image5" name='image5' value={images[4]} onChange={(e) => { handleImage(e, 4) }} placeholder="Fifth Image URL" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddHotel