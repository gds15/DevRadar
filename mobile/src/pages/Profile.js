import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
    //pegar o nome de usuario que foi passado para a tela de perfil
    const githubusername = navigation.getParam('github_username');

    return <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubusername}` }}/>
}

export default Profile;