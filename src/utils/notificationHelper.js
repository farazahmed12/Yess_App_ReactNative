import {firebase} from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigateTo} from './navigationHepler';

export async function requestUserNotificationPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

const getFCMToken = async () => {
  try {
    const oldToken = await AsyncStorage.getItem('fcmToken');
    if (oldToken) {
      console.log('already save token get ====> ', oldToken);
    } else {
      const newToken = await messaging().getToken();
      AsyncStorage.setItem('fcmToken', newToken);
      console.log('new token generated ====> ', newToken);
    }
  } catch (e) {
    console.log(e);
  }
};

export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('onNotificationOpenedApp', remoteMessage.notification);
    if (remoteMessage) {
      navigateTo('BlogDetails', {data: remoteMessage.data?.my_key});
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('getInitialNotification', remoteMessage.data?.my_key);
        navigateTo('BlogDetails', {data: remoteMessage.data?.my_key});
      }
    });

  messaging().messaging(remoteMessage => {
    console.log('receive foreground message ', remoteMessage);
    if (remoteMessage) {
      navigateTo('BlogDetails', {data: remoteMessage.data?.my_key});
    }
  });
};
