import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';

import SwipeableFlatList from 'react-native-swipeable-list';

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
const initData = [
    {
      name: 'Raphael',
      subject: 'amet lorem semper auctor. Mauris vel turpis.',
      date: '2022-10-21 13:00',
      text: 'mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed',
      id: 1,
    },
    {
      name: 'Aquila',
      subject: 'quis, pede. Praesent',
      date: '2022-10-21 14:05',
      text: 'Nunc quis arcu vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac',
      id: 11,
    },
    {
      name: 'Geraldine',
      subject: 'purus sapien, gravida non,',
      date: '2022-10-21 14:30',
      text: 'pede, nonummy ut, molestie in, tempus eu, ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed eget lacus. Mauris non dui nec urna suscipit nonummy. Fusce fermentum',
      id: 21,
    },
    {
      name: 'Geraldine',
      subject: 'nec enim. Nunc ut erat. Sed nunc',
      date: 'Thu, 5th, 2020',
      text: 'Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam.',
      id: 31,
    },
    {
      name: 'Mariko',
      subject: 'lobortis mauris. Suspendisse',
      date: 'Sat, 25th, 2019',
      text: 'mauris sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie in, tempus eu, ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed',
      id: 41,
    },
    {
      name: 'Nicole',
      subject: 'egestas.',
      date: 'Tue, 8th, 2020',
      text: 'vitae mauris sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie in, tempus eu, ligula. Aenean euismod',
      id: 51,
    },
    {
      name: 'Solomon',
      subject: 'ac mattis ornare, lectus',
      date: 'Fri, 10th, 2019',
      text: 'nulla. In tincidunt congue turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum primis in faucibus orci',
      id: 61,
    },
    {
      name: 'Diana',
      subject: 'Suspendisse',
      date: 'Sun, 16th, 2018',
      text: 'dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper,',
      id: 71,
    },
    {
      name: 'Hammett',
      subject: 'eu enim. Etiam imperdiet dictum',
      date: 'Mon, 11th, 2019',
      text: 'molestie sodales. Mauris blandit enim consequat purus. Maecenas libero est, congue a, aliquet vel, vulputate eu, odio.',
      id: 81,
    },
    {
        name: 'Brenna',
        subject: 'neque. Sed eget lacus. Mauris non',
        date: 'Wed, 22nd, 2019',
        text: 'sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam.',
        id: 91,
      },
  ]
  const [data, setData] = useState(initData);

  const deleteItem = itemId => {
    // ! Please don't do something like this in production. Use proper state management.
    const newState = [...data];
    const filteredState = newState.filter(item => item.id !== itemId);
    return setData(filteredState);
  };

  const archiveItem = itemId => {
    const starttime = ''
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
        <View style={[styles.button, styles.button1]}>
          <Pressable onPress={() => archiveItem(qaItem.id)}>
            <Text style={[styles.buttonText, styles.button1Text]}>Reminder</Text>
          </Pressable>
        </View>
        <View style={[styles.button, styles.button2]}>
          <Pressable onPress={() => snoozeItem(qaItem.id)}>
            <Text style={[styles.buttonText, styles.button2Text]}>Snooze</Text>
          </Pressable>
        </View>
        <View style={[styles.button, styles.button3]}>
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
});

export default App;
