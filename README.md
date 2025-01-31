# Private Chat Application

Welcome to the **Private Chat Application**, a real-time chat application built with **Vue.js** for the frontend and **Django** for the backend. This project leverages the power of **Django REST Framework** for API development and **Django Channels** for real-time, bi-directional communication.

## Key Features

- **Real-Time Communication**: Utilizes **Django Channels** to enable real-time, bi-directional communication between the server and client.
- **RESTful APIs**: Built with **Django REST Framework** to provide a robust and scalable backend.
- **Unit Testing**: Comprehensive unit tests implemented for every app (API) to ensure code quality.
- **Test Coverage**: Uses **coverage** to monitor the quality of tests and generate detailed reports.

## Technologies Used

- **Frontend**: Vue.js
- **Backend**: Django, Django REST Framework
- **Real-Time Communication**: Django Channels
- **Testing**: Unit tests, Coverage

## What is Django Channels?

**Django Channels** is a third-party module that extends Django's capabilities beyond HTTP, enabling it to handle WebSockets, chat protocols, IoT protocols, and more. It provides a way to handle real-time, bi-directional communication between the server and client, making it ideal for building applications such as chat rooms, real-time dashboards, and online games.

### Key Features of Django Channels:

1. **Asynchronous Handling of Requests**: Allows for non-blocking, asynchronous processing of requests.
2. **WebSockets Support**: Enables real-time communication between the client and server.
3. **Custom Protocol Support**: Supports various protocols like HTTP long-polling, Server-Sent Events (SSE), and more.
4. **Django Integration**: Seamlessly integrates with Django, allowing you to use Django's existing features and middleware.

## Getting Started

Follow these steps to set up and run the application on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone 'this-repo-link'

2. **Build the Application**:
   ```bash
   make build

3. **Start the Application**:
   ```bash
   make up

4. **Apply migrations**:
   ```bash
   make makemigrations
   make migrate
   
5. **Access the Applications**:
       - Open your browser and navigate to http://0.0.0.0:8080.

## Screenshots
![Screenshot from 2024-07-12 06-04-31](https://github.com/user-attachments/assets/6399f8de-5f1c-4bb6-b519-b083593a0248)



