import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class view extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired
    }

    id = this.props.match.params['id']
    contact = this.props.contacts[this.id]

    render() {
        return (
            <div>
                <button
                    onClick={() => this.props.history.goBack()}
                    className="btn btn-sm btn-warning">
                    <i className="fa fa-arrow-left"></i>
                </button>
                <h3  className='mt-3'>Contact</h3>
                <div>
                    <span>Name: </span>  
                    {this.contact.fname} {this.contact.lname}
                </div>
                <div>
                    <span>Phone: </span> 
                    {this.contact.phone}
                </div>
                <div>
                    <span>Email: </span> 
                    {this.contact.email}
                </div>
                <div className="text-center">
                    <button
                        onClick={() => this.props.history.push(`/contact/edit/${this.id}/`)}
                        className="btn btn-sm btn-warning mt-3">
                        <i className="fa fa-pen"></i> Edit
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    contacts: state.contacts
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(view)
