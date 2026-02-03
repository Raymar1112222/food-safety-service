# FOOD SAFETY DATA SERVICE
 A simple TypeScript / Node.js backend service for storing and retrieving bacterial test results for food production facilities.

This service is designed to support Operators, Quality Managers and Food Safety Leads by providing a clear and minimal API for logging and analysing bacterial results.

# TECH STACK
 1. Node.js
 2. TypeScript
 3. Express

# HOW TO RUN THE SERVICE
1. Install dependencies
    npm install
2. Run in development mode
    npm run dev
3. The service will start on: 
    http://localhost:3000
4. Health Check: 
    GET /api/health

# API ENDPOINTS
1. Create a single test result  
    POST /api/rest-results  
    Body:  
        ```json
           [{
                "facilityId: "facility-1",
                "productionLineI": "line-a",
                "cfuCount": 120,
                "location": "Packaging area",
                "timestamp": "2026-01-31 T10:30:00Z"
            },
             {
             "facilityId": "facility-2",
             "productionLineId": "line-b",
             "cfuCount": 150,
             "location": "Sorting area",
             "timestamp": "2026-02-31T10:30:00Z"
             }]
         ```

2. Retrieve by historical results  
    GET /api/test-results

3. Filter by facility  
    GET /api/test-results?facilityId=facility-1

4. Filter by production line  
    GET /api/test-results?productionLineId=line-a

# DATA PERSISTENCE
For this assingment, an in-memory data store is used to presist test results.

The data is stored in a process-local array and exists only while the application is running.

This approach was chosen to keep the implementation focused on API design, business logic and product reasoning, while staying within the intended 3-4 hour time scope.

In a production environment, this would be replaced with a persistent database such as PostgreSQL (Amazon RDS) and DynamoDB.


# HIGH LEVEL THINKING

1. Goal and product focus
    The service is desinged to support three main user groups:
        1. Operators  
        2. Quality Managers  
        3. Food Safety Leads  
    The API is intentionally minimal to support fast data entry and reliable data retrieval.

        1. Operators
             Operators need to log results quickly.
            The API provides a simple endpoint for creating test results with only the required fields submission to support automated data collection or manual input.

        2. Quality Managers
            Quality Managers need to ensure that all facilities and production lines are being tested.
            Filtering by facility and production line enables quick verification of coverage and identification of missing data.

        3. Food Safety Leads
            Food Safety Leads focus on trends and early detection of contamination risks.
            Retrieving historical results and filtering by facility and production line enables trend analysis and identification of repeated high CFU counts across locations and production lines.


# DEPLOYMENT (AWS)
A suitable AWS deployment architecture would include:
1. Amazon API Gateway for exposing the REST API
2. AWS Lambda (Node.js/ TypeScript) for running the backend service.
3. Amazon RDS (PostgreSQL) or DynamoDB for persistend storage.

# PRODUCT INSIGHTS FOR FOOD SAFETY LEADS
The most important data points to surface first are:
1. CFU Trends over time per facility and production line
2. Number of high-risk or unusually high CFU measurements per day
3. Locations with repeated high CFU results
4. Gaps in testing per production line
5. Comparison of production lines within the same facility

These insights help identity risk patterns early and support preventive actions.

# SCOPE AND LIMITATIONS
This project was intentionally scoped to fit within a short take-home assignment.
The following features are not implemented:  
1. authentication and authorization  
2. data validation beyond required fields  
3. alerting or notification logic  
4. user interface  
The focus is on API design, clean structure, and product driven backend reasoning.

