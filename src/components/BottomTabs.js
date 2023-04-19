import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const Icon = ({icon, activeTab, setActiveTab}) => {
  return (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{
          uri: activeTab === icon.name ? icon.active : icon.inactive,
        }}
        style={[
          styles.icon,
          icon.name === 'Profile' ? styles.profilePic : {},
        ]}
      />
    </TouchableOpacity>
  );
};

const BottomTabs = ({icons}) => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon
            key={index}
            icon={icon}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: '#000',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
