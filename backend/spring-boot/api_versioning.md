1. URI Versioning (Path Versioning)

GET /api/v1/users
GET /api/v2/users

2. Request Parameter Versioning

GET /api/users?version=1
GET /api/users?version=2

3. Header Versioning

GET /api/users 
Headers: 
X-API-VERSION: 2

4. Media Type Versioning (Content Negotiation)
GET /api/users
Accept: application/vnd.myapp.v1+json
 This tells the server: Return version 1 of this API's response, formatted as JSON.

 Breakdown of MIME Type - 
 MIME - Multipurpose Internet Mail Extensions

 It is a standard way of telling the computer what type of data is beindg sent so that it can be handled correctly. In simple words: MIME describes the format of the content.

 application -> Top level MIME type (general category of data). By mentioning this, we are trying ot convey that two different application is transfering the data
 vnd -> Vendor specific (custom type)
 myapp -> Your application / company name
 v1 -> API version (v1,v2 etc)
 +json -> Format of data 

 Why vnd? 
 vnd stands for vendor -specific. It means this media type is specific to you (your app/organisation), not a global standard. 

 Why use media type versioning?
 1. You don't pollute URLS with /v1, /v2
 2. API versioning is done using headers rather than paths
 3. URLs remains stable, only representation changes.
 4. More REST complaint - same resource, different representations

 

