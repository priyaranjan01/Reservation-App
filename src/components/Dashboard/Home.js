import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Home = ({navigation}) => {
  const [item, setItem] = useState({});
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showCheckInForm, setShowCheckInForm] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TabButton
          source={require('assets/tab/menu-bar.png')}
          onPress={() => null}
        />
      ),
    });
  }, [navigation]);

  const options = [
    {
      id: 1,
      title: "Today's Pickup",
      icon: require('assets/tab/customer.png'),
      count: 4,
      showCount: true,
      action: () => null,
    },
    {
      id: 2,
      title: "Today's Dropoff",
      icon: require('assets/tab/reservation.png'),
      count: 0,
      showCount: true,
      action: () => null,
    },
    {
      id: 3,
      title: 'Open Agreement',
      icon: require('assets/tab/agreement.png'),
      count: 2,
      showCount: true,
      action: () => null,
    },
    {
      id: 4,
      title: 'Overdue Agreement',
      icon: require('assets/tab/vehicle-status.png'),
      count: 0,
      showCount: true,
      action: () => null,
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Customer',
      icon: require('assets/tab/customer.png'),
      showCount: false,
      action: () => setShowCustomerForm(true),
    },
    {
      id: 2,
      title: 'Reservation',
      icon: require('assets/tab/reservation.png'),
      showCount: false,
      action: () => null,
    },
    {
      id: 3,
      title: 'Check OUT',
      icon: require('assets/tab/agreement.png'),
      showCount: false,
      action: () => null,
    },
    {
      id: 4,
      title: 'Check IN',
      icon: require('assets/tab/vehicle-status.png'),
      showCount: false,
      action: () => setShowCheckInForm(true),
    },
  ];

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.topSectionStyle}>
          {options.map((i, index) => (
            <Card data={i} key={index} />
          ))}
        </View>
        <Text style={styles.quickActionsText}>Quick Actions</Text>
        <View style={styles.topSectionStyle}>
          {quickActions.map((i, index) => (
            <Card data={i} key={index} />
          ))}
        </View>
      </ScrollView>

      {showCustomerForm || showCheckInForm ? (
        <View style={styles.formViewStyle}>
          <TouchableWithoutFeedback
            onPress={() => {
              setShowCustomerForm(false);
              setShowCheckInForm(false);
            }}>
            <View style={styles.formEmptyView} />
          </TouchableWithoutFeedback>
          <View style={styles.formFilledView}>
            <Text style={styles.formHeaderStyle}>
              {showCustomerForm ? 'Customer' : 'Check IN'}
            </Text>
            {showCustomerForm ? (
              <GInput
                title={'Phone Number'}
                placeholder="Enter phone number"
                value={item?.phone}
                onChangeText={val => setItem({...item, phone: val})}
                inputProps={{
                  keyboardType: 'phone-pad',
                }}
              />
            ) : (
              <React.Fragment>
                <GInput
                  title={'Agreement Number'}
                  placeholder="Enter agreement number"
                  value={item?.agreement_number}
                  onChangeText={val =>
                    setItem({...item, agreement_number: val})
                  }
                />
                <GInput
                  title={'Vehicle License Number'}
                  placeholder="Enter vehicle license number"
                  value={item?.vehicle_license_number}
                  onChangeText={val =>
                    setItem({...item, vehicle_license_number: val})
                  }
                />
              </React.Fragment>
            )}

            <TouchableOpacity
              style={styles.searchButtonStyle}
              onPress={() => {
                if (showCustomerForm && !item?.phone) {
                  Alert.alert('Phone field is required');
                } else if (
                  showCheckInForm &&
                  (!item?.agreement_number || !item?.vehicle_license_number)
                ) {
                  Alert.alert('All fields are required');
                } else {
                  navigation.navigate('ProductList');
                  setShowCustomerForm(false);
                  setShowCheckInForm(false);
                  setItem({});
                }
              }}>
              <Text style={styles.searchTextStyle}>Search</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButtonStyle}
              onPress={() => {
                setShowCustomerForm(false);
                setShowCheckInForm(false);
                setItem({});
              }}>
              <Text style={styles.cancelTextStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default Home;

const GInput = props => {
  const {title, placeholder, value, onChangeText} = props;
  return (
    <View style={styles.ginputTopView}>
      <Text style={styles.ginputTitle}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.textInputStyle}
        placeholder={placeholder || title}
        {...props.inputProps}
      />
    </View>
  );
};

const Card = ({data}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={data?.action}
        style={styles.cardTouchableStyle}>
        <Image source={data?.icon} style={styles.cardIconStyle} />
        {data?.showCount && (
          <View style={styles.countViewStyle}>
            <Text style={styles.countTextStyle}>{data?.count}</Text>
          </View>
        )}
        <Text style={styles.cardTitleStyle}>{data?.title}</Text>
      </TouchableOpacity>
      {data?.showCount && data?.count === 0 && (
        <View style={styles.shadowViewStyle} />
      )}
    </View>
  );
};

const TabButton = props => {
  const {onPress, source, style} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={[styles.tabImage, style]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardStyle: {
    padding: 10,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 13,
    color: '#888',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'green',
  },
  quickActionsText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1369a3',
    margin: 10,
  },
  scrollViewStyle: {padding: 10, paddingBottom: 40},
  topSectionStyle: {flexDirection: 'row', flexWrap: 'wrap'},
  formViewStyle: {position: 'absolute', width: '100%', height: '100%'},
  formEmptyView: {flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'},
  formFilledView: {paddingHorizontal: 20, backgroundColor: '#fff'},
  formHeaderStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 15,
    alignSelf: 'center',
    color: '#333',
  },
  searchButtonStyle: {
    backgroundColor: '#1369a3',
    borderRadius: 10,
    padding: 15,
    marginTop: 30,
    alignItems: 'center',
  },
  searchTextStyle: {color: '#fff', fontSize: 17, fontWeight: 'bold'},
  cancelButtonStyle: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  cancelTextStyle: {color: '#333', fontSize: 17, fontWeight: 'bold'},
  ginputTopView: {marginTop: 15},
  ginputTitle: {
    fontSize: 13,
    color: '#333',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  textInputStyle: {
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: '#aaa',
  },
  cardTouchableStyle: {
    width: Dimensions.get('window').width / 2 - 30,
    height: Dimensions.get('window').width / 2 - 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cardIconStyle: {height: 40, width: 40, tintColor: '#1369a3'},
  countViewStyle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: '#fff3e9',
  },
  countTextStyle: {fontWeight: 'bold', color: '#ac6031'},
  cardTitleStyle: {fontWeight: 'bold', color: '#333'},
  shadowViewStyle: {
    position: 'absolute',
    height: Dimensions.get('window').width / 2 - 30,
    width: Dimensions.get('window').width / 2 - 30,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  tabImage: {
    marginHorizontal: 10,
    height: 25,
    width: 25,
    tintColor: '#fff',
  },
});
