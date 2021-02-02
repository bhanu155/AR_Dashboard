import axios from "axios";
import { SERVER_URL, ROLL_NUMBER } from "../utils/constants";

export function serviceCall() {
  return axios.post(`${SERVER_URL}`);
}

export function callDummyAPI(name) {
  return axios.post(
    `${SERVER_URL}${ROLL_NUMBER}/dummy.do?`,
    {},
    {
      headers: { "Content-Type": "application/json" },
      params: { name: name },
    }
  );
}

export function fetchAllInvoicesData() {
  console.log("hello");
  axios.get("http://localhost:8080/1729025/invoices").then((res) => {
    return res.data;
  });
}
