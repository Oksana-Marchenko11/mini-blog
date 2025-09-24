# Інструкція з розгортання Mini-blog

## Вимоги

-   Node.js (рекомендовано останню LTS-версію)
-   npm

---

## 1. Встановлення залежностей

### Backend

1. Перейдіть у папку `backend`:
    ```
    cd backend
    ```
2. Встановіть залежності:
    ```
    npm install
    ```
    ### Frontend
3. Перейдіть у папку `frontend`:
    ```
    cd frontend
    ```
4. Встановіть залежності:
    ```
    npm install
    ```

---

## 2. Запуск додатку

### Backend

1. У папці `backend` запустіть сервер:
    ```
    npm start
    ```
    або
    ```
    npm run dev
    ```

### Frontend

1. У папці `frontend` запустіть фронтенд:
    ```
    npm run dev
    ```
2. Відкрийте браузер і перейдіть за адресою, яку покаже Vite (зазвичай http://localhost:5173).

---

## 3. Збірка фронтенду

1. Виконайте команду:
    ```
    npm run build
    ```
2. Для перегляду білду:
    ```
    npm run preview
    ```

---

## 4. Додатково

-   За потреби створіть `.env` файли для backend та frontend.
-   Для деплою або Docker — зверніться до README або технічної специфікації.
-   npm install react-router-dom
