import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, CardText,
        Card, CardImg, Col
} from 'reactstrap'
import './GameCard.css'
import moment from 'moment'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'


class GameCard extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    playerNumber: PropTypes.number.isRequired,
    starts: PropTypes.string.isRequired,
    ends: PropTypes.string.isRequired,
    picUrl: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired
  }

  onClick()
  {
    this.props.push('/game/' + this.props.id)
  }

  render() {
    const { title, playerNumber, starts, ends, picUrl, id } = this.props
    const startFormat = moment(starts).format('DD/MM/YYYY')
    const endFormat = moment(ends).format('DD/MM/YYYY')
    return (
      <Col sm="4" key={id} >
        <CardImg top width="100%" src={ picUrl } alt={ title } />
        <Card body>
          <CardText className="GameCardTitle" >{ title }</CardText>
          <CardText>Player Number: { playerNumber }</CardText>
          <CardText>Starts At: { startFormat }</CardText>
          <CardText>Ends At: { endFormat }</CardText>
          <Button onClick={ this.onClick.bind(this) }> Button </Button>
        </Card>
      </Col>
    )
  }
}

export default connect(null, { push })(GameCard)
