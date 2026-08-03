{
    "timestamp": "2026-05-25T14:21:51.647+00:00",
    "status": 404,
    "error": "Not Found",
    "path": "/api/public/category/100"
}

Why message is missing?

In newer Spring Boot versions (Spring Boot 3+), the error message is hidden by default for security reasons.

Fix

Add this in: application.properties
server.error.include-message=always

Then you'll get response ->
{
    "timestamp": "2026-05-25T14:21:51.647+00:00",
    "status": 404,
    "error": "Not Found",
    "message": "Resource not found",
    "path": "/api/public/category/100"
}