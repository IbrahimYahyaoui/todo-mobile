import { View, Text } from "react-native";
import React, { useContext } from "react";
import { FlatList } from "react-native-gesture-handler";
import { TaskContext } from "../Context/TaskContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Done = () => {
  const { state, dispatch } = useContext(TaskContext);

  const archivedTasks = state.Tasks.filter((task) => task.isDone);

  return (
    <View className="flex-1  pt-20 px-4">
      <Text>Done Tasks:</Text>
      {archivedTasks && archivedTasks.length > 0 ? (
        <FlatList
          data={state.Tasks}
          key={Math.random()}
          renderItem={({ item }) =>
            item.isDone === !false ? (
              <View
                className="rounded m-2  h-14 w-80 p-2 justify-between items-center flex-row"
                style={{ backgroundColor: item.color }}
              >
                <Ionicons
                  name="checkmark-done-circle"
                  size={24}
                  color="black"
                  onPress={() => {
                    dispatch({
                      type: "Done_TASK",
                      payload: item.TaskId,
                    });
                  }}
                />
                <Text className="text-base font-semibold ">{item.content}</Text>
                <View className="flex-row">
                  <View className="mr-4">
                    <FontAwesome
                      name="trash-o"
                      size={24}
                      color="black"
                      onPress={() => {
                        dispatch({
                          type: "Delete_TASK",
                          payload: item.TaskId,
                        });
                      }}
                    />
                  </View>
                  <View></View>
                </View>
              </View>
            ) : null
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="w-6 text-xl">🫤</Text>
          <Text className="text-xl">Nothing here</Text>
        </View>
      )}
    </View>
  );
};

export default Done;
