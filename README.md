# Private Chat Application

The project, is focused on a real time chat app utilizing `vue` library and `Django` backend.
The api was heavily dependent on `Django restframework`. 

![Screenshot from 2024-07-12 06-04-31](https://github.com/user-attachments/assets/6399f8de-5f1c-4bb6-b519-b083593a0248)


## Testing
Unitests have also been imlemented on every app `(apis)`,
to ensure quality code.
Coverage has also been used to monitor the quality of tests based on it's report

## Django Channels
It referes to a third part module that extends its abilities beyond HTTP - to handle WebSockets, chat protocols, IoT protocols, and more.
It provides a way to handle real-time, bi-directional communication between the server and client, making it ideal for building applications such as chat rooms, real-time dashboards, and online games.

Django Channels is built on top of the popular asyncio library, which is part of Python's standard library, and it uses the WebSockets protocol to enable real-time communication between the client and server. It also supports other protocols such as HTTP long-polling, Server-Sent Events (SSE), and more.

Some of the key features of Django Channels include:

1. Asynchronous handling of requests
2. WebSockets support
3. Custom protocol support
4. Django integration
    
## Run Application
1. git clone 'this repo's link'
2. make build
4. make up
5. make makemigrations
6. make migrate
7. Access on 0.0.0.0:8080 
    



