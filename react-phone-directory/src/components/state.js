import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class state extends Component {
    static propTypes = {
        nfname: PropTypes.string.isRequired,
        nlname: PropTypes.string.isRequired,
        nemail: PropTypes.string.isRequired,
        nphone: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div className="state">
                <h3>State: </h3>
                <div>
                    <span>Total contacts:</span> {this.props.contacts.length}
                </div>
                <div>
                    <span>First name:</span>  {this.props.nfname}
                </div>
                <div>
                    <span>Last name:</span> {this.props.nlname}
                </div>
                <div>
                    <span>Email:</span> {this.props.nemail}
                </div>
                <div>
                    <span>Phone:</span> {this.props.nphone}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => state

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(state)
