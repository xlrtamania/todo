import { Divider, Grid, Icon } from "semantic-ui-react";
export function Footer(){
    const fLinks=[
        {name:"facebook",href:"https://www.facebook.com/"},
        {name:"instagram",href:"https://instagram.com/"},
        {name:"twitter",href:"https://www.twitter.com/"},
        {name:"snapchat ghost",href:"https://snapchat.com/"},
    ]
return(
    <div id="footer">
        <Divider/>
        <Grid centered>
            <Grid.Row>
                {fLinks.map((x)=>(<Grid.Column key={x.name}>
                    <a href={x.href} >
                        <Icon name={x.name} size="big" color="grey"/>
                    </a>
                </Grid.Column>))}
            </Grid.Row>
            <Grid.Row>
                <h4>Mongotodo 2023©</h4>
            </Grid.Row>
        </Grid>
    </div>
);
}