# How  passwords validated with Plain passwords?

- Storing the passwords in a plain text inside a storage system like DB will have intigrity and confidentially issues. Hence, this is not recommended approach for Production applications.

# Different ways for data privacy
1. Encoding
    - Encoding is defined as the process of converting data from one form to another and has nothing to do with crytography.
    - It involves no secret and completely reversible using decoding
    - Encoding can't be used for securing data. Multiple algorithms like ASCII, UNICODE is used for encoding.

2. Encryption
    - Encryption is the process of transforming data in such a way that guarantees confidentiality.
    - To achieve confidentiality, encryption requires the use of a secret which in cryptographic term, we call a "key".
    - Encryption can be reversible by using the decryption with the help of the key. As long as key is confidential, encryption can be considered as secured.

3. Hashing
    - In hashing, data is converted to the hash value using some hasing function.
    - Data once hashed is non-reversible. One cannot determined the original data from a hash value generated.


## Hashing
- Hash funtions take any data as input and produce a unique string of bytes in return. Given the same input, the hash function always reproduce the same string of bytes. The output of a hash function is often called a digest or a HASH.

- A hash function transforms input of any length (like file, message or video) into a consistent fixed-length output(eg - 256 bits for SHA-256). When the same input is hashed, it always generates the same resulting hash.

A typical approach for storing the password within the org looks like -
1. You receive the user's password during the registration process.
2. You hash the provided password and discard the original. Store it in the storage system like DB
3. During login, you compare the resulting digest with the stored version; if they match, the user gain access.

This may look simple, but if multiple users uses teh same passwords , then they will have same hash. How will you then validate the user?

To prevent the above situation or hacking attacks, Salts are commonly used. Salts are random values that are unique for each user and are made public. 
The salt value is stored as a part of resulting hash itself. 

- The salt is typically stpred at the beginning of the hash string and is used during the password verification process to generate the same hash again for comparison. Since, user has a sunique hash function, sttackers can't precompute it

Plain text password + Random Salt value + hashing algo = Strong hash value


For generating Salt, Password encoderd are recommended.

