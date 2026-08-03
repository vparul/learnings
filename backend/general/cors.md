# What is CORS (Cross Origin Resource Sharing)?

CORS is a security feature built into web browsers. It prevents a website from making requests to a different domain unless explictly allowed. 

Example of CORS issue ->
Imagine you have 
- A frontend running at http://localhost:5137 (React)
- A backend API running at http://localhost:8080 (Spring)

If your frontend tries to fetch data from the backend below CORS error will be throws by the browser.

## CORS is not a security issue/attack but the default protection provided by browsers to stop sharing the data/communication between different origins.

# When does two origins considered different?

1. a different schema (Http or Https)
2. a different domain
3. a different port


# How to fix CORS?
If a web applicatoion's UI is deployed on one server and needs to communicate with a REST service hosted on another, we can enable this interaction by making changes in the backend app. 

# OPTION 1: Using @CrossOrigin
By default, mentioning @CrossOrigin alone allows all origin, all headers, all http methods to which the controller method is mapped.

Before making the actual call, the browsers send a preflight request to the server. As the response to that pre-flight request, the server should send any confirmation to the client to allow the traffic. 


Drawback of this option is that we can have multiple controller in our enterprise application and adding that will be troublesome.

## ENABLE CORS ON SPECIFIC ENDPOINT 

@RestController
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(version = "1.0")
    public ResponseEntity<List<CompanyDto>> GetAllCompanies() {

        return ResponseEntity.ok(companyService.getAllCompanies());
    }

}

## ENABLE CORS FOR ENTIRE CONTROLLER 

@RestController
@RequestMapping("/companies")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping(version = "1.0")
    public ResponseEntity<List<CompanyDto>> GetAllCompanies() {

        return ResponseEntity.ok(companyService.getAllCompanies());
    }

}

# OPTION 2: Using a Filter
If you have many controllers, it is better to configure a CORS globally by creating a bean.

# OPTION 3: Using Spring Security

# OPTION 4: Using WebMvcConfigurer

