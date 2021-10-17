import axios from "axios";
import Router from "next/router";

const handleLogout = async () => {
  try {
    await axios.delete("/api/logout");
    // reload page to check user again
    Router.reload();
  } catch (error) {
    console.error(error);
  }
};

export default handleLogout;
