import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class edit extends Component {
    static propTypes = {
        prop: PropTypes
    }

    componentDidMount = () => {
        console.log(this.props.match.params)
    }


    render() {
        return (
            <div>
                <h3>Edit</h3>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(edit)
