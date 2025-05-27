# Popullo Ticket Management System

This project is a simple ticket management system built with Node.js and Express.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Unzip the zip assignment file:

   ```sh
   git clone <repo_url>
   cd Popullo_assignment
   ```

## Install the dependencies:

```sh
npm install
```

## To start the server, run the following command:

```sh
npm start
```

The server will run on port 7000. You can access the application at http://localhost:7000.

## API Endpoints

#### Create a Ticket

    Endpoint: POST /{host}/tickets
    Request Body:

Curl Req:

```
curl --location --request PUT 'http://localhost:7000/ticket/1' \
  --header 'Content-Type: application/json' \
  --data '{
      "numberOfLines" : 1
  }'
```

Response:

```json
{
  "ticket": {
    "id": 3,
    "lines": [
      [0, 2, 1],
      [1, 0, 1],
      [2, 1, 1]
    ],
    "statusChecked": false
  }
}
```

#### Get All Tickets

    Endpoint: GET /{host}/tickets

Req Curl:

```
  curl --location 'http://localhost:7000/ticket'
```

Response:

```json
    {
        "tickets": [
            {
                "id": 2,
                "lines": [
                    [
                        2,
                        1,
                        1
                    ],
                    [
                        0,
                        2,
                        1
                    ]
                ],
                "statusChecked": false
            },
          ...
        ]
    }
```

#### Get a Specific Ticket

    Endpoint: GET /{host}/tickets/:id

Curl Req:

```
curl --location 'http://localhost:7000/ticket/{ticket_id}'
```

Response:

```json
{
  "ticket": {
    "id": 2,
    "lines": [
      [2, 1, 1],
      [0, 2, 1]
    ],
    "statusChecked": false
  }
}
```

#### Update a Ticket

    Endpoint: PUT /{host}/tickets/:id

Curl Req:

```
curl --location --request PUT 'http://localhost:7000/ticket/1' \
--header 'Content-Type: application/json' \
--data '{
"numberOfLines" : 1
}'
```

Response:

```json
{
  "ticket": {
    "id": 1,
    "lines": [
      [1, 1, 2],
      [2, 1, 1],
      [2, 2, 0],
      [0, 1, 1]
    ],
    "statusChecked": false
  }
}
```

#### Check Ticket Status

- Endpoint: GET /{host}/ticket/status/:id/status

Curl Request:

```
    curl --location --request PUT 'http://localhost:7000/ticket/status/1'
```

Response:

```json
{
  "results": [
    {
      "line": [0, 1, 1],
      "result": 10
    },
    {
      "line": [2, 1, 1],
      "result": 1
    },
    {
      "line": [1, 1, 2],
      "result": 0
    },
    {
      "line": [2, 2, 0],
      "result": 0
    }
  ]
}
```

## Logging

The project uses pino for logging. Logs are printed to the console with timestamps and colors for better readability.

## Project Structure

- index.js: Entry point of the application.
- routes/ticketRoute.js: Defines the routes for ticket operations.
- controllers/ticketController.js: Contains the logic for handling ticket operations.
- services/ticketService.js: Contains the business logic for ticket operations.
- utils/logger.js: Configures the logger.
- utils/resultCalculator.js: Utility for calculating ticket results.
- utils/randomGenerator.js: Utility for generating random ticket IDs.
