# Token formats

1. ## OPAQUE TOKENS

Opaque tokens are typically random strings with no inherent meaning.

2. ## JSON WEB TOKENS(JWT)

JWTs are self-contained tokens that consist of 3 parts:
    - A header (This usually contains the meta data like algo used to generate)
    - A payload (This is usually user related info)
    - A signature (optional) 
encoded in BASE64 URL.

- You can set the expiration time with JWT
- A JWT token has 3 parts separated by a period(.)
-

# Importance of signature inside JWT
The signature is the most important part for security because it allows the server to verify that the JWT was created by a trusted party and has not been modified.

# Why do we need it?

The header and payload are NOT encrypted.

Anyone can decode them.

For example, a JWT payload might contain:

{
  "userId": 123,
  "role": "USER"
}

A user could decode the JWT and change:

{
  "userId": 123,
  "role": "ADMIN"
}

So we need something that tells the server:Has this token been changed after I created it?

Formula -> 

Signature = HMAC(header + payload, secret)

Now suppose an attacker changes:

"role": "USER" to: "role": "ADMIN"

The payload has changed.

Therefore: HMAC(header + modified payload, secret) will produce a different signature.

But the attacker doesn't know the secret key, so they cannot generate the correct new signature.

secret must be stored at the backend. 