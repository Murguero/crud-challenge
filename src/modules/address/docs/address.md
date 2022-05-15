### Address

#### Realizar Cadastro de um endereço

**URL** : `http://localhost:{PORT}/create`

**Method** : `POST`

**Header**: `Authorization` = `Bearer {ACCESS_TOKEN}`

### Request

**Body**

```json
{
  "cep": "69267135",
  "street": "Dezesseis",
  "houseNumber": "4905",
  "neighborhood": "Vila Nova",
  "city": "Boa Vista",
  "state": "Roraima",
  "country": "BR"
}
```

## Success Response

**Code** : `200`

```json
{
  "id": "{ADDRESS_ID}",
  "cep": "69267135",
  "street": "Dezesseis",
  "houseNumber": "4905",
  "neighborhood": "Vila Nova",
  "city": "Boa Vista",
  "state": "Roraima",
  "country": "BR"
}
```

---

#### Listar um endereço

**URL** : `http://localhost:{PORT}/address/:ADDRESS_ID`

**Method** : `GET`

**Header**: `Authorization` = `Bearer {ACCESS_TOKEN}`

### Request

**Body**

## Success Response

**Code** : `200`

```json
{
  "id": "{ADDRESS_ID}",
  "cep": "69267135",
  "street": "Dezesseis",
  "houseNumber": "4905",
  "neighborhood": "Vila Nova",
  "city": "Boa Vista",
  "state": "Roraima",
  "country": "BR"
}
```

---

#### Deletar um endereço

**URL** : `http://localhost:{PORT}/address/delete/:ADDRESS_ID`

**Method** : `DELETE`

**Header**: `Authorization` = `Bearer {ACCESS_TOKEN}`

### Request

**Body**

## Success Response

**Code** : `200` - No content

---

#### Atualizar um endereço

**URL** : `http://localhost:{PORT}/address/update/:ADDRESS_ID`

**Method** : `PUT`

**Header**: `Authorization` = `Bearer {ACCESS_TOKEN}`

### Request

**Body**

```json
{
  "cep": "76844974",
  "street": "Goiás",
  "houseNumber": "3054",
  "neighborhood": "Planalto",
  "city": "Parintins",
  "state": "Amazonas",
  "country": "BR"
}
```

## Success Response

**Code** : `200`

```json
{
  "cep": "76844974",
  "street": "Goiás",
  "houseNumber": "3054",
  "neighborhood": "Planalto",
  "city": "Parintins",
  "state": "Amazonas",
  "country": "BR"
}
```

---

#### Listar endereço a partir do País

**URL** : `http://localhost:{PORT}/address/filter?country={SIGLA}`

**Method** : `GET`

**Header**: `Authorization` = `Bearer {ACCESS_TOKEN}`

### Request

**Body**

## Success Response

**Code** : `200`

```json
[
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
      "keys": ["state"],
      "message": "\"state\" is required"
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
