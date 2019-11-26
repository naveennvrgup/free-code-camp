import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteContact } from "../actions/directory";

export class directory extends Component {
    static propTypes = {
        deleteContact: PropTypes.func.isRequired,
        contacts: PropTypes.array.isRequired,
    }

    render() {
        const contacts = this.props.contacts.map((ele, i) =>
            <div key={i} className="contact p-2 d-flex px-4 justify-content-between align-items-center">
                <div>
                    <i className="fa fa-user mr-3"></i>
                    <Link to={`/contact/${i}/`} className="name">{ele.fname} {ele.lname}</Link>
                </div>
                <div>
                    <button
                        onClick={() => this.props.deleteContact(i)}
                        className="btn btn-sm btn-warning">
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </div>
        )

        return (
            <div>
                <div className="directory">
                    <h3 className="py-3 text-center title font-weight-bold">Phone Directory</h3>
                    <div className="d-flex justify-content-between px-4 align-items-center">
                        <div className="total">Total contacts: {this.props.contacts.length}</div>
                        <div className="add">
                            <button
                                onClick={() => this.props.history.push('/add/')}
                                className="btn btn-warning btn-sm">
                                Add <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="contacts mt-3">
                        {contacts}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    contacts: state.contacts
})

const mapDispatchToProps = dispatch => ({
    deleteContact: i => dispatch(deleteContact(i))
})

export default connect(mapStateToProps, mapDispatchToProps)(directory)
