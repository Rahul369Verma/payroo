import axios from "axios";
import { API } from "../API";
import { isAutheticated } from "../components/auth/authhelper";

const callApi = async (url, data = null, method = "GET") => {
  const { token } = isAutheticated()
  try {
    const response = await axios({
      url,
      data: (data),
      method,
      headers: {
        "Access-Control-Allow-Origin": "*",
        // Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const Api = {

  SignIn: (data) =>
    callApi(`${API}/api/signin`, data, "POST"),
  SignUp: (data) =>
    callApi(`${API}/api/signup`, data, "POST"),
  AddHotel: (hotel, images) =>
    callApi(`${API}/api/hotel`, { hotel, images }, "POST"),
  GetHotels: (hotel, images) =>
    callApi(`${API}/api/hotel`),
  GetHotel: (id) =>
    callApi(`${API}/api/hotel/${id}`),
  Booking: (hotelID, from, to) =>
    callApi(`${API}/api/booking/`, { hotelID, from, to }, "POST"),
    GetBooking: () =>
    callApi(`${API}/api/booking`),


};

export default Api;
