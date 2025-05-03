import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import MainDataRender from '../MainData/MainDataRender';


const API_Key = "4deb9f466b364a5f91e1a59caf5a8eb5"


const Top = createMaterialTopTabNavigator();

const NavbTopC = () => {
    // const {color}=theme
    const [mode, setMode] = useState(false)

    const handleToggle = () => {
        setMode(!mode)
    }
    return (
        <NavigationContainer theme={mode ? DarkTheme : DefaultTheme}>
            <>
                <TouchableOpacity style={styles.btn} onPress={handleToggle}>
                    <Text style={styles.btnText}>{mode ? "Light Mode" : "Dark Mode"}</Text>
                </TouchableOpacity>

                <Top.Navigator>
                    <Top.Screen
                        name="General"
                        component={MainDataRender}
                        initialParams={{ category: 'general', API_Key }}
                    />
                    <Top.Screen
                        name="Business"
                        component={MainDataRender}
                        initialParams={{ category: 'business', API_Key }}
                    />
                    <Top.Screen
                        name="Entertainment"
                        component={MainDataRender}
                        initialParams={{ category: 'entertainment', API_Key }}
                    />
                </Top.Navigator>
            </>
        </NavigationContainer>
    )
}

export default NavbTopC


const styles = StyleSheet.create({
    btn: {
        margin: 10,
        backgroundColor: "green",
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btnText: {
        textAlign: "center",
        fontSize: 18,
        color: "white",
    }
});