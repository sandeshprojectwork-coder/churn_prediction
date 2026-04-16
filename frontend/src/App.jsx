import { useEffect, useRef, useState } from "react";
import "./App.css";
import { api, predictChurn } from "./services/api";

function App() {
  const apiUrl = import.meta.env.VITE_CHURN_API_URL;
  const apiUrlPredict = import.meta.env.VITE_CHURN_API_URL_PREDICT;

  console.log("API URL:", apiUrl);
  console.log("API URL Predict:", apiUrlPredict);

  console.log("env object =", import.meta.env);
  console.log("api base =", import.meta.env.VITE_API_BASE_URL);
  console.log("mode =", import.meta.env.MODE);

  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [customerData, setCustomerData] = useState({
    gender: "",
    SeniorCitizen: 0,
    Partner: "",
    Dependents: "",
    tenure: 0,
    PhoneService: "",
    MultipleLines: "",
    InternetService: "",
    OnlineSecurity: "",
    OnlineBackup: "",
    DeviceProtection: "",
    TechSupport: "",
    StreamingTV: "",
    StreamingMovies: "",
    Contract: "",
    PaperlessBilling: "",
    PaymentMethod: "",
    MonthlyCharges: 0,
    TotalCharges: 0,
  });

  const [response, setResponse] = useState(null);
  const [Loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const resetCustomerData = (e) => {
    e.preventDefault();

    setResponse(null);

    setCustomerData({
      gender: "",
      SeniorCitizen: 0,
      Partner: "",
      Dependents: "",
      tenure: 0,
      PhoneService: "",
      MultipleLines: "",
      InternetService: "",
      OnlineSecurity: "",
      OnlineBackup: "",
      DeviceProtection: "",
      TechSupport: "",
      StreamingTV: "",
      StreamingMovies: "",
      Contract: "",
      PaperlessBilling: "",
      PaymentMethod: "",
      MonthlyCharges: 0,
      TotalCharges: 0,
    });
  };

  const handleSubmit = (e) => {
    // Here you would typically send the customerData to your backend for prediction
    e.preventDefault;
    setLoading(true);
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    predictChurn(customerData)
      .then((data) => {
        setResponse(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error predicting churn:", error);
        setLoading(false);
      });
    console.log("Customer data submitted:", customerData);
  };

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setWelcomeMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching welcome message:", error);
      });
  }, []);

  return (
    <>
      {welcomeMessage ? <h1>{welcomeMessage}</h1> : <p>Loading...</p>}
      <div>
        <p>
          This application allows you to predict whether a customer will churn
          based on various features. You can upload your dataset, and the app
          will use a trained machine learning model to make predictions.
        </p>
        <p>To get started, please enter the customer details.</p>
        <ul>
          <li>
            Gender:
            <ul>
              <li>
                Male{" "}
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={customerData.gender === "Male"}
                  onClick={() =>
                    setCustomerData({ ...customerData, gender: "Male" })
                  }
                />
                Female{" "}
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={customerData.gender === "Female"}
                  onClick={() =>
                    setCustomerData({ ...customerData, gender: "Female" })
                  }
                />
              </li>
            </ul>
          </li>
          <li>
            SeniorCitizen:{" "}
            <input
              type="checkbox"
              name="seniorCitizen"
              value="1"
              checked={customerData.SeniorCitizen === 1}
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  SeniorCitizen: customerData.SeniorCitizen ? 0 : 1,
                })
              }
            />
          </li>
          <li>
            Partner: Whether the customer has a partner (Yes or No)
            <input
              type="radio"
              name="partner"
              value="Yes"
              checked={customerData.Partner === "Yes"}
              onClick={() =>
                setCustomerData({ ...customerData, Partner: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="partner"
              value="No"
              checked={customerData.Partner === "No"}
              onClick={() =>
                setCustomerData({ ...customerData, Partner: "No" })
              }
            />{" "}
            No
          </li>
          <li>
            Dependents: Whether the customer has dependents (Yes or No)
            <input
              type="radio"
              name="dependents"
              value="Yes"
              checked={customerData.Dependents === "Yes"}
              onClick={() =>
                setCustomerData({ ...customerData, Dependents: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="dependents"
              value="No"
              checked={customerData.Dependents === "No"}
              onClick={() =>
                setCustomerData({ ...customerData, Dependents: "No" })
              }
            />{" "}
            No
          </li>
          <li>
            Tenure: Number of months the customer has stayed with the company
            <input
              type="number"
              name="tenure"
              value={customerData.tenure}
              onChange={(e) =>
                setCustomerData({ ...customerData, tenure: e.target.value })
              }
            />
          </li>
          <li>
            PhoneService: Whether the customer has phone service (Yes or No)
            <input
              type="radio"
              name="phoneService"
              value="Yes"
              checked={customerData.PhoneService === "Yes"}
              onClick={() =>
                setCustomerData({ ...customerData, PhoneService: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="phoneService"
              value="No"
              checked={customerData.PhoneService === "No"}
              onClick={() =>
                setCustomerData({ ...customerData, PhoneService: "No" })
              }
            />{" "}
            No
          </li>
          <li>
            MultipleLines: Whether the customer has multiple lines (Yes, No, or
            No phone service)
            <input
              type="radio"
              name="multipleLines"
              value="Yes"
              checked={customerData.MultipleLines === "Yes"}
              onClick={() =>
                setCustomerData({ ...customerData, MultipleLines: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="multipleLines"
              value="No"
              onClick={() =>
                setCustomerData({ ...customerData, MultipleLines: "No" })
              }
            />{" "}
            No
            <input
              type="radio"
              name="multipleLines"
              value="No phone service"
              checked={customerData.MultipleLines === "No phone service"}
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  MultipleLines: "No phone service",
                })
              }
            />{" "}
            No phone service
          </li>
          <li>
            InternetService: Type of internet service (DSL, Fiber optic, or No)
            <input
              type="radio"
              name="internetService"
              checked={customerData.InternetService === "DSL"}
              value="DSL"
              onClick={() =>
                setCustomerData({ ...customerData, InternetService: "DSL" })
              }
            />{" "}
            DSL
            <input
              type="radio"
              name="internetService"
              value="Fiber optic"
              checked={customerData.InternetService === "Fiber optic"}
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  InternetService: "Fiber optic",
                })
              }
            />{" "}
            Fiber optic
            <input
              type="radio"
              name="internetService"
              value="No"
              checked={customerData.InternetService === "No"}
              onClick={() =>
                setCustomerData({ ...customerData, InternetService: "No" })
              }
            />{" "}
            No
          </li>
          <li>
            OnlineSecurity: Whether the customer has online security (Yes, No,
            or No internet service)
            <input
              type="radio"
              name="onlineSecurity"
              checked={customerData.OnlineSecurity === "Yes"}
              value="Yes"
              onClick={() =>
                setCustomerData({ ...customerData, OnlineSecurity: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="onlineSecurity"
              checked={customerData.OnlineSecurity === "No"}
              value="No"
              onClick={() =>
                setCustomerData({ ...customerData, OnlineSecurity: "No" })
              }
            />{" "}
            No
            <input
              type="radio"
              name="onlineSecurity"
              value="No internet service"
              checked={customerData.OnlineSecurity === "No internet service"}
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  OnlineSecurity: "No internet service",
                })
              }
            />{" "}
            No internet service
          </li>
          <li>
            OnlineBackup: Whether the customer has online backup (Yes, No, or No
            internet service)
            <input
              type="radio"
              name="onlineBackup"
              checked={customerData.OnlineBackup === "Yes"}
              value="Yes"
              onClick={() =>
                setCustomerData({ ...customerData, OnlineBackup: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="onlineBackup"
              checked={customerData.OnlineBackup === "No"}
              value="No"
              onClick={() =>
                setCustomerData({ ...customerData, OnlineBackup: "No" })
              }
            />{" "}
            No
            <input
              type="radio"
              name="onlineBackup"
              checked={customerData.OnlineBackup === "No internet service"}
              value="No internet service"
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  OnlineBackup: "No internet service",
                })
              }
            />{" "}
            No internet service
          </li>
          <li>
            DeviceProtection: Whether the customer has device protection (Yes,
            No, or No internet service)
            <input
              type="radio"
              name="deviceProtection"
              checked={customerData.DeviceProtection === "Yes"}
              value="Yes"
              onClick={() =>
                setCustomerData({ ...customerData, DeviceProtection: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="deviceProtection"
              checked={customerData.DeviceProtection === "No"}
              value="No"
              onClick={() =>
                setCustomerData({ ...customerData, DeviceProtection: "No" })
              }
            />{" "}
            No
            <input
              type="radio"
              name="deviceProtection"
              value="No internet service"
              checked={customerData.DeviceProtection === "No internet service"}
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  DeviceProtection: "No internet service",
                })
              }
            />{" "}
            No internet service
          </li>
          <li>
            TechSupport: Whether the customer has tech support (Yes, No, or No
            internet service)
            <input
              type="radio"
              name="techSupport"
              checked={customerData.TechSupport === "Yes"}
              value="Yes"
              onClick={() =>
                setCustomerData({ ...customerData, TechSupport: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="techSupport"
              checked={customerData.TechSupport === "No"}
              value="No"
              onClick={() =>
                setCustomerData({ ...customerData, TechSupport: "No" })
              }
            />{" "}
            No
            <input
              type="radio"
              name="techSupport"
              checked={customerData.TechSupport === "No internet service"}
              value="No internet service"
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  TechSupport: "No internet service",
                })
              }
            />{" "}
            No internet service
          </li>
          <li>
            StreamingTV: Whether the customer has streaming TV (Yes, No, or No
            internet service)
            <input
              type="radio"
              name="streamingTV"
              checked={customerData.StreamingTV === "Yes"}
              value="Yes"
              onClick={() =>
                setCustomerData({ ...customerData, StreamingTV: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="streamingTV"
              checked={customerData.StreamingTV === "No"}
              value="No"
              onClick={() =>
                setCustomerData({ ...customerData, StreamingTV: "No" })
              }
            />{" "}
            No
            <input
              type="radio"
              name="streamingTV"
              checked={customerData.StreamingTV === "No internet service"}
              value="No internet service"
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  StreamingTV: "No internet service",
                })
              }
            />{" "}
            No internet service
          </li>
          <li>
            StreamingMovies: Whether the customer has streaming movies (Yes, No,
            or No internet service)
            <input
              type="radio"
              name="streamingMovies"
              checked={customerData.StreamingMovies === "Yes"}
              value="Yes"
              onClick={() =>
                setCustomerData({ ...customerData, StreamingMovies: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="streamingMovies"
              checked={customerData.StreamingMovies === "No"}
              value="No"
              onClick={() =>
                setCustomerData({ ...customerData, StreamingMovies: "No" })
              }
            />{" "}
            No
            <input
              type="radio"
              name="streamingMovies"
              checked={customerData.StreamingMovies === "No internet service"}
              value="No internet service"
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  StreamingMovies: "No internet service",
                })
              }
            />{" "}
            No internet service
          </li>
          <li>
            Contract: Type of contract (Month-to-month, One year, or Two year)
            <input
              type="radio"
              name="contract"
              value="Month-to-month"
              checked={customerData.Contract === "Month-to-month"}
              onClick={() =>
                setCustomerData({ ...customerData, Contract: "Month-to-month" })
              }
            />{" "}
            Month-to-month
            <input
              type="radio"
              name="contract"
              value="One year"
              checked={customerData.Contract === "One year"}
              onClick={() =>
                setCustomerData({ ...customerData, Contract: "One year" })
              }
            />{" "}
            One year
            <input
              type="radio"
              name="contract"
              value="Two year"
              checked={customerData.Contract === "Two year"}
              onClick={() =>
                setCustomerData({ ...customerData, Contract: "Two year" })
              }
            />{" "}
            Two year
          </li>
          <li>
            PaperlessBilling: Whether the customer has paperless billing (Yes or
            No)
            <input
              type="radio"
              name="paperlessBilling"
              checked={customerData.PaperlessBilling === "Yes"}
              value="Yes"
              onClick={() =>
                setCustomerData({ ...customerData, PaperlessBilling: "Yes" })
              }
            />{" "}
            Yes
            <input
              type="radio"
              name="paperlessBilling"
              checked={customerData.PaperlessBilling === "No"}
              value="No"
              onClick={() =>
                setCustomerData({ ...customerData, PaperlessBilling: "No" })
              }
            />{" "}
            No
          </li>
          <li>
            PaymentMethod: Payment method (Electronic check, Mailed check, Bank
            transfer (automatic), or Credit card (automatic))
            <input
              type="radio"
              name="paymentMethod"
              value="Electronic check"
              checked={customerData.PaymentMethod === "Electronic check"}
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  PaymentMethod: "Electronic check",
                })
              }
            />{" "}
            Electronic check
            <input
              type="radio"
              name="paymentMethod"
              value="Mailed check"
              checked={customerData.PaymentMethod === "Mailed check"}
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  PaymentMethod: "Mailed check",
                })
              }
            />{" "}
            Mailed check
            <input
              type="radio"
              name="paymentMethod"
              checked={
                customerData.PaymentMethod === "Bank transfer (automatic)"
              }
              value="Bank transfer (automatic)"
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  PaymentMethod: "Bank transfer (automatic)",
                })
              }
            />{" "}
            Bank transfer (automatic)
            <input
              type="radio"
              name="paymentMethod"
              checked={customerData.PaymentMethod === "Credit card (automatic)"}
              value="Credit card (automatic)"
              onClick={() =>
                setCustomerData({
                  ...customerData,
                  PaymentMethod: "Credit card (automatic)",
                })
              }
            />{" "}
            Credit card (automatic)
          </li>
          <li>
            MonthlyCharges: The amount charged to the customer monthly
            <input
              type="number"
              name="monthlyCharges"
              value={customerData.MonthlyCharges}
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  MonthlyCharges: e.target.value,
                })
              }
            />
          </li>
          <li>
            TotalCharges: The total amount charged to the customer
            <input
              type="number"
              name="totalCharges"
              value={customerData.TotalCharges}
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  TotalCharges: e.target.value,
                })
              }
            />
          </li>
        </ul>
        <p>
          After uploading your details, the app will process the data and
          provide you with predictions on whether each customer is likely to
          churn or not. You can also view the accuracy of the model and other
          performance metrics.
        </p>
        <p>
          Thank you for using the Customer Churn Prediction App! We hope it
          helps you make informed decisions about your customers.
        </p>
        <button
          className="btnSubmit"
          type="reset"
          onClick={(e) => resetCustomerData(e)}
        >
          Reset
        </button>
        <button
          className="btnSubmit"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Predict Churn
        </button>
      </div>
      {response ? (
        <div className="resultSection">
          <>
            <p>{"Churn Prediction: " + response?.churn_prediction}</p>
            <p>{"Churn Probability: " + response?.churn_probability}</p>
          </>
        </div>
      ) : (
        Loading && <p>Loading...</p>
      )}
      <div ref={resultRef} style={{ height: "100px" }}></div>
    </>
  );
}

export default App;
