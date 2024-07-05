import React from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';

const Task = ({ task, onToggleStatus, onDelete }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Switch
        value={task.status === 'done'}
        onValueChange={onToggleStatus}
      />
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  taskTitle: {
    flex: 1,
    fontSize: 18,
  },
});

export default Task;
