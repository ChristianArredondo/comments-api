# comments-api

A simple NodeJS REST API service for creating and reading infinitely-nested comments.

## Quick Start

There are two options for running the service locally:

1. Manually run mongodb and nodejs service
2. Run using docker via `docker-compose`

### 1. Run manually

Open terminal and run mongodb daemon
```bash
# start mongo daemon in separate terminal
mongod --dbpath ~/path/to/your/volume
```

Open separate terminal and run comments-api service
```bash
# cd into project
cd ~/path/to/comments-api

# install project dependencies
npm install

# run service
npm start

# verify that service is running by hitting
# healthcheck endpoint in another terminal
curl localhost:8080/ping
```

### 2. Run with docker

Open terminal
```bash
# cd into project
cd ~/path/to/comments-api

# install project dependencies
npm install

# build project
npm run build

# start via docker-compose
docker-compose up --build

# verify that service is running by hitting
# healthcheck endpoint in another terminal
curl localhost:8080/ping
```

## Endpoints

### GET "/ping"
___
Description
 - Used for verifying that server is running

Example
  - `GET "localhost:8080/ping"`

Sample Response
```json
{ "yo": "server is alive" }
```

### POST "/comments/populate"
___
Description
 - Used for generating some sample comments

Example
  - `POST "localhost:8080/comments/populate"`

Response
- `201`


### GET "/comments"
___
Description
 - Used for fetching comments (with no nested comments)

Example
  - `GET "localhost:8080/comments"`
  - `GET "localhost:8080/comments?root=true&page=2&sortBy=title&sortDir=1"`


Query Params
  - `root`: "true" || "false"
  - `page`: 1, 2, 3, etc
  - `sortBy`: "title", "createdByUsername", etc
  - `sortDir`: -1 || 1

Sample Response
```json
[
    {
        "_id": "5e57e4fbb32abc1316991488",
        "createdByUsername": "user 1",
        "body": "more info about about #1",
        "createdDate": "2020-02-27T15:49:15.619Z",
        "isRoot": true,
        "parentComment_id": null,
        "title": "awesome root comment #1",
        "totalComments": 307
    },
    {
        "_id": "5e57e4fdb32abc15259915bc",
        "createdByUsername": "user 2",
        "body": "more info about about #2",
        "createdDate": "2020-02-27T15:49:17.077Z",
        "isRoot": true,
        "parentComment_id": null,
        "title": "awesome root comment #2",
        "totalComments": 45
    },
    {
        "_id": "5e57e4fdb32abccb0c9915ea",
        "createdByUsername": "user 3",
        "body": "more info about about #3",
        "createdDate": "2020-02-27T15:49:17.263Z",
        "isRoot": true,
        "parentComment_id": null,
        "title": "awesome root comment #3",
        "totalComments": 386
    },
    {
        "_id": "5e57e4feb32abc10ff99176d",
        "createdByUsername": "user 4",
        "body": "more info about about #4",
        "createdDate": "2020-02-27T15:49:18.735Z",
        "isRoot": true,
        "parentComment_id": null,
        "title": "awesome root comment #4",
        "totalComments": 506
    },
    {
        "_id": "5e57e500b32abc5cd6991968",
        "createdByUsername": "user 5",
        "body": "more info about about #5",
        "createdDate": "2020-02-27T15:49:20.607Z",
        "isRoot": true,
        "parentComment_id": null,
        "title": "awesome root comment #5",
        "totalComments": 425
    }
]
```

### GET "/comments/:commentId"
___
Description
 - Used for fetching single comment along with its nested children comments

Example
  - `GET "localhost:8080/comments/5e57e4fdb32abccb0c9915ea"`
  - `GET "localhost:8080/comments/5e57e4fdb32abccb0c9915ea?depthLimit=3&childrenLimit=3"`


Query Params
  - `depthLimit`: 0, 1, 2, etc
  - `childrenLimit`: 1, 2, etc

Sample Response
```json
{
    "_id": "5e57e4fdb32abccb0c9915ea",
    "createdByUsername": "user 3",
    "body": "more info about about #3",
    "createdDate": "2020-02-27T15:49:17.263Z",
    "isRoot": true,
    "parentComment_id": null,
    "title": "awesome root comment #3",
    "totalComments": 386,
    "children": [
        {
            "_id": "5e57e4fdb32abc85939915eb",
            "createdByUsername": "user 12",
            "body": "awesome child comment #4",
            "createdDate": "2020-02-27T15:49:17.264Z",
            "isRoot": false,
            "parentComment_id": "5e57e4fdb32abccb0c9915ea",
            "title": null,
            "totalComments": 51,
            "children": [
                {
                    "_id": "5e57e4fdb32abc4e359915ec",
                    "createdByUsername": "user 10",
                    "body": "awesome child comment #3",
                    "createdDate": "2020-02-27T15:49:17.267Z",
                    "isRoot": false,
                    "parentComment_id": "5e57e4fdb32abc85939915eb",
                    "title": null,
                    "totalComments": 30,
                    "children": [
                        {
                            "_id": "5e57e4fdb32abc55539915ed",
                            "createdByUsername": "user 8",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.270Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc4e359915ec",
                            "title": null,
                            "totalComments": 4
                        },
                        {
                            "_id": "5e57e4fdb32abc78c99915f2",
                            "createdByUsername": "user 12",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.291Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc4e359915ec",
                            "title": null,
                            "totalComments": 4
                        },
                        {
                            "_id": "5e57e4fdb32abcea859915f7",
                            "createdByUsername": "user 16",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.310Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc4e359915ec",
                            "title": null,
                            "totalComments": 2
                        }
                    ]
                },
                {
                    "_id": "5e57e4fdb32abc30d099160b",
                    "createdByUsername": "user 15",
                    "body": "awesome child comment #3",
                    "createdDate": "2020-02-27T15:49:17.390Z",
                    "isRoot": false,
                    "parentComment_id": "5e57e4fdb32abc85939915eb",
                    "title": null,
                    "totalComments": 2,
                    "children": [
                        {
                            "_id": "5e57e4fdb32abc6d5899160c",
                            "createdByUsername": "user 8",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.393Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc30d099160b",
                            "title": null,
                            "totalComments": 1
                        }
                    ]
                },
                {
                    "_id": "5e57e4fdb32abc7ee699160e",
                    "createdByUsername": "user 20",
                    "body": "awesome child comment #3",
                    "createdDate": "2020-02-27T15:49:17.399Z",
                    "isRoot": false,
                    "parentComment_id": "5e57e4fdb32abc85939915eb",
                    "title": null,
                    "totalComments": 16,
                    "children": [
                        {
                            "_id": "5e57e4fdb32abccaff99160f",
                            "createdByUsername": "user 8",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.401Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc7ee699160e",
                            "title": null,
                            "totalComments": 4
                        },
                        {
                            "_id": "5e57e4fdb32abcae22991614",
                            "createdByUsername": "user 12",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.419Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc7ee699160e",
                            "title": null,
                            "totalComments": 1
                        },
                        {
                            "_id": "5e57e4fdb32abcbcf8991616",
                            "createdByUsername": "user 16",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.426Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc7ee699160e",
                            "title": null,
                            "totalComments": 1
                        }
                    ]
                }
            ]
        },
        {
            "_id": "5e57e4fdb32abce39799161f",
            "createdByUsername": "user 18",
            "body": "awesome child comment #4",
            "createdDate": "2020-02-27T15:49:17.464Z",
            "isRoot": false,
            "parentComment_id": "5e57e4fdb32abccb0c9915ea",
            "title": null,
            "totalComments": 90,
            "children": [
                {
                    "_id": "5e57e4fdb32abc04fb991620",
                    "createdByUsername": "user 10",
                    "body": "awesome child comment #3",
                    "createdDate": "2020-02-27T15:49:17.466Z",
                    "isRoot": false,
                    "parentComment_id": "5e57e4fdb32abce39799161f",
                    "title": null,
                    "totalComments": 11,
                    "children": [
                        {
                            "_id": "5e57e4fdb32abc4fc0991621",
                            "createdByUsername": "user 8",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.470Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc04fb991620",
                            "title": null,
                            "totalComments": 1
                        },
                        {
                            "_id": "5e57e4fdb32abc8cc4991623",
                            "createdByUsername": "user 12",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.480Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc04fb991620",
                            "title": null,
                            "totalComments": 5
                        },
                        {
                            "_id": "5e57e4fdb32abc0c0d991629",
                            "createdByUsername": "user 16",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.503Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc04fb991620",
                            "title": null,
                            "totalComments": 2
                        }
                    ]
                },
                {
                    "_id": "5e57e4fdb32abc2aff99162c",
                    "createdByUsername": "user 15",
                    "body": "awesome child comment #3",
                    "createdDate": "2020-02-27T15:49:17.515Z",
                    "isRoot": false,
                    "parentComment_id": "5e57e4fdb32abce39799161f",
                    "title": null,
                    "totalComments": 12,
                    "children": [
                        {
                            "_id": "5e57e4fdb32abc0ba799162d",
                            "createdByUsername": "user 8",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.518Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc2aff99162c",
                            "title": null,
                            "totalComments": 3
                        },
                        {
                            "_id": "5e57e4fdb32abc85f7991631",
                            "createdByUsername": "user 12",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.533Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc2aff99162c",
                            "title": null,
                            "totalComments": 1
                        },
                        {
                            "_id": "5e57e4fdb32abcfe53991633",
                            "createdByUsername": "user 16",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.544Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc2aff99162c",
                            "title": null,
                            "totalComments": 3
                        }
                    ]
                },
                {
                    "_id": "5e57e4fdb32abc1f2f991639",
                    "createdByUsername": "user 20",
                    "body": "awesome child comment #3",
                    "createdDate": "2020-02-27T15:49:17.565Z",
                    "isRoot": false,
                    "parentComment_id": "5e57e4fdb32abce39799161f",
                    "title": null,
                    "totalComments": 22,
                    "children": [
                        {
                            "_id": "5e57e4fdb32abcd44f99163a",
                            "createdByUsername": "user 8",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.567Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc1f2f991639",
                            "title": null,
                            "totalComments": 1
                        },
                        {
                            "_id": "5e57e4fdb32abc227399163c",
                            "createdByUsername": "user 12",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.577Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc1f2f991639",
                            "title": null,
                            "totalComments": 2
                        },
                        {
                            "_id": "5e57e4fdb32abc603e99163f",
                            "createdByUsername": "user 16",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.588Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc1f2f991639",
                            "title": null,
                            "totalComments": 2
                        }
                    ]
                }
            ]
        },
        {
            "_id": "5e57e4fdb32abc4b5b99167a",
            "createdByUsername": "user 24",
            "body": "awesome child comment #4",
            "createdDate": "2020-02-27T15:49:17.810Z",
            "isRoot": false,
            "parentComment_id": "5e57e4fdb32abccb0c9915ea",
            "title": null,
            "totalComments": 84,
            "children": [
                {
                    "_id": "5e57e4fdb32abc660199167b",
                    "createdByUsername": "user 10",
                    "body": "awesome child comment #3",
                    "createdDate": "2020-02-27T15:49:17.812Z",
                    "isRoot": false,
                    "parentComment_id": "5e57e4fdb32abc4b5b99167a",
                    "title": null,
                    "totalComments": 10,
                    "children": [
                        {
                            "_id": "5e57e4fdb32abc1bf299167c",
                            "createdByUsername": "user 8",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.814Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc660199167b",
                            "title": null,
                            "totalComments": 2
                        },
                        {
                            "_id": "5e57e4fdb32abc329799167f",
                            "createdByUsername": "user 12",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.825Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc660199167b",
                            "title": null,
                            "totalComments": 6
                        }
                    ]
                },
                {
                    "_id": "5e57e4fdb32abc8398991686",
                    "createdByUsername": "user 15",
                    "body": "awesome child comment #3",
                    "createdDate": "2020-02-27T15:49:17.853Z",
                    "isRoot": false,
                    "parentComment_id": "5e57e4fdb32abc4b5b99167a",
                    "title": null,
                    "totalComments": 7,
                    "children": [
                        {
                            "_id": "5e57e4fdb32abcb5ae991687",
                            "createdByUsername": "user 8",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.855Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc8398991686",
                            "title": null,
                            "totalComments": 6
                        }
                    ]
                },
                {
                    "_id": "5e57e4fdb32abc653099168e",
                    "createdByUsername": "user 20",
                    "body": "awesome child comment #3",
                    "createdDate": "2020-02-27T15:49:17.881Z",
                    "isRoot": false,
                    "parentComment_id": "5e57e4fdb32abc4b5b99167a",
                    "title": null,
                    "totalComments": 13,
                    "children": [
                        {
                            "_id": "5e57e4fdb32abc9bc599168f",
                            "createdByUsername": "user 8",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.884Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc653099168e",
                            "title": null,
                            "totalComments": 3
                        },
                        {
                            "_id": "5e57e4fdb32abc8b4a991693",
                            "createdByUsername": "user 12",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.900Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc653099168e",
                            "title": null,
                            "totalComments": 5
                        },
                        {
                            "_id": "5e57e4fdb32abcfc1d991699",
                            "createdByUsername": "user 16",
                            "body": "awesome child comment #2",
                            "createdDate": "2020-02-27T15:49:17.922Z",
                            "isRoot": false,
                            "parentComment_id": "5e57e4fdb32abc653099168e",
                            "title": null,
                            "totalComments": 2
                        }
                    ]
                }
            ]
        }
    ]
}
```

### POST "/comments/root"
___
Description
 - Used for creating a root-level comment

Example
  - `POST "localhost:8080/comments/root"`

Payload Profile
  - `title`: string (required)
  - `createdByUsername`: string (required)
  - `body`: string (optional)

Sample Payload
```json
{
	"title": "my root comment",
	"createdByUsername": "christian"
}
```

Sample Response
```json
{
    "id": "5e57eca9843527183fc1ff10"
}
```

### POST "/comments/child"
___
Description
 - Used for creating a child-level comment of another parent comment

Example
  - `POST "localhost:8080/comments/child"`

Payload Profile
  - `body`: string (required)
  - `createdByUsername`: string (required)
  - `parentId`: ObjectID string (required)
  - `title`: string (optional)

Sample Payload
```json
{
	"parentId": "5e55c93cfc2d16a87a9d9441",
	"body": "from postman again yo!!!!",
	"createdByUsername": "christian"
}
```

Sample Response
```json
{
    "id": "5e57eca9843527183fc1ff12"
}
```

### Fetch Comments
- pagination
- pipeline building

### Fetch Single
- `ensureDataExists` middleware for 404 check
- recursive pipeline
    - nested sorting + limit
- why to avoid $graphLookup

### Create Single
- validation middleware
- `ensureDataExists` middleware for referential integrity check

### General
- MongoDB Compass

## Todo
- docker compose?
- indexes
- docs for APIs
