from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# Initialize the fast api
app = FastAPI()

# Because we use separate port for react Frontend
# Therefore, I need to specific the CORS so that
# the content won't be blocked by the server
origins = [
    "http://localhost",
    "http://localhost:3000",
]

# Set up the CORS policy,
# In this case, I allow to share the content
# with localhost:3000 with all methods
# including get and post methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Read the csv file that contains our final clean data
input_file = pd.read_csv('final_version_annotation.csv')

# Write the function for the get function
@app.get("/table/", response_class=ORJSONResponse)
async def filter_datatable(sentiment:str = "All", topic:str = "All", keyword:str = ""):
    '''
    This get request handle the request to fetch data for frontend
    datatable display.

    Parameters
    ----------
    sentiment:str
    The tweet that user would like to visit.
    Do not perform filter when sentiment equals to 'All'

    topic:str
    The topic that user would like to visit
    Do not perform filter when topic equals to "All"

    keyword:str
    The keyword for tweet content search
    Do not perform filter when keyword is an empty string

    Returns
    ----------
    result:json object
    list of json object that contains data for frontend display
    '''
    # Initialize the result as a list
    result = list()
    # Use the deep copy to fetch the data before performing
    # subset operation
    subset = input_file.copy()
    # Filter by sentiment
    if sentiment != "All":
        subset = subset[subset["Sentiment"] == sentiment]
    # Filter by topic
    # In order to deal with the & operation
    # We change the frontend by deleting & symbol while
    # add it back when we search in the backend
    if topic != "All":
        if topic == 'Vaccination':
            topic = 'Vaccination & Treatments'
        subset = subset[subset["topic"] == topic]
    # Filter by keyword, whether contains
    if keyword != "":
        subset = subset[subset["Tweet_text"].str.contains(keyword)]
    # generate the counter for each topic
    # loop thorough stisfied rows and append the result
    # By declaring response_class=ORJSONResponse
    # We would able to convert our result into a json object
    for index, row in subset.iterrows():
        tem_dict = dict()
        tem_dict['tweet_text'] = row[0]
        tem_dict['topic'] = row[1]
        tem_dict['sentiment'] = row[2]
        result.append(tem_dict)
    return result

@app.get("/chart/", response_class=ORJSONResponse)
async def filtered_chart(sentiment:str = "All", topic:str = "All", keyword:str = ""):
    '''
    This get request handle the request to fetch data for frontend
    datatable display.

    Parameters
    ----------
    sentiment:str
    The tweet that user would like to visit.
    Do not perform filter when sentiment equals to 'All'

    topic:str
    The topic that user would like to visit
    Do not perform filter when topic equals to "All"

    keyword:str
    The keyword for tweet content search
    Do not perform filter when keyword is an empty string

    Returns
    ----------
    result:json object
    json object that contains the number to be displayed in piechart
    '''
    # Initialize the result as a list
    result = dict()
    # Use the deep copy to fetch the data before performing
    # subset operation
    topic_res = list()
    sentiment_res = list()
    subset = input_file.copy()
    # Filter by sentiment
    if sentiment != "All":
        subset = subset[subset["Sentiment"] == sentiment]
    # Filter by topic
    # In order to deal with the & operation
    # We change the frontend by deleting & symbol while
    # add it back when we search in the backend
    if topic != "All":
        if topic == 'Vaccination':
            topic = 'Vaccination & Treatments'
        subset = subset[subset["topic"] == topic]
    # Filter by keyword, whether contains
    if keyword != "":
        subset = subset[subset["Tweet_text"].str.contains(keyword)]
    # Count the topic with its number of occurance
    topic_counter = subset.groupby('topic').size().reset_index(name='counts')
    # Loop thorough the counter and add its to result
    for topic_idx, topic_row in topic_counter.iterrows():
        tem_dict = dict()
        tem_dict["name"] = topic_row[0]
        tem_dict["value"] = topic_row[1]
        topic_res.append(tem_dict)
    result["topic"] = topic_res
    # Similarily, generate the counter for each sentiment
    # Count the sentiment with its number of occurance
    sentiment_counter = subset.groupby('Sentiment').size().reset_index(name='counts')
    # Loop thorough the counter and add its to result
    for sent_idx, sent_row in sentiment_counter.iterrows():
        tem_dict = dict()
        tem_dict["name"] = sent_row[0]
        tem_dict["value"] = sent_row[1]
        sentiment_res.append(tem_dict)
    # By declaring response_class=ORJSONResponse
    # We would able to convert our result into a json object
    result["sentiment"] = sentiment_res
    return result