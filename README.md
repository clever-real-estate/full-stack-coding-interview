# Full Stack Photo App Challenge  
  
This project is a full-stack web application featuring a Django REST Framework backend and a React (Vite + TypeScript) frontend. The entire application is containerized with Docker for consistent and easy setup.  
  
## Prerequisites  
  
-   Docker  
-   Docker Compose  
  
## Getting Started  
  
1.  **Clone the repository.**  
2.  **Build and Run the Application:**  
    ```bash  
    docker-compose up --build  
    ```  
3.  **Initial Database Setup (First Run Only):**  
    Open a new terminal and run:  
    ```bash  
    # Apply database migrations  
    docker-compose exec backend python manage.py migrate  
  
    # Import photo data from the CSV  
    docker-compose exec backend python manage.py import_photos /app/data/photos.csv  
  
    # Create a superuser to access the Django Admin  
    docker-compose exec backend python manage.py createsuperuser  
    ```
  
## Services  
  
-   **Frontend:** `http://localhost:5173`  
-   **Backend API:** `http://localhost:8000/api/`  
-   **Django Admin:** `http://localhost:8000/admin/`    
