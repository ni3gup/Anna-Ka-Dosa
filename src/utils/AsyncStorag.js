import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

export const storeData = async (key, value) => {
  try {
    console.log('key', key, value)
    // Convert the object to a JSON string
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log(err);
  }
};
export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    // Parse the JSON string into an object
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log(err);
  }
};

// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const clearAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage cleared successfully');
//   } catch (error) {
//     console.error('Error clearing AsyncStorage:', error);
//   }
// };

// // Call the function to clear AsyncStorage

// export const storeData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, value);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getData = async key => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     return value;
//   } catch (err) {
//     console.log(err);
//   }
// };
