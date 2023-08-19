import { View, Text, Pressable, FlatList, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Foundation, FontAwesome, AntDesign } from "@expo/vector-icons";
import { taskType } from "../types/types";
import { TaskContext } from "../Context/TaskContext";
import { Ionicons } from "@expo/vector-icons";
const AddTasks = () => {
  const { dispatch, state } = useContext(TaskContext);

  const colors = [
    "#81608B",
    "#FDA162",
    "#DF5C58",
    "#A60D7C",
    "#4D68BF",
    "#0F98A5",
    "#CFEE80",
    "#F9E5A1",
  ];
  const [CurrentTaskContent, setCurrentTaskContent] = useState<string>();
  const [CurrentTaskColor, setCurrentTaskColor] = useState<string>();
  const handelTaskSent = (
    CurrentTaskContent: string,
    CurrentTaskColor: string
  ) => {
    const CurrentTaskHolder: taskType = {
      TaskId: new Date().toISOString(),
      content: CurrentTaskContent,
      color: CurrentTaskColor,
      isDone: false,
      isArchived: false,
    };
    dispatch({ type: "Add_TASK", payload: CurrentTaskHolder });
  };
  return (
    <View className="flex-1  pt-20 px-4">
      <Text className="pb-2">Your Task :</Text>
      <View className="flex flex-row">
        <TextInput
          className=" w-3/4 rounded p-2 h-10 bg-slate-200 border curs"
          onChangeText={(text) => {
            setCurrentTaskContent(text);
          }}
          maxLength={20}
          selectionColor="black"
        />
        <Pressable
          className="flex-1  items-center justify-center rounded ml-2  bg-black "
          onPress={() => {
            if (CurrentTaskContent && CurrentTaskColor) {
              handelTaskSent(CurrentTaskContent, CurrentTaskColor);
            } else {
              ToastAndroid.show(
                "Please deliver color and content.",
                ToastAndroid.SHORT
              );
            }
          }}
        >
          <Text className="text-white">
            <FontAwesome name="plus" size={24} color="white" />
          </Text>
        </Pressable>
      </View>
      <View className="border h-10 mt-4 rounded   items-center justify-center flex flex-row ">
        {colors?.map((color) => {
          return (
            <Pressable
              key={color}
              className={`w-6 h-6 rounded-lg mx-2 ${
                color === CurrentTaskColor ? "border-2" : null
              }`}
              style={{ backgroundColor: color }}
              onPress={() => {
                setCurrentTaskColor(color);
              }}
            ></Pressable>
          );
        })}
      </View>
      <View className="rounded  my-4 flex-1 items-center justify-center   ">
        {state.Tasks && state.Tasks.length > 0 ? (
          <FlatList
            data={state.Tasks}
            key={Math.random()}
            renderItem={({ item }) =>
              item.isArchived === false && item.isDone === false ? (
                <View
                  className="rounded m-2  h-14 w-80 p-2 justify-between items-center flex-row"
                  style={{ backgroundColor: item.color }}
                >
                  <Ionicons
                    name="checkmark-done-circle-outline"
                    size={24}
                    color="black"
                    onPress={() => {
                      dispatch({
                        type: "Done_TASK",
                        payload: item.TaskId,
                      });
                    }}
                  />
                  <Text className="text-base font-semibold">
                    {item.content}
                  </Text>

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
          <>
            <Text className="w-6 text-xl">🫤</Text>
            <Text className="text-xl">You don't have any task</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default AddTasks;
