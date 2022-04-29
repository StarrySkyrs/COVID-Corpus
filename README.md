# COVID-Corpus

> Yujie Song, Jialiang Lin, Baozheng Li, Sijia Han

## Introduction

With the COVID-19 quick spread, we built a COVID corpus for researches related to COVID-19. We collected tweets by searching the keyword 'covid' and we have excluded the retweets, replies, links or tweets including any emojis. The collected tweets were published between Feb. 23 2022 to Mar. 02 2022. We annotated 1000 tweets by two annotators on two fields: sentiment and topics. After filtering out the disagreed annotated data, we have 494 texts in our corpus.

## Setup Insturction

### 1. Docker

- Open **Docker** and make sure everything works fine. If not, please download the lateset version of Docker.
- Type the following commands in the terminal to download frontend and backend images:
  - ```docker pull starryskyr/frontend```
  - ```docker pull starryskyr/backend```
- Download **dock-compose.yml** file.
- Through terminal, get into the directory where the *dock-compose.yml* file is stored in and run the code below:
  - ```docker-compose up```
- When your command says **webpack <version number>compiled successfully**. Open the broswer and enter the link: **<http://localhost:3000/>**.
- Press ```CTRL + C``` in the terminal to quit.

### 2. Setup Frontnend and Backend separately

#### Start frontend server

1. npm
    Go to <https://nodejs.org/en/> and download nodejs

2. Install libraries

```
# Material UI  
npm install @material-ui/core

# Recharts     
npm install recharts

# React-scripts        
npm install react-scripts --save
```

3. To start the server, you can run: `npm start` in the project directory

#### Start backend server

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

## Corpus web interface instruction

- Click **SEARCH** on the main page.
- Choose **Sentiment** or **Topic** or both of them from the dropdown lists.
- Type keyword in **Keyword Search**. (optional)
- Then click **SEARCH** button to show the results.
