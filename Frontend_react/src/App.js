import { useState } from 'react';
import './App.css';
import Intro from './Intro';
import Charts from './Charts';
import FilteredTable from './FilteredTable';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`a11y-tabpanel-${index}`}
      aria-labelledby={`a11y-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Typography>{children}</Typography>
      )}
    </div>
  );
}

function App() {
  const [sentiment, setSentiment] = useState('All');
  const [topic, setTopic] = useState('All');
  const [keyword, setKeyword] = useState('');
  const [filteredCorpus, setFilteredCorpus] = useState([]);
  const [stats, setStats] = useState(
    {
      topic: [],
      sentiment: []
    }
  )
  const [initial, setInitial] = useState(true);


  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSentimentChange = (event) => {
    setSentiment(event.target.value);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  // Get Table request
  const getTable = () => {
    fetch(`http://localhost:8000/table/?sentiment=${sentiment}&topic=${topic}&keyword=${keyword}`,
      { mode: 'cors' })
      .then((res) => res.json())
      .then((result) => {
        setFilteredCorpus(result)
        setInitial(false)
      })
      .catch((err) => console.log(`Error: ${err}`))
  }

  // Get Charts request
  const getChart = () => {
    fetch(`http://localhost:8000/chart/?sentiment=${sentiment}&topic=${topic}&keyword=${keyword}`)
      .then((res) => res.json())
      .then((result) => setStats(result))
      .catch((err) => console.log(`Error: ${err}`))
  }

  const handleSubmit = () => {
    getTable();
    getChart();
  }


  return (
    <div className="App">
      {/* Title section */}
      <Typography gutterBottom variant="h2" component="h1">
        Covid Corpus
      </Typography>

      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Introduction" />
        <Tab label="Search" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Intro />
      </TabPanel>
      <TabPanel value={tab} index={1}>


        {/* Search section */}
        <div className="search">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="sentiment">Sentiment</InputLabel>
                <Select
                  labelId="sentiment"
                  id="sentiment"
                  value={sentiment}
                  onChange={handleSentimentChange}
                >
                  <MenuItem value={'All'}>All</MenuItem>
                  <MenuItem value={'Positive'}>Positive</MenuItem>
                  <MenuItem value={'Negative'}>Negative</MenuItem>
                  <MenuItem value={'Neutral'}>Neutral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="topic">Topic</InputLabel>
                <Select
                  labelId="topic"
                  id="topic"
                  value={topic}
                  onChange={handleTopicChange}
                  autoWidth
                >
                  <MenuItem value={'All'}>All</MenuItem>
                  <MenuItem value={'Vaccination'}>Vaccination & Treatments</MenuItem>
                  <MenuItem value={'Policies'}>Policies</MenuItem>
                  <MenuItem value={'Trends'}>Trends</MenuItem>
                  <MenuItem value={'Health condition'}>Health condition</MenuItem>
                  <MenuItem value={'Others'}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField id="standard-basic" label="Keyword Search" value={keyword} onChange={handleKeywordChange} />
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" onClick={handleSubmit}>Search</Button>
            </Grid>
          </Grid>
        </div>

        {/* Pie charts section */}
        <div className='charts'>
          {(initial | filteredCorpus.length) ?
            <Charts stats={stats} />
            : 'Sorry, no such tweets.'
          }
        </div>

        {/* Filtered Table section */}
        {filteredCorpus.length ?
          <FilteredTable filteredCorpus={filteredCorpus} />
          : null
        }
      </TabPanel>

    </div>
  );
}

export default App;
