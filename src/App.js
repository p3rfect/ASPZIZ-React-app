import React from 'react';
import MyInput from "./components/UI/input/MyInput";
function App() {

    let email = '', password = '', tokenKey;
  const login = async () => {
      console.log(email, password)
      await getTokenAsync()
  }

    async function getTokenAsync() {
          // получаем данные формы и фомируем объект для отправки
          const formData = new FormData();
          formData.append("grant_type", "password");
          formData.append("email", email);
          formData.append("password", password);

          // отправляет запрос и получаем ответ
          const response = await fetch("https://localhost:44387/token", {
              method: "POST",
              headers: {"Accept": "application/json", "Access-Control-Allow-Origin": "https://localhost:3000"},
              body: formData,
              // mode: "no-cors"
          });
          // получаем данные
          const data = await response.json();

          // если запрос прошел нормально
          if (response.ok === true) {

              // изменяем содержимое и видимость блоков на странице
              // document.getElementById("userName").innerText = data.email;
              // document.getElementById("userInfo").style.display = "block";
              // document.getElementById("loginForm").style.display = "none";
              // сохраняем в хранилище sessionStorage токен доступа
              sessionStorage.setItem(tokenKey, data.access_token);
              console.log(data.access_token, "!!!!!!");
          } else {
              // если произошла ошибка, из errorText получаем текст ошибки
              console.log("Error: ", response.status, data.errorText);
          }
    }

  const setEmail = function(newValue){
      email = newValue
  }
  const setPassword = function(newValue){
      password = newValue
  }

  return (
    <div style={{textAlign: "center", verticalAlign: "middle"}}>
      <h1 style={{fontSize: "100px", marginTop: "170px", marginBottom: "0px", color: "teal", outlineWidth: "100px solid #666"}}>БГУИР</h1>
        <h2 style={{margin: "0px", color: "teal", fontSize: "30px"}}>Приемная кампания</h2>
        <div>
            <MyInput type="text" title="Логин" passValue={setEmail}/>
            <MyInput type="text" title="Пароль" passValue={setPassword}/>
            <button onClick={login} style={{width: "200px", height: "50px", marginTop: "50px"}}>Login</button>
        </div>
    </div>
  );
}

export default App;