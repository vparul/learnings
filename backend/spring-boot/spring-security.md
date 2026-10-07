By default, Spring security provides the following credentials - 
- Default username -> user
- Default password -> Randomly generated in console in startup

Password changes every time application restrats. Meant only for development / testing

We can disable the generated password and define our own using the following properties: 

spring.security.user.name=admin
spring.security.user.password=ADMIN@123
spring.security.user.roles=USER,ADMIN

There are two ways of authenticating the user - 
1. Form Login (default)
2. Http Basic

# WHAT IS HTTP BASIC?
With HTTP Basic Authentication, the client sends a username and password in the Authorization HTTP header.


1. .authenticated(): The user must be logged in/authenticated to access this endpoint.

Example:

http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/login", "/register").permitAll()
    .anyRequest().authenticated()
);

2. permitAll(): Allow anyone to access this endpoint, even if they are not logged in.

Example:

http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/login", "/register").permitAll()
    .anyRequest().authenticated()
);

This means:

/login       → anyone can access
/register    → anyone can access
/api/jobs    → must be authenticated
/api/users   → must be authenticated

3. denyAll(): Nobody is allowed to access this endpoint.

For example:

http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/admin/secret").denyAll()
    .anyRequest().authenticated()
);

Even an authenticated user gets:

403 Forbidden

# What is CSRF?
CSRF stands for Cross-Site Request Forgery.

It's a security attack where a malicious website tries to make your browser perform an action on another website using your existing authentication/session.

Imagine you're logged into:

bank.com

Your browser has a session cookie:

SESSION=abc123

Now you visit:

evil.com

That malicious site could potentially try to make your browser send a request to:

POST https://bank.com/transfer

Because your browser automatically sends cookies for bank.com, the bank might see:

SESSION=abc123

and think:

"This is the legitimate logged-in user."

That's the basic idea behind CSRF.

How Spring Security prevents it
Spring Security can require a CSRF token for state-changing requests.

For example:

POST /api/jobs

might need:

X-CSRF-TOKEN: abc123

The attacker doesn't normally have access to the legitimate CSRF token, so the forged request gets rejected.

# Why do people often disable CSRF for REST APIs?
You will frequently see:

http.csrf(csrf -> csrf.disable());

This is common for APIs that use authentication mechanisms such as:

Authorization: Bearer <JWT>

because the authentication token isn't automatically attached by the browser as a cookie in the same way a session cookie is.

For example:

GET /api/jobs
Authorization: Bearer eyJhbGciOi...

The malicious website generally cannot simply make the browser attach your custom Authorization header containing your JWT.

However, whether CSRF should be disabled depends on your authentication architecture. If your application uses cookie-based/session authentication, CSRF protection is generally important.




## SPRING SECURITY INTERNAL FLOW 

                 USER
                  │
                  │ enters
                  │ username + password
                  ▼
        ┌──────────────────────┐
        │ HTTP Request          │
        │                       │
        │ username: john        │
        │ password: ****       │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────────┐
        │ Spring Security Filter   │
        │                          │
        │ e.g. UsernamePassword    │
        │ AuthenticationFilter     │
        └────────────┬─────────────┘
                     │
                     │ creates
                     ▼
        ┌──────────────────────────┐
        │ Authentication           │
        │                          │
        │ principal = john         │
        │ credentials = password   │
        └────────────┬─────────────┘
                     │
                     ▼
        ┌──────────────────────────┐
        │ AuthenticationManager    │
        │                          │
        │ authenticate(...)        │
        └────────────┬─────────────┘
                     │
                     ▼
        ┌──────────────────────────┐
        │ AuthenticationProvider   │
        │                          │
        │ DaoAuthenticationProvider│
        └────────────┬─────────────┘
                     │
                     │ asks
                     ▼
        ┌──────────────────────────┐
        │ UserDetailsService       │
        │                          │
        │ loadUserByUsername()     │
        └────────────┬─────────────┘
                     │
                     ▼
              ┌─────────────┐
              │   Database  │
              └──────┬──────┘
                     │
                     │ UserDetails
                     ▼
        ┌──────────────────────────┐
        │ PasswordEncoder           │
        │                          │
        │ matches(raw, encoded)    │
        └────────────┬─────────────┘
                     │
               ┌─────┴─────┐
               │           │
             MATCH       NO MATCH
               │           │
               ▼           ▼
        Authentication   Failure
        successful       401
               │
               ▼
        ┌──────────────────────────┐
        │ SecurityContext          │
        │                          │
        │ Authentication           │
        │        │                 │
        │        ├─ Principal      │
        │        ├─ Authorities    │
        │        └─ Credentials    │
        └────────────┬─────────────┘
                     │
                     ▼
             Authorization
                     │
                     ▼
               Controller
