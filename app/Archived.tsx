import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import { TaskContext } from "../Context/TaskContext";
import { FontAwesome } from "@expo/vector-icons";

const Archived = () => {
  const { state, dispatch } = useContext(TaskContext);

  const archivedTasks = state.Tasks.filter((task) => task.isArchived);

  return (
    <View className="flex-1  pt-20 px-4">
      <Text>Archived Tasks:</Text>
      {archivedTasks && archivedTasks.length > 0 ? (
        <FlatList
          data={state.Tasks}
          key={Math.random()}
          renderItem={({ item }) =>
            item.isArchived === !false ? (
              <View
                className="rounded m-2  h-14 w-80 p-2 justify-between items-center flex-row"
                style={{ backgroundColor: item.color }}
              >
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
                  <View>
                    <FontAwesome
                      name="archive"
                      size={24}
                      color="black"
                      className="pr-4"
                      onPress={() => {
                        dispatch({
                          type: "Archive_TASK",
                          payload: item.TaskId,
                        });
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : null
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="w-6 text-xl">🫤</Text>
          <Text className="text-xl">You don't have any archived task</Text>
        </View>
      )}
    </View>
  );
};

export default Archived;
