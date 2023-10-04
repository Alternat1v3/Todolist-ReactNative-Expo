import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Tasks from './components/Tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);


  useEffect(() => {
    // Load stored tasks when the component mounts
    loadTasks();
  }, []);

  useEffect(() => {
    // Save tasks whenever taskItems change
    saveTasks();
  }, [taskItems]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTaskItems(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('Error loading tasks', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(taskItems));
    } catch (error) {
      console.log('Error saving tasks', error);
    }
  };

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask('');
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.heading}>Tasks</Text>
        <View style={styles.tasks}>
          <ScrollView style={styles.scrollContainer}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Tasks text={item} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrap}>
        <TextInput style={styles.input} placeholder="Enter Your Task" value={task} onChangeText={(text) => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tasks: {
    marginTop: 25,
  },
  writeTaskWrap: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#FFF",
    width: 350,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    fontSize: 30,
  },
  scrollContainer: {
    maxHeight: "100%",
  }
});
