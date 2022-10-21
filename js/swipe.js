import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Pressable,
  Alert,
  Modal,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import { initData } from './data/data'
import SwipeableFlatList from 'react-native-swipeable-list';
import moment from 'moment'
const WIDTH = Dimensions.get('window').width

const darkColors = {
  background: '#121212',
  primary: '#BB86FC',
  primary2: '#3700b3',
  secondary: '#03DAC6',
  onBackground: '#FFFFFF',
  error: '#CF6679',
};

const colorEmphasis = {
  high: 0.87,
  medium: 0.6,
  disabled: 0.38,
};

const extractItemKey = item => {
  return item.id.toString();
};

const Item = ({ item, backgroundColor, textColor, deleteItem }) => {
  return (
    <>
      <View style={styles.item}>
        <View style={styles.avatar} />
        <View style={styles.messageContainer}>
          <Text style={styles.subject}>{item.date}</Text>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.subject} numberOfLines={1}>
            Subject: {item.subject}
          </Text>
          <Text style={styles.text} numberOfLines={2}>
            {item.text}
          </Text>
        </View>
      </View>
      {/* <View /> */}
    </>
  );
};

function renderItemSeparator() {
  return <View style={styles.itemSeparator} />;
}

const App = () => {

  const [data, setData] = useState(initData);
  const [modalVisible, setModalVisible] = useState(false);

  const deleteItem = itemId => {
    // ! Please don't do something like this in production. Use proper state management.
    const newState = [...data];
    const filteredState = newState.filter(item => item.id !== itemId);
    return setData(filteredState);
  };

  const onReminderListener = (data) => {
    console.log('data==', data);
    if (starttime > curtime) {
      //不提示
    } else {
      //如果当前时间<开始时间 && 开始时间-当前时间==5 reminder
      if (starttime - curtime == 5) {
        //提示
      }else{
        //循环 监听时间
      }
    }

  }
  useEffect(() => {
//     const { d, h, m, s } = useCountDown(
//     {
//       differTime: props.differTime, //ms 两个时间戳的差
//     },
//     () => {
//       if (!props.showBtn) {
//         //倒计时结束 隐藏弹框
//         props.onResend?.()
//       }
//     }
//    )
    //监听
    const reminderListener = DeviceEventEmitter.addListener(EVENT_AMOUNT_CHANGED, onReminderListener)
    return reminderListener.remove()
  }, [])
  const archiveItem = starttime => {
    DeviceEventEmitter.emit('reminder', { time: '2022-10-21 17:10' })

    const curtime = moment(new Date()).format('YYYY-MM-DD HH:mm')
    const startTime = moment(starttime)
    if (moment(curtime).isBefore(starttime)) {
      console.log(startTime.diff(curtime, 'minute'));
      if ((startTime.diff(curtime, 'minute')) == 5) {
        console.log('true');
      }
    }

    setModalVisible(true)
    // Alert.alert(
    //   'DISHONESTY ALERT',
    //   "Not gonna Archive it. We're actually are gonna just delete it.",
    //   [
    //     {
    //       text: 'Just delete it?',
    //       onPress: () => deleteItem(itemId),
    //       style: 'destructive',
    //     },
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //   ],
    // );
  };

  const snoozeItem = itemId => {
    Alert.alert(
      'DISHONESTY ALERT',
      "Not gonna Snooze it. We're actually are gonna just delete it.",
      [
        {
          text: 'Just delete it?',
          onPress: () => deleteItem(itemId),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  const QuickActions = (index, qaItem) => {
    return (
      <View style={styles.qaContainer}>
        <View style={[styles.button,]}>
          <Pressable onPress={() => archiveItem(qaItem.date)}>
            <Text style={[styles.buttonText, styles.button1Text]}>Reminder</Text>
          </Pressable>
        </View>
        <View style={[styles.button]}>
          <Pressable onPress={() => snoozeItem(qaItem.id)}>
            <Text style={[styles.buttonText, styles.button2Text]}>Snooze</Text>
          </Pressable>
        </View>
        <View style={[styles.button,]}>
          <Pressable onPress={() => deleteItem(qaItem.id)}>
            <Text style={[styles.buttonText, styles.button3Text]}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const onEndReached = () => {
    console.log('onEndReached');
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Inbox</Text>
        </View>
        <SwipeableFlatList
          keyExtractor={extractItemKey}
          data={data}
          renderItem={({ item }) => (
            <Item item={item} deleteItem={() => deleteItem} />
          )}
          maxSwipeDistance={240}
          renderQuickActions={({ index, item }) => QuickActions(index, item)}
          contentContainerStyle={styles.contentContainerStyle}
          shouldBounceOnMount={true}
          ItemSeparatorComponent={renderItemSeparator}
          onEndReachedThreshold={0.0001}
          onEndReached={onEndReached}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, { marginTop: 10 }]}>title</Text>
              <Text style={styles.modalText}>Hello World!</Text>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#123456" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", marginLeft: 40 }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '800',
    color: darkColors.onBackground,
    opacity: colorEmphasis.high,
  },
  item: {
    backgroundColor: '#121212',
    height: 100,
    flexDirection: 'row',
    padding: 10,
  },
  messageContainer: {
    backgroundColor: darkColors.backgroundColor,
    maxWidth: 300,
  },
  name: {
    fontSize: 16,
    color: darkColors.primary,
    opacity: colorEmphasis.high,
    fontWeight: '800',
  },
  subject: {
    fontSize: 14,
    color: darkColors.onBackground,
    opacity: colorEmphasis.high,
    fontWeight: 'bold',
    textShadowColor: darkColors.secondary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  text: {
    fontSize: 10,
    color: darkColors.onBackground,
    opacity: colorEmphasis.medium,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: darkColors.onBackground,
    opacity: colorEmphasis.high,
    borderColor: darkColors.primary,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 7,
    alignSelf: 'center',
    shadowColor: darkColors.secondary,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: colorEmphasis.high,
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: darkColors.onBackground,
    opacity: colorEmphasis.medium,
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    opacity: colorEmphasis.high,
  },
  button1Text: {
    color: darkColors.primary,
  },
  button2Text: {
    color: darkColors.secondary,
  },
  button3Text: {
    color: darkColors.error,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: darkColors.backgroundColor,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "gray",
    borderRadius: 20,
    // padding: 35,
    width: WIDTH - 80,
    height: 160,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 90,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
