## Performance testing

Performance testing is the process of evaluating an application's:

* **Speed** — How quickly does it respond?
* **Scalability** — How does it behave as the number of users increases?
* **Stability** — Does it remain reliable under sustained load?
* **Resource usage** — How much CPU, memory, network, database resources, etc. does it consume?
* **Capacity** — How much traffic/load can the system handle?

### Example

Suppose an API behaves like this:

100 users      → 200 ms response time
1,000 users    → 300 ms response time
10,000 users   → 2 sec response time
50,000 users   → API starts failing


Performance testing helps us understand where and why the system starts degrading**.


# 2. How is Performance Testing Performed?

We generally don't manually open thousands of browser tabs or send thousands of requests.

Instead, we use **performance/load-testing tools** to generate controlled traffic.


              Performance Test Tool
                       |
                       | Generates requests
                       ↓
                Application
                       |
          ┌────────────┼────────────┐
          ↓            ↓            ↓
         API        Database       Cache
          |
          ↓
      Collect Metrics
          |
          ↓
     Analyze Results


Common tools:

* Apache JMeter
* k6
* Gatling
* Apache Benchmark



# 3. What Do We Measure?

Suppose we have:


GET /api/products


We might define a requirement:

> The API should respond within 500 ms for 95% of requests with 1,000 concurrent users.

After running the test:


Users:              1,000
Total Requests:     100,000
Average Response:   320 ms
P95 Response:       480 ms
P99 Response:       1.2 sec
Error Rate:         0.2%


We can then determine whether the application meets our performance requirements.

### Important Metrics

| Metric            | Meaning                                                      |
| -- |  |
| **Latency**       | Time taken for a request to receive a response               |
| **Response Time** | Overall time taken to process a request                      |
| **Throughput**    | Number of requests processed per unit of time                |
| **Error Rate**    | Percentage of requests that fail                             |
| **CPU Usage**     | CPU consumed by the application                              |
| **Memory Usage**  | Memory consumed by the application                           |
| **Concurrency**   | Number of requests/users being handled simultaneously        |
| **P95/P99**       | Response-time percentile for the slowest portion of requests |



# 4. Types of Performance Testing

## Load Testing

Tests the application under **expected/normal traffic**.


Expected traffic = 10,000 users

Test:
10,000 users


### Question it answers

> Can the system handle the expected workload?



## Stress Testing

Gradually increases the load beyond the expected capacity.


10K → 20K → 30K → 50K → 100K users


### Question it answers

> At what point does the system start degrading or failing?



## Spike Testing

Suddenly increases the traffic.


1K users
   ↓
   ↓ sudden spike
   ↓
50K users


### Example

A flash sale suddenly starts and traffic increases dramatically.

### Question it answers

> Can the system handle sudden traffic spikes?



## Soak / Endurance Testing

Runs the application under a sustained load for a long period.


10,000 users
      ↓
      ↓
      ↓
    8 hours


### Useful for finding:

* Memory leaks
* Connection leaks
* Resource exhaustion
* Performance degradation over time

### Question it answers

> Does the application remain stable under sustained load?



## Volume Testing

Tests the system with a **large amount of data**.


10,000 records
      ↓
1 million records
      ↓
100 million records


### Question it answers

> Does the application continue to perform well when the amount of data becomes very large?



# 5. How Do We Test a Frontend?

For frontend applications such as React, performance testing can focus on page loading, rendering, JavaScript execution, API calls, and user interactions.

Example:


Browser
   ↓
HTML received
   ↓
JavaScript downloaded
   ↓
React executes
   ↓
API calls
   ↓
Components render
   ↓
User can interact


We can measure:

* LCP — Largest Contentful Paint
* INP — Interaction to Next Paint
* CLS — Cumulative Layout Shift
* TTFB — Time to First Byte
* JavaScript bundle size
* API response time
* Memory usage
* Rendering performance

### Common frontend tools

* Chrome DevTools
* Lighthouse
* WebPageTest
* React Profiler



# 6. Performance Testing vs Performance Monitoring

These are different concepts.

## Performance Testing

We **generate controlled traffic** and test the system.


Test Environment
      ↓
Generate Load
      ↓
Measure Performance
      ↓
Analyze Results
      ↓
Find Bottlenecks


## Performance Monitoring

We observe the **real production system**.


Real Users
     ↓
Production
     ↓
Collect Metrics
     ↓
Dashboards / Alerts


Common monitoring/observability tools include:

* Datadog
* New Relic
* Grafana
* Prometheus



# 7. Performance Testing vs Load Testing

**Performance testing** is the broader concept.


Performance Testing
│
├── Load Testing
├── Stress Testing
├── Spike Testing
├── Soak Testing
└── Volume Testing


So:

> **Load testing is one type of performance testing.**



# 8. Interview Answer

### What is Performance Testing?

> **Performance testing is the process of evaluating an application's responsiveness, stability, scalability, and resource usage under a defined workload. We use tools to generate controlled traffic, measure metrics such as latency, throughput, response time and error rate, and identify performance bottlenecks and system capacity.**

### How is it performed?

> **We define the expected workload and performance requirements, use tools such as JMeter, k6, or Gatling to generate controlled traffic, monitor application and infrastructure metrics, and analyze the results to identify bottlenecks and determine whether the system meets its performance goals.**



# 9. Simple Mental Model

### A/B Testing


Two versions
     ↓
Split users
     ↓
Compare outcomes


### Performance Testing


One application
     ↓
Generate controlled load
     ↓
Measure system behavior
     ↓
Find bottlenecks / capacity

