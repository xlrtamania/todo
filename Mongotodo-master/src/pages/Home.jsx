import { useState } from "react";
import { Grid, Label, Statistic } from "semantic-ui-react";
import { getCurrentUser, getStats } from "../services";

const stats=await getStats()
const u=await getCurrentUser()

export default function Home(){
    const [l,setL]=useState([{"type":"To do","num":stats.todo,"color":"red"},
    {"type":"Doing","num":stats.doing,"color":"yellow"},
    {"type":"Done","num":stats.done,"color":"green"}])
    console.log(l);
    return(<>
        <Grid centered>
        <Grid.Row centered columns={1}>
      <Grid.Column textAlign="center">
      <Statistic size="huge">
      <Statistic.Value text>
        {u?.nomComplet}
      </Statistic.Value>
      <Statistic.Label>{stats.total} tasks</Statistic.Label>
    </Statistic>
      </Grid.Column>

    </Grid.Row>

    <Grid.Row centered columns={3}>
      {
        l.map(x=>
            <Grid.Column textAlign="center">
      <Statistic size='big' color={x.color}>
      <Statistic.Value>{x.num}</Statistic.Value>
      <Statistic.Label as={Label} color={x.color}>{x.type}</Statistic.Label>
    </Statistic>
      </Grid.Column>
        )
      }
    </Grid.Row>
        </Grid>
        </>)
}