import React, { useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const InputForm = () => {
  /* generate houers */
  const startTime = new Date();
  startTime.setHours(8, 0, 0);

  const endTime = new Date();
  endTime.setHours(20, 0, 0);

  const timeOptions = [];
  while (startTime <= endTime) {
    const formattedTime = startTime.toLocaleTimeString(["en-US"], {
      hour: "2-digit",
      minute: "2-digit",
    });
    timeOptions.push(formattedTime);

    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  /* connect to the api */

  // Input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [time, setTime] = useState("");

  const [dataVisible, setDataVisible] = useState(false); // Track visibility state
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [responseData, setResponseData] = useState([]); // Get response

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [recordIndexToDelete, setRecordIndexToDelete] = useState(null);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setTime("");
  };

  const handlePostRequest = () => {
    // Clear any previous error messages and reset error states
    setErrorMessage("");
    setResponseMessage("");

    // Check if any of the required fields are empty
    if (!firstName || !lastName || !time) {
      setErrorMessage("Please fill in all required fields.");
      return; // Exit the function if validation fails
    }

    // Define the API endpoint URL
    const apiUrl = "http://localhost:4001/request";

    // Data to send in the request body
    const postData = {
      firstName: firstName, // Use the input value here
      lastName: lastName,
      time: time,
    };

    // Make the POST request using Axios
    axios
      .post(apiUrl, postData)
      .then(function (response) {
        // console.log("Response:", response.data);

        clearForm();
        setResponseMessage("New Recrod Added.");
        handleGetRequest();
      })
      .catch(function (error) {
        // console.error("Ops:", error.response.data.message);
        // Handle any errors from the server
      });
  };

  const handleGetRequest = () => {
    // Define the API endpoint URL
    const apiUrl = "http://localhost:4001/request/requests";

    // Make the GET request using Axios
    axios
      .get(apiUrl)
      .then(function (response) {
        // Handle the response data here
        setResponseData(response.data);
        // console.log("Response:", response.data);
      })
      .catch(function (error) {
        // console.error("Ops:", error);
      });
  };

  const confirmDelete = (id, index) => {
    // Open the delete confirmation dialog
    setShowDeleteConfirmation(true);
    // Set the record to delete
    setRecordToDelete(id);
    setRecordIndexToDelete(index);
  };

  const cancelDelete = () => {
    // Close the delete confirmation dialog and reset the record to delete
    setShowDeleteConfirmation(false);
    setRecordToDelete(null);
    setRecordIndexToDelete(null);
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(false);

    // Define the API endpoint URL
    const apiUrl = "http://localhost:4001/request/delete/" + recordToDelete;

    // Make the POST request using Axios
    axios
      .delete(apiUrl)
      .then(function (response) {
        console.log("Response:", response.data);

        // Trigger a GET request to refresh the data
        handleGetRequest();
      })
      .catch(function (error) {
        //  console.error("Ops:", error);
      });
  };

  return (
    <>
      <div className="text-lg font-bold bg-slate-200 px-6 py-4 rounded-2xl ">
        <h1 className="text-center mb-2">Add New Record</h1>
        <div className="pb-4 flex">
          <label className="pr-2 my-auto">Firstname:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            className={`bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold w-100 ml-auto ${
              errorMessage && !firstName ? "border-2 border-red-500" : ""
            }`}
          ></input>
        </div>

        <div className="pb-4 flex">
          <label className="pr-2 my-auto">Lastname:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className={`bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold w-100 ml-auto ${
              errorMessage && !lastName ? "border-2 border-red-500" : ""
            }`}
          ></input>
        </div>

        <div className="pb-4 flex">
          <label className=" pr-2 my-auto">Time:</label>
          <select
            name="time"
            id="time"
            value={time}
            onChange={handleTimeChange}
            className={`bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold w-100 ml-auto ${
              errorMessage && !time ? "border-2 border-red-500" : ""
            }`}
          >
            <optgroup label="Select Time">
              {timeOptions.map((time, index) => (
                <option value={time}>{time}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Display the message */}
        {(errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )) ||
          (responseMessage && (
            <div className="text-green-500 mb-2">{responseMessage}</div>
          ))}

        <div className="flex">
          <button
            onClick={handlePostRequest}
            className="mx-auto hover:bg-teal-300 hover:scale-105 bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold border-0"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="text-lg font-bold bg-slate-200 px-6 py-4 rounded-2xl mt-4">
        <h1 className="text-center mb-2">Show Previous Records</h1>
        <div className="flex">
          <button
            onClick={() => {
              // Then, make the GET request
              if (!dataVisible) handleGetRequest();

              // Toggle data visibility when the button is clicked
              if (!recordToDelete) setDataVisible(!dataVisible);
            }}
            className={`mx-auto bg-teal-50 duration-200 rounded-xl px-4 py-2 mt-2 font-bold border-0 ${
              !recordToDelete ? "hover:bg-teal-300 hover:scale-105" : ""
            }`}
          >
            Get Data
          </button>
        </div>
        <div className="mt-2">
          {dataVisible &&
            responseData.map((item, index) => (
              <div key={index} className="flex">
                <button
                  onClick={() => confirmDelete(item._id, index + 1)} // Pass a callback function here
                  className={`hover:text-red-700 hover:scale-105 duration-200 mr-2 ${
                    recordToDelete === item._id ? " text-red-700 scale-105" : ""
                  }`}
                >
                  <AiFillDelete />
                </button>
                <p>
                  {index + 1}- {item.firstName} {item.lastName} - {item.time}
                </p>
              </div>
            ))}
        </div>
        {showDeleteConfirmation && (
          <div className="bg-white p-4 rounded-md shadow-md mt-2 duration-150">
            <p>Are you sure you want to delete record {recordIndexToDelete}?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:scale-105 duration-200 text-white px-4 py-2 rounded-md mr-2"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="bg-slate-200 hover:bg-teal-300 hover:scale-105 duration-200 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InputForm;
