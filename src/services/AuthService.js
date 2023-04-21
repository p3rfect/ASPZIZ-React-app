export async function getTokenAsync(email, password) {
    // получаем данные формы и фомируем объект для отправки
    const formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("email", email);
    formData.append("password", password);

    // отправляет запрос и получаем ответ
    const response = await fetch("https://localhost:44387/token", {
        method: "POST",
        headers: {"Accept": "application/json"},
        body: formData,
        mode: "cors"
    });
    // получаем данные
    const data = await response.json();

    // если запрос прошел нормально
    if (response.ok === true) {

        // изменяем содержимое и видимость блоков на странице
        sessionStorage.setItem("tokenKey", data.access_token);

    } else {
        // если произошла ошибка, из errorText получаем текст ошибки
        throw new Error(data.errorText)
    }
}

export const register = async (email, password) => {
    const formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch("https://localhost:44387/register", {
        method: "POST",
        headers: {"Accept": "application/json"},
        body: formData,
        mode: "cors"
    });
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.errorText)
    }
}

export const isNotAuthed = () => sessionStorage.getItem("tokenKey") === null