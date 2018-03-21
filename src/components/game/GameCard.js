import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CardText,
        Card, CardImg
} from 'reactstrap'
import './GameCard.css'
import moment from 'moment'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'




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

  render() {
    const { title, playerNumber, starts, ends, picUrl, id } = this.props
    const startFormat = moment(starts).format('DD/MM/YYYY')
    const endFormat = moment(ends).format('DD/MM/YYYY')
    const gamePath = '/game/' + this.props.id
    return (
      <div className="col-12 col-md-4" key={id} >
        <Link to={gamePath}>
        <CardImg top width="100%" height="300px" src={ picUrl } alt={ title } />
        </Link>
        <Card body>
          <Link to={gamePath}>
            <CardText className="GameCardTitle" >{ title }</CardText>
          </Link>
          <CardText>Player Number: { playerNumber }</CardText>
          <CardText>Starts At: { startFormat }</CardText>
          <CardText>Ends At: { endFormat }</CardText>
        </Card>
      </div>
    )
  }
}

export default connect(null, { push })(GameCard)
