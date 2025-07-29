# Full Stack Photo App Challenge  
  
This project is a full-stack web application featuring a Django REST Framework backend and a React (Vite + TypeScript) frontend. The entire application is containerized with Docker for consistent and easy setup.  
  
## Prerequisites  
  
-   Docker  
-   Docker Compose  
  
## Getting Started  
  
1.  **Clone the repository.**  
2.  **Build and Run the Application:**  
    ```bash  
    docker-compose up --build -d
    ```  
3.  **Initial Database Setup (First Run Only):**  
    ```bash  
    # Apply database migrations  
    docker-compose exec backend python manage.py migrate  
  
    # Import photo data from the CSV  
    docker-compose exec backend python manage.py import_photos /app/data/photos.csv  
    # Create a superuser to access the Django Admin
    docker-compose exec backend python manage.py createsuperuser  

4.  **Create private and public keys for auth**

    docker-compose exec backend python manage.py generate_keys

5.  **Access the app and Sign Up**

    `http://localhost:5173/signup`

6.  **Manage DB and collections with ease on Django Admin (relates to creation superuser (above))

    `http://localhost:8000/admin`

    ```
  
## Services  
  
-   **Frontend:** `http://localhost:5173`  
-   **Backend API:** `http://localhost:8000/api/`  
-   **Django Admin:** `http://localhost:8000/admin/`    
## Screenshots

You may look at some sample screens on the screenshots dir to know what to expect when running this app.
