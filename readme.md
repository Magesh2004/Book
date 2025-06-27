# 📌 **Book-Author API**

## 📖 **What it does**

This project is a basic **CRUD API** server that demonstrates **one-to-many** and **many-to-one** relationships using **authors** and their **books**.

Each **author** can have **multiple books**, and each **book** belongs to a **single author**.

It was built for learning purposes to understand how to model and implement relational-like behavior in **PostgreSQL**.

---

## 🧱 **Tech Stack**

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **pg**
- **nodemon** (for dev)

---

## 🛠️ **How to use the API**

| Method | Endpoint                   | Description                            |
| ------ | -------------------------- | -------------------------------------- |
| GET    | `/author`                  | Fetch all authors                      |
| POST   | `/author`                  | Create a new author                    |
| GET    | `/author/:id`              | Fetch a single author with their books |
| PUT    | `/author/:id`              | Update an author                       |
| DELETE | `/author/:id`              | Delete an author                       |
| POST   | `/author/:id/book`         | Create a new book for that author      |
| GET    | `/author/:id/book/:bookid` | Fetch individual book                  |
| PUT    | `/author/:id/book/:bookid` | Update a specific book                 |
| DELETE | `/author/:id/book/:bookid` | Delete a specific book                 |

---

## ✅ **Example Requests & Responses**

### 📥 Create a new Author

**GET**`/author`

**Request Body:**

```json
{
  "name": "Dan Brown",
  "bio": "Author of thrillers"
}
```

**Response:**

```json
{
  "status": 201,
  "message": "Succesfully Created",
  "data": {
    "author": {
      "name": "Dan Brown",
      "bio": "Author of thrillers",
      "books": [],
      "_id": "685d17e8bd83d82420c2b888"
    }
  }
}
```

---

### 📥 Create a Book for an Author

**POST** `/author/60f...`

**Request Body:**

```json
{
  "book": {
    "name": "The tester",
    "nof_pages": 569
  }
}
```

**Response:**

```json
{
  "status": 201,
  "message": "Successfully created",
  "data": {
    "book": {
      "name": "The tester",
      "nof_pages": 569,
      "_id": "685d198d8a8828ba62717c79",
      "author": "685cf57456376fb2ab9f446a",
      "__v": 0
    }
  }
}
```

---

### 📤 Get an Author with Books

**GET** `http://localhost:8000/author/685cf57456376fb2ab9f446a`

**Response:**

```json
{
  "status": 200,
  "message": "Succesfully fetched",
  "data": {
    "author": {
      "_id": "685cf57456376fb2ab9f446a",
      "name": "Dan Brown",
      "bio": "American author known for thriller novels like The Da Vinci Code.",
      "books": [
        {
          "_id": "685cf57456376fb2ab9f4470",
          "name": "The Da Vinci Code",
          "nof_pages": 454,
          "author": "685cf57456376fb2ab9f446a",
          "__v": 0
        }
      ],
      "__v": 1
    }
  }
}
```

---

## 🙋 **Author & Contact**

**Author:** Magesh Balram

📧 **Email:** [mageshbalram@gmail.com](mailto:mageshbalram@gmail.com)


