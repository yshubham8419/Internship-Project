import React, { useContext } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { AppContext } from './AppContext';

function UrlPage(props) {
    const {serverUrl,setServerUrl}=useContext(AppContext)
    return (
        <View>
            <Text>Enter the server url</Text>
            <TextInput value={serverUrl} onChangeText={(str)=>setServerUrl(str)}></TextInput>
            <Button title={'Go'} onPress={()=>props.navigation.navigate('Home')}></Button>
        </View>
    );
}

export default UrlPage;