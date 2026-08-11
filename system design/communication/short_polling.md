Short polling is a technique where a client repeatedly sends requests to the server at fixed intervals to check if new data is available.

# How it works
- Client sends a request to the server.
- Server immediately responds with the current data (or "no new data").
- Client waits for a fixed interval (e.g., 5 seconds).
- Client sends another request.
This cycle continues.

Client                     Server
   | ------ Request -------> |
   | <----- Response ------- |
   |      wait 5 sec         |
   | ------ Request -------> |
   | <----- Response ------- |
   |      wait 5 sec         |


# Advantages
1. Very simple to implement.
2. Works with any HTTP server.
3. No special protocols or persistent connections required.
4. Short lived connection


# Disadvantages
1. Many unnecessary requests when no new data exists.
2. Higher server load.
3. Increased network traffic.
4. Data isn't received instantly—it can be delayed until the next polling interval.

For example, if the polling interval is 10 seconds and new data arrives after 1 second, the client won't receive it for another 9 seconds.

# When to use
1. Real-time updates are not critical.
2. Data changes infrequently.
3. Simplicity is more important than efficiency.


# Examples:
1. Checking report generation status.
2. Refreshing dashboard metrics every minute.
3. Periodically checking for new emails or notifications.