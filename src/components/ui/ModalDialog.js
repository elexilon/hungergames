import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import { connect } from 'react-redux'
import { closeModal } from '../../actions/modal'

class ModalDialog extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.props.closeModal()
  }

  render() {

    const { modal, body, title  } = this.props

    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
          { body }
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ modal }) => ({
  modal
})

export default connect(mapStateToProps, { closeModal })(ModalDialog)
