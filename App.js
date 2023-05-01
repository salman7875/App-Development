import { useState } from 'react'
import { FlatList, ScrollView, TextInput } from 'react-native'
import { Button, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import GoalInput from './components/GoalInput'
import GoalItem from './components/GoalItem'

export default function App () {
  const [courseGoals, setCourseGoals] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const startAddGoalHandler = () => {
    setModalIsVisible(true)
  }

  const closeGoalHandler = () => {
    setModalIsVisible(false)
  }

  const addGoalHandler = enterGoalText => {
    setCourseGoals(prev => [
      ...prev,
      { id: Math.random().toString(), text: enterGoalText }
    ])
  }

  const deleteGoalHandler = id => {
    setCourseGoals(prev => prev.filter(goal => goal.id !== id))
  }

  return (
    <>
      <StatusBar style='auto' />
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='#5e0acc'
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onClose={closeGoalHandler}
        />
        <View style={styles.listContainer}>
          <FlatList
            data={courseGoals}
            renderItem={itemData => (
              <GoalItem
                id={itemData.item.id}
                text={itemData.item.text}
                onDeleteItem={deleteGoalHandler}
              />
            )}
            keyExtractor={(item, index) => {
              return item.id
            }}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },

  listContainer: {
    flex: 4
  }
})
