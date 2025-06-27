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
  "message": "Successfully Created",
  "data": {}
}
```

---

### 📥 Create a Book for an Author

**POST** `/author/1`

**Request Body:**

```json
{
  "book": {
    "name": "The Da Vinci Code",
    "nof_pages": 454
  }
}
```

**Response:**

```json
{
  "status": 201,
  "message": "Successfully Created",
  "data": {}
}
```

---

### 📤 Get an Author with Books

**GET** `http://localhost:8000/author/1`

**Response:**

```json
{
    "status": 200,
    "message": "Successfully fetched",
    "data": {
        "author": [
            {
                "id": 5,
                "name": "Dan Brown",
                "bio": "American author known for thriller novels like The Da Vinci Code."
            }
        ],
        "book": [
            {
                "id": 2,
                "name": "The Da Vinci Code",
                "nof_pages": 454,
                "author_id": 5
            }
        ]
    }
}
```

---

## 🙋 **Author & Contact**

**Author:** Magesh Balram

📧 **Email:** [mageshbalram@gmail.com](mailto:mageshbalram@gmail.com)


