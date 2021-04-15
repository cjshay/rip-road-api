# API Challenge

## Steps to run

1. `clone this repo`

2. `npm i at the root directory`

3. `create a .env in the root directory with API_KEY=your-api-key-here`

- Please obtain an API key from [Tomorrow.io](https://www.tomorrow.io/weather-api)

For the purposes of this challenge, we have included the API key
```
cd server
```
```
node server.js
```

### Sample request body for all routes

```
{
    "userName": "tim",
    "lat": -70,
    "long": 40
}
```

### All possible routes include

**GET** - localhost:8080/location

**POST** - localhost:8080/user

**POST** - localhost:8080/session

**DELETE** - localhost:8080/endSession

## Steps to use

### 1. Create a user

Send a `POST` to `localhost:8080/user`


```
{
    "username": "asdf"
}
```

### 2. Get locations

Send a `GET` to `localhost:8080/location`


```
{
    "username": "asdf",
    "lat": -70,
    "long": 40
}
```

### 3. Logout a user

Send a `DELETE` to `localhost:8080/endSession`


```
{
    "username": "asdf"
}
```

### 4. Get a location with the now logged out user (will fail)

Send a `GET` to `localhost:8080/location`


```
{
    "username": "asdf",
    "lat": -70,
    "long": 40
}
```

### 5. Login the user

Send a `POST` to `localhost:8080/session`


```
{
    "username": "asdf"
}
```

### 6. Get a location with the user (will work now that they're signed in)

Send a `GET` to `localhost:8080/location`


```
{
    "username": "asdf",
    "lat": -70,
    "long": 40
}
```

## Approach

The approach of this challenge was to create a basic API that could store users in local storage (JSON) while adherinig to normal
API practices such as a controller / model workflow. Additionally, users can have locations saved based on their recent searches.

## Points of Improvement

The locations being saved to each user would be expensive from a storage standpoint. One such improvement could be to use locations
in an LRU manner, such that we could potentially cache not just locations, but data if the data is reasonably recent.

It is rather annoying to have to submit specific `lat` and `long` coordinates, so one improvement would be to allow users to submit location `names` which we could then use to obtain `lat` and `long` to request from either `tomorrow.io` or another third party. A benefit of this would be datashape 
because you could have:

```
    "tim": {
        "userName": "tim",
        "locations": [
            {
                "location1Name": [-70, 40]
            },
            {
                "locationName2": [-67, 38]
            }
        ]
    }
```
where locationName is the actual location name (e.g New York). One problem is having multiple third parties. A solution would be to either limit locations, or continously cache larger and more popular locations.

I selected `tomorrow.io` for the purposes of this exercise because it is free and easy to obtain an API key for. However, if I had more resources for this project I would probably switch to Googles Paid Geocode API which would eliminate the inconveniences of searching by specific lat/long coordinates, as well as allow users to retrieve information in Fahrenheit or Celsius.
