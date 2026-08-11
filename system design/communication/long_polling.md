Long polling is a technique where the client sends a request to the server, but the server does not respond immediately. Instead, it keeps the request open until new data becomes available or a timeout occurs.

As soon as the server responds, the client immediately sends another request to continue listening for updates.

Client                          Server
   | ------- Request -----------> |
   |                              | (wait...)
   |                              | (wait...)
   |                              | New data arrives
   | <------ Response ----------- |
   | ------- Request -----------> |  (immediately)
   |                              | (wait...)


# Advantages
- Better than frequent polling because it reduces unnecessary requests.
- Works over standard HTTP.
- Easier to implement than WebSockets.
- Good for applications with occasional updates.

# Disadvantages
- A new HTTP request is needed after every response.
- Holding many open connections can consume server resources.
- Less scalable for applications with thousands or millions of continuously connected users.

# Common use cases
1. Chat applications
2. Notification systems
3. Live dashboards with infrequent updates
4. Job status tracking
5. Real-time monitoring where updates are occasional

# Example: Chat application
- Step 1
Client asks:
GET /messages

No new messages exist.

Instead of returning:[]

the server waits.

- Step 2
Five seconds later someone sends: "Hello!"

Now the server responds:

{
  "message": "Hello!"
}

- Step 3
The client receives it and immediately sends another request: GET /messages

The cycle repeats.

- Timeout case
Suppose no new data arrives for 30 seconds.

The server returns:

{
  "messages": []
}

The client immediately sends another request.

This prevents connections from staying open forever.