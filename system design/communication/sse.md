# SSE (Server-Sent Events) is a way for a server to continuously send updates to a client over a single HTTP connection.

# How SSE works?
Client                         Server
  |                              |
  | ---- HTTP request ---------->|
  |                              |
  | <---- event 1 ---------------|
  | <---- event 2 ---------------|
  | <---- event 3 ---------------|
  | <---- event 4 ---------------|
  |                              |
  |       connection stays open  |


The client makes a normal HTTP request, but the server responds with: Content-Type: text/event-stream

Then the server can continuously send events:

data: Hello

data: New message received

data: Price changed to $120

Each event is separated by a blank line. That blank line tells the client: "This event is complete."

# How SSE works internally?

Step 1 — Client connects

The browser makes an HTTP request:

GET /events HTTP/1.1
Host: example.com
Accept: text/event-stream

The server responds:

HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

The important header is: Content-Type: text/event-stream

# SSE automatically reconnects

One of the nice features of browser SSE is automatic reconnection.

const source = new EventSource("/events");

If the connection breaks:

Client ────────X──────── Server
                 ↓
             reconnect
                 ↓
Client ──────────────── Server

The browser tries to reconnect.

The server can also specify a retry interval:

retry: 5000

Meaning: Try reconnecting after approximately 5 seconds

# Advantages of SSE
1. Easy to use
    - Simple API: EventSource
    -  Easier than WebSockets for one-way communication.
2. Real-time updates
    Data can be received immediately.
    No need for continuous polling.
3. Uses HTTP
    Works with normal HTTP/HTTPS infrastructure.
4. Automatic reconnection
    If connection breaks, the browser can automatically reconnect.
5. Good for streaming
    Useful when data arrives continuously or in small pieces.

# Disadvantages of SSE
1. One-way communication: SSE is mainly designed for Server → Client
2. Long-lived connections
    Connection remains open.
    Large numbers of users can mean many open connections.
    Server and infrastructure must be configured to handle them.
3. Proxy/load-balancer issues
    Some proxies or load balancers may close an idle connection.
    Timeouts need to be configured properly.
4. Text-based
    SSE is mainly designed for text/event data.
    WebSockets are more suitable when you need binary data or more complex two-way communication.

# Where is SSE Used?
1. Notifications
    New message received
    New friend request
    Order status changed
2. Live dashboards
    CPU: 50%
    Memory: 70%
    Requests: 10,000
3. Live scores
    Team A 2 - 1 Team B
4. Live logs
    Starting...
    Building...
    Testing...
    Deploying...
    Completed

# What happens if there is no data?

Suppose the client connects:

Client ─────────────── Server
       SSE connection

Then nothing happens for 1 minute:

10 sec → no data
20 sec → no data
30 sec → no data
60 sec → no data

The SSE connection itself does not have to close.

Although SSE can remain idle, something in between may close it.

Example:

Browser
   ↓
Load Balancer
   ↓
Nginx
   ↓
Server

Suppose the load balancer has a 60-second idle timeout.

If no data is sent for 60 seconds:

No activity
     ↓
Load balancer thinks connection is idle
     ↓
Connection closed

## Solution — Heartbeat

The server can periodically send a small heartbeat.

Server → Client: heartbeat
Server → Client: heartbeat
Server → Client: heartbeat

For example, every 20–30 seconds.

This tells the network:

"This connection is still alive."

Then when a real event occurs:

Server → Client: New notification