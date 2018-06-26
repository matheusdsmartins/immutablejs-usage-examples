import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { Form, Text } from 'informed'
import { Map } from 'immutable'

import { updateForm } from '../store/example/actions'

const formContainer = WrappedComponent => {
  const mapStateToProps = state => ({
    fullName: state.getIn(['example', 'fullName']),
    age: state.getIn(['example', 'age']),
    job: state.getIn(['example', 'job'])
  })

  const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
      updateForm
    }, dispatch)
  )

  class FormHOC extends Component {
    render () {
      console.log(this.props)
      return <WrappedComponent {...this.props} onSubmit={this.onSubmit} />
    }

    onSubmit = values => {
      const normalizedValues = Map({
        ...values,
        fullName: `${values.firstName} ${values.lastName}`
      })
      .delete('firstName')
      .delete('lastName')

      this.props.updateForm(normalizedValues)
    }
  }

  const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps)
  )

  return enhance(FormHOC)
}

class ExampleForm extends Component {
  render () {
    console.log(this.props)
    return (
      <div>
        <Form id='example-form' onSubmit={this.props.onSubmit}>
          <label htmlFor='first-name'>First name:</label>
          <Text field='firstName' id='first-name' />
          <label htmlFor='last-name'>Last name:</label>
          <Text field='lastName' id='last-name' />
          <label htmlFor='age'>Age:</label>
          <Text field='age' id='age' />
          <label htmlFor='job'>Job:</label>
          <Text field='job' id='job' />
          <button type='submit'>
            Submit
          </button>
        </Form>
        <div>
          <p>Current Name: {this.props.fullName}</p>
          <p>Current Age: {this.props.age}</p>
          <p>Current Job: {this.props.job}</p>
        </div>
      </div>
    )
  }
}

export default formContainer(ExampleForm)