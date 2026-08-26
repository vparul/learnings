# 1. What is a Webhook?

A **webhook** is a way for one application/server to automatically notify another application/server when something happens.

* It is mainly **server-to-server communication**.
* Instead of repeatedly asking for updates, the receiving server waits for a notification.

## Simple Example

Suppose you have an online store and use a payment service.

### Without Webhook

Your Server -> Payment Server: Is payment completed?

Payment Server -> Your Server: No

Your Server -> Payment Server: Is payment completed?

Payment Server -> Your Server: Yes

### With Webhook

Customer pays
     |
     v
Payment Server
     |
     | HTTP POST
     v
Your Server
     |
     v
Payment received

The payment service automatically tells your server when the payment is completed.

## Main Example

A webhook follows this basic pattern:

Event happens
     |
     v
Sender Server
     |
     | HTTP Request
     v
Receiver Server
     |
     v
Process the event

The receiver does not continuously ask:

> "Did something happen?"

Instead, the sender says:

> "Something happened. Here is the information."

# 2. How a Webhook Works

## Step 1 — Receiver Creates an Endpoint

Your application provides a URL:

http
POST /webhooks/payment


For example:
https://example.com/webhooks/payment

This endpoint waits for webhook requests.

## Step 2 — Receiver Gives the URL to the Sender

For example, you tell a payment provider:

Send payment events to:

https://example.com/webhooks/payment


## Step 3 — An Event Happens

Customer completes payment

The payment service detects the event.

## Step 4 — Sender Sends an HTTP Request

The payment service sends:

http
POST /webhooks/payment
Content-Type: application/json


With data:

json
{
  "event": "payment.completed",
  "paymentId": "12345",
  "amount": 500
}


## Step 5 — Your Server Processes It

Your server receives the request:


Webhook received
       |
       v
Verify request
       |
       v
Check event
       |
       v
Process payment
       |
       v
Return HTTP 200


                    CUSTOMER
                       |
                       | Pays ₹500
                       v
              ┌─────────────────┐
              │ PAYMENT GATEWAY │
              │                 │
              │  SENDER SERVER  │
              └────────┬────────┘
                       |
                       | Webhook
                       | HTTP POST
                       | "Payment successful!"
                       v
              ┌─────────────────┐
              │   YOUR BACKEND  │
              │                 │
              │ RECEIVER SERVER │
              └────────┬────────┘
                       |
                       | Update payment
                       v
                 ┌────────────┐
                 │  DATABASE  │
                 │            │
                 │ PAID ✅    │
                 └────────────┘

# 3. Important Point

A webhook is generally **not a permanent connection**.

This is different from SSE.

### SSE


Client -------------------- Server

       Long-lived connection

       Event
       Event
       Event


### Webhook


Server A -------- HTTP POST --------> Server B

              Request ends


When the webhook request is completed, the connection normally ends.

Later, another event can create another HTTP request.


# 4. Advantages of Webhooks

## 4.1 No Polling

The receiver does not need to repeatedly ask:


Anything happened?
Anything happened?
Anything happened?


Instead:


Something happened!
        |
        v
     Webhook


This reduces unnecessary requests.

## 4.2 Real-Time Notifications

The sender can notify the receiver soon after an event occurs.

Example:


Payment completed
       |
       v
Webhook sent
       |
       v
Your server receives it


## 4.3 Simple

Webhooks usually use normal HTTP requests.

Typically:

http
POST /webhook


with JSON data.

You don't need to maintain a permanent connection.

## 4.4 Good for Server-to-Server Communication

Webhooks are mainly designed for:


Application A -> Application B


Examples:

* Payment Service -> Your Backend
* GitHub -> Your Backend
* Email Service -> Your Backend
* Shipping Service -> Your Backend

## 4.5 Efficient

The receiver only gets a request when an event occurs.

For example, if a payment happens 10 times:


10 payments
     |
     v
10 webhook requests


You don't need to make thousands of requests asking whether a payment happened.

# 5. Disadvantages of Webhooks

## 5.1 Receiver Must Be Reachable

The sender needs to access your webhook URL.

For example:


Payment Server
      |
      | HTTP POST
      v
Your Server


Your endpoint generally needs to be publicly reachable or otherwise accessible from the sender.

## 5.2 Delivery Can Fail

Suppose:


Payment Server
      |
      X
      |
Your Server


Possible reasons:

* Your server is down.
* Network failure occurs.
* Timeout happens.
* Your server returns an error.

The webhook may not be processed successfully.

Good webhook providers usually implement retry mechanisms.

## 5.3 Duplicate Events

A webhook may sometimes be delivered more than once.

Example:


payment.completed
       |
       v
Webhook #1
       |
       v
Webhook #2


Your application should be **idempotent**.

For example:


paymentId = 12345


Before processing:


Have I already processed payment 12345?


If yes:


Ignore duplicate


## 5.4 Security Risks

Your webhook endpoint is exposed to incoming requests.

You need to make sure the request really came from the expected service.

Common techniques include:

* Signature verification
* Secret tokens
* HTTPS
* IP allowlisting where appropriate
* Timestamp validation
* Replay protection

For example:


Webhook Request
      |
      v
Verify Signature
      |
      +---- Invalid ---> Reject
      |
      v
    Valid
      |
      v
Process Event

# 6. Common Webhook Use Cases

## 6.1 Payment Notifications

Example:


Customer pays
     |
     v
Payment Provider
     |
     | webhook
     v
Your Backend
     |
     v
Mark order as PAID


Events might include:


payment.completed
payment.failed
payment.refunded


## 6.2 GitHub Events

For example:


Developer pushes code
       |
       v
GitHub
       |
       | webhook
       v
CI/CD Server
       |
       v
Run build


## 6.3 Email Services

For example:


Email sent
     |
     v
Email Provider
     |
     | webhook
     v
Your Backend


Your backend can receive events such as:


email.sent
email.delivered
email.bounced
email.opened


## 6.4 Shipping Updates


Package shipped
       |
       v
Shipping Service
       |
       | webhook
       v
Your Backend
       |
       v
Update order status


## 6.5 User Account Events

For example:


User registered
       |
       v
Authentication Service
       |
       | webhook
       v
Your Backend


# 7. What Happens If There Is No Event?

This is different from SSE.

With a webhook:


No event
   |
   v
Nothing happens


There is no permanent connection waiting for an event.

Example:


10:00 -> No event -> Nothing

10:01 -> No event -> Nothing

10:02 -> No event -> Nothing

10:03 -> Payment completed
                 |
                 v
              Webhook


The sender creates an HTTP request only when there is something to report.

# 8. What If the Receiver Is Down?

Suppose:


Payment Provider
       |
       | Webhook
       v
Your Server ❌


Your server is down.

The webhook request may fail.

A good webhook provider may retry:


Attempt 1 -> Failed
Attempt 2 -> Failed
Attempt 3 -> Success


The exact retry behavior depends on the provider.

Therefore, webhook systems should be designed to handle:

* Retries
* Duplicate events
* Temporary failures

# 9. Webhook Security

Never blindly trust incoming webhook data.

A basic flow should be:


Webhook received
       |
       v
Verify HTTPS
       |
       v
Verify signature
       |
       v
Check timestamp/event ID
       |
       v
Check duplicate
       |
       v
Process event
       |
       v
Return 2xx response