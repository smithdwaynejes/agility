import React from "react"
import { graphql } from "react-apollo"
import { Header, Icon, Grid, Dimmer, Loader, Divider } from "semantic-ui-react"
import fetchTeamById from "../../queries/fetchTeamById"
import TeamSkills from "./TeamSkills"
import Teammates from "./Teammates"

class TeamOverview extends React.Component {
  render() {
    if (this.props.data.loading) {
      return (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )
    }
    return (
      <div>
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>{this.props.data.teamById.name}</Header.Content>
        </Header>
        <Grid columns={3}>
          <Grid.Column>
            <Header>Average Team Skills(Haves)</Header>
            <TeamSkills teamInfo={this.props.data.teamById} />
          </Grid.Column>
          <Grid.Column>
            <Header>Team Needs</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Team</Header>
            <Teammates
              teamInfo={this.props.data.teamById}
              userId={this.props.currentUser.id}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default graphql(fetchTeamById, {
  options: props => {
    return { variables: { id: parseInt(props.match.params.id) } }
  }
})(TeamOverview)