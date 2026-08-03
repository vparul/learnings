- Docker is a tool that helps to package an application and run it anywhere. Think of Docker as a magic box that contains: 
    - Application
    - All the software it needs 
    - All the configurations it depends on

So, wherever you carry that box, the app works exactly the same way.

- Docker packages a application with everything it needs to run. The app becomes portable - works the same on any computer with docker installed.

# Before Docker - 
1. "It works on my system"
2. Different environments: Dev, QA, Prod
3. Installing dependencies manually
4. Painful setup for new developers
5. Server crashes due to mismatched software versions.

# Docker solves the problem by providing - 
1. Consistency - Same behviour everywhere
2. Isolation - Each app runs in its own box
3. Easy Setup - Run one command -> app is ready
4. Portability - From laptop -> server -> icloud
5. Faster Deployments - ship entire environments as an image


# Docker Image - The Blueprint (Package that docker will create for your application)
 A docker image is a blueprint / template of an application. It contains - 
  - Application code
  - Runtime env (Java, Python, Node etc)
  - Required Libraries
  - OS level dependencies

  Once the docker image is created, it cannot be modifies. It can be shared like sharing a photo. Upload to Docker hub where others can download.


- The developer will create a docker file in which they will mention all the instructions regarding the application. Once, the docker file is created, the docker build command is executed 
by the developer or devops person. 
The output of docker build command is the DOCKER IMAGE


# Docker Container
A container is a running instance of an image
You can create multiple containers from one image 

Docker containers are :
- lightweight
- Fast to start
- Isolated from each other - like apps running in separate bubbles
- Disposable (stop/delete anytime)

# Docker Volume

Containers do not keep data permanently. If you restart/delete a container -> data is gone.

Volumnes solve this problem:
 - they provide permanent storage
 - Data survives , container resets
 - Multiple containers can share the same data.

 # Docker Hub 
 The App Store of the Docker image - download or share images

 # Docker Compose 
 Tool to run multiple containers together



  docker run -e MYSQL_ROOT_PASSWORD=root -d --name jobportaldb -p 3306:3306 mysql

| `docker run`                  | Creates and starts a new container from a Docker image.                                                                                                                                       
| `-e MYSQL_ROOT_PASSWORD=root` | Sets an **environment variable** inside the container. Here, it sets the MySQL **root user password** to `root`. MySQL requires this password during     initialization.                  
| `--name jobportaldb`          | Assigns the container the name **jobportaldb**. This makes it easier to manage instead of using a random container  ID.                                                                        |
| `-p 3306:3306`                | Maps **port 3306** on the host machine to **port 3306** inside the container. This allows applications on your computer to connect to the MySQL database. Format: `host_port:container_port`
| `mysql`                       | The Docker image to use. If it is not available locally, Docker automatically downloads the latest official MySQL image from Docker Hub.                                                      |
