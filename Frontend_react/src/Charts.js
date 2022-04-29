import './App.css';
import Grid from '@material-ui/core/Grid';
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export default function Charts(props) {
    const sentCOLORS = ['#F39C12', '#95A5A6', '#85C1E9']
    const topicCOLORS = ['#8884d8', '#82ca9d', '#0088FE', '#D2B4DE', '#F0B27A'];

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <PieChart width={300} height={300}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={props.stats.sentiment}
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {props.stats.sentiment.map((entry, index) => (
                            <Cell key={`sent-cell-${index}`} fill={sentCOLORS[index]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip />
                </PieChart>
            </Grid>

            <Grid item xs={6}>
                <PieChart width={300} height={300}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={props.stats.topic}
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {props.stats.topic.map((entry, index) => (
                            <Cell key={`topic-cell-${index}`} fill={topicCOLORS[index]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip />
                </PieChart>
            </Grid>
        </Grid>
    )
}
