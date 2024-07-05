import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import Task from './components/Task';
import { tasksCollection } from './firebaseConfig';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const unsubscribe = tasksCollection.onSnapshot(querySnapshot => {
      const tasksArray = [];
      querySnapshot.forEach(documentSnapshot => {
        tasksArray.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
        });
      });
      setTasks(tasksArray);
    });

    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    if (title.trim() === '') {
      Alert.alert('Validation Error', 'Task title cannot be empty.');
      return;
    }
    await tasksCollection.add({
      title,
      status: 'due',
    });
    setTitle('');
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'due' ? 'done' : 'due';
    await tasksCollection.doc(id).update({
      status: newStatus,
    });
  };

  const deleteTask = async (id) => {
    await tasksCollection.doc(id).delete();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button
        title="Add Task"
        onPress={addTask}
        disabled={title.trim() === ''}
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task
            task={item}
            onToggleStatus={() => toggleStatus(item.id, item.status)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});

export default App;
