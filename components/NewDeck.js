import React,  { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { submitNewDeckTitle } from '../actions'
import { validateTextInput } from '../utils/helpers'
import { white, purple } from '../utils/colors'
import FlashcardsButton from './FlashcardsButton'
import { CONTAINER, LARGE_FONT, TEXT_INPUT } from '../utils/styles'

class NewDeck extends Component {
  state = {
    title: ''
  }

  handleTextChange = (title) => {
    this.setState(() => ({
      title
    }))
  }

  handleSubmit = (title) => {
    const { dispatch, navigation } = this.props
    if(validateTextInput(title,'New deck name')) {
      dispatch(submitNewDeckTitle(title))
      this.setState({ title: ''})
      navigation.navigate('IndividualDeck',{title})
    }
  }

  render() {
    const { title } = this.state
    const { navigation } = this.props

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.largeFont}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={this.handleTextChange}
        />
        <FlashcardsButton
          onPress={() => this.handleSubmit(title)}>
          Submit
        </FlashcardsButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: CONTAINER,
  largeFont: LARGE_FONT,
  textInput: TEXT_INPUT
})

export default connect()(NewDeck)
