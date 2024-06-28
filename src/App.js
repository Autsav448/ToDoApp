import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import Task from './components/Task';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const addTask = () => {
    if (title.trim() === '') {
      Alert.alert('Validation Error', 'Task title cannot be empty.');
      return;
    }
    setTasks([...tasks, { id: Date.now().toString(), title, status: 'due' }]);
    setTitle('');
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: task.status === 'due' ? 'done' : 'due' } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
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
          <Task task={item} onToggleStatus={toggleStatus} onDelete={deleteTask} />
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
