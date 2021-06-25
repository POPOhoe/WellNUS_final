import React, { useState, useMemo, useContext, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Agenda, Calendar } from "react-native-calendars";
import { Card, Avatar, ActivityIndicator } from "react-native-paper";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Keyboard } from "react-native";
import firebase from "./../../firebase/fire";

const MoodTracker = () => {
  const [items, setItems] = useState({});

  const [showCalendar, setShowCalendar] = useState(true);

  const [showInput, setShowInput] = useState(false);

  const [data, setData] = useState({
    viewingDate: moment(),
    selectedDate: moment(),
    entry: "",
    previousEntry: "",
  });

  const [visible, setVisible] = useState(false);

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const getData = () => {
      try {
        firebase
          .database()
          .ref("entry")
          .on("value", (snapshot) => {
            const response = snapshot.val();
            if (response !== null) {
              let result = {};
              Object.keys(response).forEach((key) => {
                const value = response[key];
                const date = value.date;
                result[date] = [value];
              });
              setItems(result);
            }
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, [data]);

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 10, marginTop: 17 }}
        onPress={() => {
          console.log(item.selectedDate);
          onChange("e", item.date);
        }}
      >
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.val}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const currentDate = moment().format("YYYY-MM-DD");

  const onChange = (e, selectedDate) => {
    setShowCalendar(false);
    try {
      console.log("updated selected date");
      getSavedEntry(moment(selectedDate));
      setShowInput(true);
    } catch (error) {
      console.log("error in onChange");
    } finally {
      console.log(data.previousEntry);
    }
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        value={new Date(moment())}
        mode="date"
        onChange={onChange}
      />
    );
  };

  const calendar = () => {
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={items}
          selected={currentDate}
          renderItem={renderItem}
          onDayPress={(day) =>
            setData({
              ...data,
              viewingDate: day,
            })
          }
          renderEmptyData={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 30 }}>No entry for this date</Text>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(data.viewingDate.dateString);
                      setData({
                        ...data,
                        selectedDate: moment(data.viewingDate.dateString),
                      });
                      setShowInput(true);
                    }}
                  >
                    <LinearGradient
                      colors={["#08d4c4", "#01ab9d"]}
                      style={{
                        height: 35,
                        width: 150,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 15,
                        marginTop: 20,
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>Add an entry</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />

        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => setShowCalendar(true)}>
            <View style={styles.btnView}>
              <AntDesign name="plus" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        {/* </TouchableOpacity> */}

        {showCalendar && renderDatePicker()}
      </View>
    );
  };

  const goBack = () => {
    setShowInput(false);
    completeEntry();
    console.log("went back");
    setShowLoading(false);
  };

  const onInput = async (val) => {
    try {
      setData({
        ...data,
        entry: val,
      });
      console.log(data.entry);
    } catch (e) {
      console.log("there was an error saving the entry");
    }
  };

  const updateEntry = (id, date) => {
    if (data.entry.length !== 0) {
      let key;
      if (id !== null) {
        key = id;
      } else {
        key = firebase.database().ref().push().key;
      }
      try {
        firebase
          .database()
          .ref("/entry/" + key)
          .set({
            id: key,
            date: date,
            val: data.entry,
          });
        console.log("entry updated");
      } catch (error) {
        console.log("update Entry failed");
        console.log(error.message);
      } finally {
        setData({
          selectedDate: moment(),
          entry: "",
          previousEntry: "",
        });
      }
    } else {
      console.log("there was no input by user (update)");
      setData({
        viewingDate: moment(),
        selectedDate: moment(),
        entry: "",
        previousEntry: "",
      });
    }
  };

  const completeEntry = () => {
    const formattedDate = data.selectedDate.format("YYYY-MM-DD");
    const id = items[formattedDate];
    if (id === undefined) {
      updateEntry(null, formattedDate);
    } else {
      const id2 = id[0].id;
      updateEntry(id2, formattedDate);
    }
  };

  const getSavedEntry = (date) => {
    const selectedDate = date.format("YYYY-MM-DD");

    if (items[selectedDate] !== undefined) {
      console.log("found something");
      setData({
        ...data,
        selectedDate: date,
        previousEntry: items[selectedDate][0].val,
      });
    } else {
      console.log("no previous entry");
      setData({
        ...data,
        selectedDate: date,
      });
    }
  };

  const deleteEntry = async () => {
    const formattedDate = data.selectedDate.format("YYYY-MM-DD");
    const id = items[formattedDate][0].id;
    try {
      await firebase
        .database()
        .ref("/entry/" + id)
        .remove();
      console.log("entry deleted");
      setVisible(false);
      setShowInput(false);
    } catch (error) {
      console.log("delete entry failed");
      console.log(error.message);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const input = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {data.previousEntry ? (
          <View style={styles.hdrIcons}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setShowLoading(true);
                setTimeout(() => {
                  goBack();
                }, 1000);
              }}
            >
              <Ionicons name="md-arrow-back-sharp" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showModal()}>
              <AntDesign
                name="delete"
                size={30}
                color="red"
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.hdrIcons}>
            <TouchableOpacity
              style={{ margintop: 20 }}
              onPress={() => {
                Keyboard.dismiss();
                setShowLoading(true);
                setTimeout(() => {
                  goBack();
                }, 1000);
              }}
            >
              <Ionicons name="md-arrow-back-sharp" size={30} color="black" />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.textHdrView}>
          <Text style={styles.textHdr}>
            {data.selectedDate.format("DD MMMM, YYYY")}
          </Text>
        </View>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            textAlignVertical="top"
            onChangeText={(val) => onInput(val)}
            defaultValue={data.previousEntry}
          />
        </View>

        <Modal isVisible={visible} style={{ backgroundColor: "transparent" }}>
          <View style={styles.modalView}>
            <View style={styles.textView}>
              <Text style={{ fontSize: 20 }}>
                Are you sure you want to delete this entry?
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={{ fontSize: 20, color: "red" }}>
                This action will be irreverisble
              </Text>
            </View>
            <View style={styles.deleteView}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "red",
                  borderRadius: 15,
                  width: 120,
                  height: 40,
                  marginLeft: "10%",
                }}
                onPress={() => hideModal()}
              >
                <Entypo
                  name="cross"
                  size={24}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
                <Text style={{ fontSize: 20, marginRight: 10 }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "green",
                  borderRadius: 15,
                  width: 120,
                  height: 40,
                  marginRight: "10%",
                }}
                onPress={() => deleteEntry()}
              >
                <Ionicons
                  name="md-checkmark"
                  size={24}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
                <Text style={{ fontSize: 20, marginRight: 10 }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={showLoading}
          style={{ backgroundColor: "transparent" }}
        >
          <View
            style={
              ([styles.modalView], [{ flex: 1, justifyContent: "center" }])
            }
          >
            <ActivityIndicator size="large" />
          </View>
        </Modal>
      </View>
    );
  };

  return !showInput ? calendar() : input();
};

const styles = StyleSheet.create({
  hdrIcons: {
    justifyContent: "space-between",
    marginLeft: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    height: "30%",
    borderRadius: 20,
  },
  textView: {
    marginTop: 20,
  },
  deleteView: {
    flexDirection: "row",
    marginTop: 30,
    width: "100%",
    justifyContent: "space-between",
  },
  addBtn: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnView: {
    backgroundColor: "#6495ed",
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  textHdrView: {
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,
    flexDirection: "row",
  },
  textHdr: {
    fontSize: 30,
  },
  textInputView: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "flex-start",
  },
  textInput: {
    fontSize: 25,
    flex: 1,
  },
});

export default MoodTracker;
