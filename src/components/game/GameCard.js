import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, CardText,
        Card, CardImg, Col
} from 'reactstrap'


class GameCard extends PureComponent {
  static propTypes = {
    playerNumber: PropTypes.number.isRequired,
    starts: PropTypes.instanceOf(Date),
    ends: PropTypes.instanceOf(Date),
    urlPic: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }

  render() {
    const {playerNumber, starts, ends, picUrl, id} = this.props
    return (
      <Col sm="4" id={id} >
        <CardImg top width="100%" src={ picUrl } alt="image" />
        <Card body>
          <CardText>Player Number: { playerNumber }</CardText>
          <CardText>Starts At: { starts }</CardText>
          <CardText>Ends At: { ends }</CardText>
          <Button onClick=""> Button </Button>
        </Card>
      </Col>
    )
  }
}

export default GameCard
