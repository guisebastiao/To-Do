export const api = "http://localhost:5000/";

export const requestConfig = (method, data) => {
  let config;

  if(method === "GET"){
    config = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      }
    }
  } else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    }
  }


  const user = JSON.parse(localStorage.getItem("user"));

  if(user){
    const { token } = user;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}
