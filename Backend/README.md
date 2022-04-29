# COLX523_milestone4_backend_group8

## How to run the code

1. Make sure the data file `final_version_annotation.csv` is under the same directory as `main.py`;

2. Install packages for backend

```
# Install FastApi and its server
pip install fastapi
pip install "uvicorn[standard]"
# Install orjson for ORJSONResponse
pip install orjson
```

3. Start the backend server using `uvicorn main:app --reload`

## Code Structure

##### File Description

We stored all annotated data from milestone 3 in the `final_version_annotation.csv` file. In `main.py`, we implemented two 'get requests' function to transfer the json data to our frontend.

##### Example Request

1. `http://127.0.0.1:8000/table/?sentiment=Negative&topic=Health condition&keyword=hate`

```
[
    {
        "tweet_text": "Having a regular cold and not covid is so weird I’m already feeling so much better but I was expecting to be severely ill for weeks. I keep waiting for my smell and taste to disappear but it’s not happening. Getting covid in sept permanently fucked w my mind I hate it",
        "topic": "Negative",
        "sentiment": "Health condition"
    },
    {
        "tweet_text": "So Marco Rubio isn’t at the SOTU because he didn’t have time to get a Covid test?  As a Floridian I have an idea -let’s elect Val Demings and give him plenty of time to do whatever he wants.",
        "topic": "Negative",
        "sentiment": "Health condition"
    },
    {
        "tweet_text": "#GQP members of Congress like @marcorubio @ScottforFlorida think they are too important to take a COVID test. You work for us. You are too lazy &amp; filled with hate for our country to do your job. #VoteThemOut",
        "topic": "Negative",
        "sentiment": "Health condition"
    }
]
```

2. `http://127.0.0.1:8000/chart/?sentiment=All&topic=All&keyword=`

```
# Example output
{
    "topic": [
        {
            "name": "Health condition",
            "value": 119
        },
        {
            "name": "Others",
            "value": 202
        },
        {
            "name": "Policies",
            "value": 96
        },
        {
            "name": "Trends",
            "value": 43
        },
        {
            "name": "Vaccination & Treatments",
            "value": 34
        }
    ],
    "sentiment": [
        {
            "name": "Negative",
            "value": 296
        },
        {
            "name": "Neutral",
            "value": 123
        },
        {
            "name": "Positive",
            "value": 75
        }
    ]
}
```

**All documentation of the backend can be found in main.py.**
