# Angular Project: Book, Author, and Publisher Management

This project is an Angular application designed to manage **books**, **authors**, and **editors** through an intuitive interface. It uses Angular services to interact with a backend REST API.
You can test the api with symfony project https://github.com/SimFerrer/symfony-bibliotheque

## Features

- **Authors Management**: Create, read, update, and delete authors.
- **Books Management**: Create, read, update, and delete books.
- **Publishers Management**: Create, read, update, and delete publishers.
- Pagination for listing items by page.
- Date formatting for authors.
- Modular architecture for better maintainability.

---

## Installation and Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **Angular CLI** (v15 or higher)
- Functional backend exposing a REST API (default: `http://localhost:8000`)

### Steps

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular application:
   ```bash
   ng serve
   ```

4. Access the application in your browser:
   ```
   http://localhost:4200
   ```

---

## REST API

The application relies on a backend API with the following endpoints:

### Common Endpoints
| Resource     | Method  | Endpoint                     | Description                |
|---------------|----------|-----------------------------|----------------------------|
| Authors       | `GET`    | `/api/author`               | Paginated list of authors. |
|               | `GET`    | `/api/author/{id}`          | Author details.            |
|               | `POST`   | `/api/author/create`        | Create an author.          |
|               | `PUT`    | `/api/author/edit`          | Update an author.          |
|               | `DELETE` | `/api/author/{id}`          | Delete an author.          |
| Books         | `GET`    | `/api/book`                 | Paginated list of books.   |
|               | `GET`    | `/api/book/{id}`            | Book details.              |
|               | `POST`   | `/api/book/create`          | Create a book.             |
|               | `PUT`    | `/api/book/edit`            | Update a book.             |
|               | `DELETE` | `/api/book/{id}`            | Delete a book.             |
| Publishers    | `GET`    | `/api/editor`               | Paginated list of editors. |
|               | `GET`    | `/api/editor/{id}`          | Editor details.            |
|               | `POST`   | `/api/editor/create`        | Create an editor.          |
|               | `PUT`    | `/api/editor/edit`          | Update an editor.          |
|               | `DELETE` | `/api/editor/{id}`          | Delete an editor.          |

---

## Angular Services

### BaseService
A generic service to centralize CRUD operations. Specific services (like `AuthorService`, `BookService`, `EditorService`) inherit from this class.

```typescript
export abstract class BaseService<T, R> {
  constructor(protected http: HttpClient, private apiUrl: string) {}

  getAll(page: number = 0): Observable<R> {
    return this.http.get<R>(`${this.apiUrl}?page=${page}`);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(entity: T): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, entity);
  }

  update(entity: T, id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit`, { ...entity, id });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
```


