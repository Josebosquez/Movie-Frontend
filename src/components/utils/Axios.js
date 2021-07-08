import axios from "axios";

const Axios = axios.create({ // creating a new instance/class from axios.
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "deploy CLOUD ADDRESS",
  timeout: 50000,
});

export default Axios;

//alternative
// process.env.NODE_ENV === 'production' 
// ? "deployed cloud address"
// : "http://localhost:8080"


// ' development is a key term.'

// 'when we deploy it we go to production.'


// operational error or error we dont anticipate -

// stack error - this does not get shown to userEvent.
