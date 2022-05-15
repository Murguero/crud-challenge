### Users

#### Realizar Cadastro de um usuário

**URL** : `http://localhost:{PORT}/create`

**Method** : `POST`

**Header**

### Request

**Body**

```json
{
  "name": "John Doe",
  "email": "john.doe@gmail.com",
  "password": "123456"
}
```

## Success Response

**Code** : `200`

```json
{
  "name": "John Doe",
  "email": "john.doe@gmail.com"
}
```

---

#### Realizar Login

**URL** : `http://localhost:{PORT}/login`

**Method** : `POST`

**Header**

### Request

**Body**

```json
{
  "email": "john.doe@gmail.com",
  "password": "123456"
}
```

## Success Response

**Code** : `200`

```json
{
  "user": {
    "name": "John Doe",
    "email": "john.doe@gmail.com"
  },
  "token": "ACCESS_TOKEN"
}
```

---

#### Deletar um usuário

**URL** : `http://localhost:{PORT}/delete`

**Method** : `DELETE`

**Header**: `Authorization` = `Bearer {ACCESS_TOKEN}`

### Request

**Body**

## Success Response

**Code** : `200` - No content

---

#### Atualizar um usuário

**URL** : `http://localhost:{PORT}/update`

**Method** : `PUT`

**Header**: `Authorization` = `Bearer {ACCESS_TOKEN}`

### Request

**Body**

```json
{
  "name": "John Doe 2",
  "email": "john.doe@gmail.com"
}
```

## Success Response

**Code** : `200`

```json
{
  "name": "John Doe 2",
  "email": "john.doe@gmail.com"
}
```

---

#### Listar um usuário

**URL** : `http://localhost:{PORT}/me`

**Method** : `GET`

**Header**: `Authorization` = `Bearer {ACCESS_TOKEN}`

### Request

**Body**

## Success Response

**Code** : `200`

```json
{
  "user": {
    "name": "John Doe 2",
    "email": "john.doe@gmail.com"
  },
  "address": [
    {
      "cep": "76844974",
      "street": "Goiás",
      "houseNumber": "3054",
      "neighborhood": "Planalto",
      "city": "Parintins",
      "state": "Amazonas",
      "country": "BR"
    }
  ]
}
```

---

## Error Responses

**Condition** : Se algum dado obrigatório do corpo da requisição for omitido ou inválido

**Code** : `400 Bad Request`

**Content example**

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "validation": {
    "body": {
      "source": "body",
      "keys": ["name"],
      "message": "\"name\" is required"
    }
  }
}
```

---

**Condition** : Se o formato do corpo da requisição for inválido

**Code** : `500 Internal Server Error`

**Content example**

```json
{
  "message": "Internal server error",
  "category": "INTERNAL_ERROR"
}
```

---

**Condition** : Se `authorization` for omitido ou inválido

**Code** : `401 Unauthorized`

**Content example**

```json
{
  "status": "error",
  "message": "JWT token is missing"
}
```

---
