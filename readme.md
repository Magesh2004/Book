# 📌 **Book_India (UI for Book-Author API)**

## 📖 **What it does**

This project is the **frontend UI** for interacting with the **Book-Author API**.

It allows users to **view**, **create**, **edit**, and **delete** authors and their books through a simple web interface built using **Express and EJS** templating.

It complements the backend API by providing a visual experience for managing the one-to-many relationship between authors and books.

---

## 🧱 **Tech Stack**

- **Node.js**
- **Express.js**
- **EJS** (Templating engine)
- **ejs-mate** (Layout support for EJS)
- **Mongoose** (MongoDB ORM)
- **Method-Override** (For HTTP verbs like PUT and DELETE via forms)

---

## 🛠️ **Available UI Routes**

| Method | Route                           | Description                               |
| ------ | ------------------------------- | ----------------------------------------- |
| GET    | `/`                             | Home page                                 |
| GET    | `/author`                       | View all authors                          |
| GET    | `/author/new`                   | Form to create a new author               |
| POST   | `/author`                       | Submit new author                         |
| GET    | `/author/:id`                   | View an individual author and their books |
| GET    | `/author/:id/edit`              | Edit an author                            |
| PUT    | `/author/:id`                   | Submit author edit                        |
| DELETE | `/author/:id`                   | Delete an author                          |
| GET    | `/author/:id/book/new`          | Form to add a new book to the author      |
| POST   | `/author/:id/book`              | Submit new book                           |
| GET    | `/author/:id/book/:bookid/edit` | Edit book form                            |
| PUT    | `/author/:id/book/:bookid`      | Submit book edit                          |
| DELETE | `/author/:id/book/:bookid`      | Delete book                               |

---

## ✅ **Example UI Usage**

1. 🧑‍💼 **Add Author**:

   Visit `/author/new` → Fill in name and bio → Submit.

   ![image.png](attachment:2d72f69f-83da-4631-80ea-a2250b5f9388:image.png)

2. 📚 **Add Book to Author**:

   Visit an author's detail page → Click "Add Book" → Fill book details → Submit.

   ![image.png](attachment:2c4b017c-b9e9-47bd-a6ca-e5692706331f:image.png)

3. 📝 **Edit or Delete**:

   Buttons available on author/book pages to edit or delete.

   ![image.png](attachment:bdfd92d1-8b75-4644-8d98-555e752eeccc:image.png)

4. 🌐 **Dynamic Views**

   - All pages rendered with **EJS templates**
   - Layouts powered by **ejs-mate**
   - Home pages

   ![image.png](attachment:8cabea9c-9756-4934-8e20-b3cc130befab:image.png)

---

## 🙋 **Author & Contact**

**Author:** Magesh Balram

📧 **Email:** [mageshbalram4@gmail.com](mailto:mageshbalram@gmail.com)
