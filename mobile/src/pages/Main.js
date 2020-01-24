import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

function Main( { navigation } ) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    //pegar a posição inicial do usuario
    useEffect(() => {
        async function loadInitialposition() {
            //esse granted e para ver se o usuario deu permição de usar a localizacao
            const { granted } = await requestPermissionsAsync();

            if ( granted ) {
                const { coords  } = await getCurrentPositionAsync({
                    //abilitar o uso do gps do celular
                    enableHighAccuracy: true,
                });
                
                //pegar a latitude e a longitude de dentro do coords
                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,//o zoom que da inicial no mapa
                    longitudeDelta: 0.04,

                })

            }
        }

        //ja executa ela assim que o useeffect for montado
        loadInitialposition();
    }, []);

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]))
    }, [devs]);

    function setupWebsocket() {
        disconnect();

        const { latitude, longitude } = currentRegion;
        
        connect(
            latitude,
            longitude,
            techs,
        );
    }

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        //console.log(response.data);

        setDevs(response.data.devs);
        setupWebsocket(); //funcao que vai usar websocket
    }


    //funcao para sempre atualizar os devs no mapa quando o usuario mover o mapa
    function handleRegionChanged(region) {
        //console.log(region);
        setCurrentRegion(region);
    }

    //enquanto o currentregion for fazio retorna nulo
    if (!currentRegion) {
        return null;
    }
    
    //o callout e pra quando clicar em cima da foto no mapa abrir as info do dev
    return ( 
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion} 
                style={styles.map}
            >
            
            {devs.map(dev => (
                <Marker 
                    key={dev._id}
                    coordinate={{ 
                        longitude: dev.location.coordinates[0],
                        latitude: dev.location.coordinates[1],                      
                    }}
                >
                <Image 
                    style={styles.avatar} 
                    source={{ uri: dev.avatar_url }}
                />
                
                <Callout onPress={() => {
                    //aqui vai chamar a outra tela quando clicar 
                    navigation.navigate('Profile', { github_username: dev.github_username });
                }} >
                    <View style={styles.callout} >
                        <Text style={styles.devName}>{dev.name}</Text >
                        <Text style={styles.devBio}>{dev.bio}</Text >
                        <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text >
                    </View >
                </Callout >
            </Marker >
            ))}
        </MapView >
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchaInput}
                    placeholder="Buscar dev por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"//aqui para 1 letra ser maiuscula
                    autoCorrect={false}//aqui pra n corrigir o texto digitado
                    value={techs}
                onChangeText={setTechs}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff"/>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius:4,
        borderWidth: 4,
        borderBottomColor: '#fff',
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchaInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
})

export default Main;