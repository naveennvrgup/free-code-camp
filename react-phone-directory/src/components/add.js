import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addContact, updaten } from '../actions/add';
import { editContact } from '../actions/edit'

export class add extends Component {
    state = {
        edit: false
    }

    componentDidMount = () => {
        this.id = this.props.match.params['id']
        if (this.id) {
            const contact = this.props.contacts[this.id]

            this.setState({
                ...this.state,
                edit: true,
                contact
            })

            Object.keys(contact).forEach(ele => {
                this.props.updaten('n' + ele, contact[ele])
            })
        }
    }

    componentWillUnmount = () => {
        ['fname', 'lname', 'email', 'phone'].forEach(ele => {
            this.props.updaten('n' + ele, '')
        })
    }



    static propTypes = {
        nfname: PropTypes.string.isRequired,
        nlname: PropTypes.string.isRequired,
        nemail: PropTypes.string.isRequired,
        nphone: PropTypes.string.isRequired,
        contacts: PropTypes.array.isRequired,
        addContact: PropTypes.func.isRequired,
        updaten: PropTypes.func.isRequired,
    }

    _addContact = e => {
        e.preventDefault()
        this.props.addContact()
        this.props.history.push('')
    }

    _editContact = e => {
        e.preventDefault()
        this.props.editContact(this.id)
        this.props.history.push('')
    }

    render() {
        return (
            <div>
                <button
                    onClick={() => this.props.history.goBack()}
                    className="btn btn-sm btn-warning">
                    <i className="fa fa-arrow-left"></i>
                </button>

                <h3 className="mt-3">
                    {this.state.edit ? 'Edit Contact' : 'Add new contact'}
                </h3>

                <form className='mt-4'>
                    <input
                        value={this.props.nfname}
                        className='form-control mt-2'
                        placeholder='First name'
                        onChange={(e) => this.props.updaten('nfname', e.target.value)}
                        type="text" id="nfname" />
                    <input
                        value={this.props.nlname}
                        className='form-control mt-2'
                        placeholder='Last name'
                        onChange={(e) => this.props.updaten('nlname', e.target.value)}
                        type="text" id="nlname" />
                    <input
                        value={this.props.nemail}
                        className='form-control mt-2'
                        placeholder='Email'
                        onChange={(e) => this.props.updaten('nemail', e.target.value)}
                        type="text" id="nemail" />
                    <input
                        value={this.props.nphone}
                        className='form-control mt-2'
                        placeholder='Mobile'
                        onChange={(e) => this.props.updaten('nphone', e.target.value)}
                        type="text" id="nphone" />
                    <div className="text-center mt-4">
                        <button
                            onClick={this.state.edit ? this._editContact : this._addContact}
                            className="btn btn-sm btn-warning">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => state

const mapDispatchToProps = d => ({
    addContact: () => d(addContact()),
    editContact: (id) => d(editContact(id)),
    updaten: (name, value) => d(updaten(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(add)
