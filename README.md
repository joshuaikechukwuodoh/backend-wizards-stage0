# Backend Wizards Stage 0

A single GET endpoint that integrates with Genderize API and returns a processed response.

## Endpoint

GET `/api/classify?name=john`

## Run locally

```bash
npm install
npm start
```

## Example Response

```json
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-16T12:00:00.000Z"
  }
}
```

## Deploy Fast (Best Option)
Deploy to entity["company","Railway","cloud deployment platform"].

1. Push to GitHub
2. Open Railway
3. New Project → Deploy from GitHub
4. Select repo
5. Copy live URL

Your base URL becomes:

```text
https://your-app.up.railway.app
````

Submission URL:

```text
https://your-app.up.railway.app/api/classify?name=john
```

---

## Test Before Submit

```bash
curl "http://localhost:3000/api/classify?name=john"
```
















