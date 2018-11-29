import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'

const HeaderLeft = ({ navigation }) => {
  const onPress = () => {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} >
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: 20
  }
})

export default HeaderLeft