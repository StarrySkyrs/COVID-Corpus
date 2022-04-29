# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Libraries

1. npm
    Go to <https://nodejs.org/en/> and download nodejs

2. Material UI  
    ```npm install @material-ui/core```

3. Recharts
    ```npm install recharts```

4. React-scripts
    ```npm install react-scripts --save```

## Components structure

The webpage includes two major sections. An introduction and a search and filter section. The search section includes dynamic pie charts and a filtered data table.

1. Main page -- ```src/App.js```

    Combine all components together  

2. Introduction section -- ```src/Intro.js```

3. Search & filter section -- details are included in ```src/App.js```
    - Pie charts section -- ```src/Charts.js```
    - Filtered Table -- ```src/FilteredTable.js```

## Available Scripts

In the project directory, you can run:

### ```npm start```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
