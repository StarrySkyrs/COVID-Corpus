import './App.css';
import Charts from './Charts';
import word_cloud from './word_cloud_white.png';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

export default function Intro() {
    const intro_stats = {
        "topic": [
            { "name": "Health condition", "value": 119 },
            { "name": "Others", "value": 202 },
            { "name": "Policies", "value": 96 },
            { "name": "Trends", "value": 43 },
            { "name": "Vaccination & Treatments", "value": 34 }
        ],
        "sentiment": [
            { "name": "Negative", "value": 296 },
            { "name": "Neutral", "value": 123 },
            { "name": "Positive", "value": 75 }
        ]
    }

    return (
        <div className="intro">
            <Typography paragraph variant="body2" color="textSecondary" component="p">
                With the COVID-19 quick spread, we built a COVID corpus for researches related to COVID-19.
                We collected tweets by searching the keyword 'covid' and we have excluded the retweets, replies, links or tweets including any emojis.
                The collected tweets were published between Feb. 23 2022 to Mar. 02 2022.
                We annotated 1000 tweets by two annotators on two fields: <b>sentiment</b> and <b>topics</b>.
                After filtering out the disagreed annotated data, we have 494 texts in our corpus.
            </Typography>

            <Typography gutterBottom variant="h5" component="h1">
                Instruction for Annotation Labels
            </Typography>

            <Grid container>
                <Grid item xs={5}>
                    <Typography gutterBottom variant="subtitle1" component="h1">
                        Sentiment analysis instructions
                    </Typography>
                    <Typography paragraph variant="body2" color="textSecondary" component="p">
                        1)	Positive<br />
                        Sentiment includes joy, excitement, delight.
                        <br /><br />
                        2)	Negative<br />
                        Sentiment includes anger, sarcasm, anxiety, sadness.
                        <br /><br />
                        3)	Neutral<br />
                        Neither positive nor negative, such as a fact statement or a general question.
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography gutterBottom variant="subtitle1" component="h1">
                        Topic classification instructions
                    </Typography>
                    <Typography paragraph variant="body2" color="textSecondary" component="p">
                        1)	Vaccination & Treatments<br />
                        Contents related to vaccination, sanitization, or any other treatment towards COVID-19.
                        <br /><br />
                        2)	Policies<br />
                        Contents related to any policies to against COVID-19. Including masking, quarantine, lockdown, etc.
                        <br /><br />
                        3)	Trends<br />
                        Contents related to any changes of this pandemic. Including statistics, new variants.
                        <br /><br />
                        4)	Health condition<br />
                        Contents related to health conditions. Including exposures, symptoms, progresses, PCR tests, self-tests, etc. It is not limited to the users themselves; it can be health conditions of anyone.
                        <br /><br />
                        5)	Others<br />
                        Contents related to COVID-19 but does not fall in any of the above topics, or contents just mention COVID.
                    </Typography>
                </Grid>
            </Grid>

            <Typography gutterBottom variant="h5" component="h1">
                Corpus Statistics
            </Typography>
            <Typography paragraph variant="body2" color="textSecondary" component="p">
                <Charts stats={intro_stats} />
                <br />
                <br />

                Let’s take a look at the sentiment and topic distribution of these tweets:
                Over half (around 60%) of the tweets are negative, and about a quarter of the tweets are neutral. Only around 15% of the tweets are positive. Accordingly, the sentiment annotation distribution is totally consistent with our intuition: when we talk about COVID, we tend to think it as negative because it causes much trouble.
                <br />
                <br />
                Also, let’s take a look at the topic distribution: Around 60% tweets have a pre-defined topic label we assign in the annotation guideline. The most frequent topics people talk about are health condition (24%) and policies (19%). The new trends, vaccination and treatments counts for about 15%. While other topics counts for over 40%, we can have a whole picture of the corpus through the Word Cloud.
                <br />
                <br />
                The size of the words in the Word Cloud are decided by their frequency. While you see the words highly related to the COVID like vaccines, testing, sick, you can also see the words related to the recent Russia-Ukraine war like: Putin, Russia, Ukraine and political events like Biden, POTUS, SOTU. We can deduce that these words appear in the tweets that are classified into others.

                <div className='img'>
                    <CardMedia
                        component="img"
                        alt="Word cloud"
                        height="10%"
                        image={word_cloud}
                        title="Word cloud"
                    />
                </div>
            </Typography>

            <Typography gutterBottom variant="h5" component="h1">
                Corpus Authors
            </Typography>
            <Typography paragraph variant="body2" color="textSecondary" component="p">
                Yujie Song, Jialiang Lin, Sijia Han, Baozheng Li
            </Typography>
        </div>
    );
}
