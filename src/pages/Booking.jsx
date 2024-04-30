import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Booking({ socket }) {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    price: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [bookingData, setBookingData] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function convertToHHMMSS(time) {
    const regex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
    if (regex.test(time)) {
      return time + ":00";
    }
    return time;
  }

  const handleBooking = () => {
    console.log("create ", formData);
    socket.emit("createBooking", {
      date: formData.date,
      startTime: convertToHHMMSS(formData.startTime),
      endTime: convertToHHMMSS(formData.endTime),
      location: formData.location,
      price: formData.price,
    });
  };

  const getEditData = (data) => {
    console.log(data, "getdata");
    const { date, ...restData } = data;
    setFormData({
      ...restData,
      date: date.split("T")[0],
    });
    setIsEdit(true);
  };

  const handleEdit = () => {
    console.log("edit", formData);
    socket.emit("updateBooking", formData.id, {
      date: formData.date,
      startTime: convertToHHMMSS(formData.startTime),
      endTime: convertToHHMMSS(formData.endTime),
      location: formData.location,
      price: formData.price,
    });
    setIsEdit(false);
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      price: "",
    });
  };

  const handleDelete = (id) => {
    socket.emit("deleteBooking", id);
  };

  useEffect(() => {
    socket.emit("requestAllBookings");
    socket.on("allBookings", (alldata) => {
      setBookingData(alldata);
    });

    socket.on("bookingCreated", (booking) => {
      socket.emit("requestAllBookings");
      console.log("BOOKING CREATED", booking);
    });

    socket.on("bookingDeleted", (msg) => {
      socket.emit("requestAllBookings");
      console.log("BOOKING DELETED", msg);
    });

    socket.on("bookingUpdated", (msg) => {
      socket.emit("requestAllBookings");
      console.log("BOOKING UPDATED", msg);
    });

    socket.on("validationError", (error) => {
      console.log("validationError", error);
    });

    socket.on("bookingsFetchError", (error) => {
      console.log("bookingsFetchError", error);
    });

    socket.on("bookingCreationError", (error) => {
      console.log("bookingCreationError", error);
    });

    socket.on("bookingUpdateError", (error) => {
      console.log("bookingUpdateError", error);
    });

    socket.on("bookingDeleteError", (error) => {
      console.log("bookingDeleteError", error);
    });

    return () => {
      // Clean up event listeners when component unmounts
      socket.off("allBookings");
      socket.off("bookingCreated");
      socket.off("bookingDeleted");
      socket.off("bookingUpdated");
      socket.off("validationError");
      socket.off("bookingsFetchError");
      socket.off("bookingCreationError");
      socket.off("bookingUpdateError");
      socket.off("bookingDeleteError");
    };
  }, []);

  return (
    <>
      <h1>Booking</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleInput}
        />
        <input
          type="time"
          name="startTime"
          placeholder="Start Time"
          value={formData.startTime}
          onChange={handleInput}
        />
        <input
          type="time"
          name="endTime"
          placeholder="End Time"
          value={formData.endTime}
          onChange={handleInput}
        />
        <input
          type="text"
          name="location"
          placeholder="Enter Location"
          value={formData.location}
          onChange={handleInput}
        />
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={formData.price}
          onChange={handleInput}
        />
      </div>
      <button onClick={isEdit ? handleEdit : handleBooking}>
        {isEdit ? "Edit Data" : "Create Booking"}
      </button>

      <h2>Booking Data</h2>
      <div>
        <table border={1}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Location</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.date}</td>
                <td>{data.startTime}</td>
                <td>{data.endTime}</td>
                <td>{data.location}</td>
                <td>{data.price}</td>
                <td>
                  <button onClick={() => getEditData(data)}>Edit</button>
                  <button onClick={() => handleDelete(data.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

Booking.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default Booking;
