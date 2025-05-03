import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { FetchNews } from '../CallingApi/Api';
import { useTheme } from '@react-navigation/native';

const MainDataRender = ({ route }) => {
    console.log("Props", route)
    const { colors } = useTheme()
    const { category, API_Key } = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    const NewsData = async () => {
        let response = await FetchNews(category, API_Key);
        setData(response)
    }

    useEffect(() => {
        NewsData()
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.text, { color: colors.text }]}>{route.name} - News</Text>
            {loading ? (<ActivityIndicator color={"black"} />) :
                (<FlatList
                    data={data}
                    keyExtractor={(item, index) => item.url + index}
                    renderItem={({ item }) => {
                        const imageUrl = item.urlToImage
                            ? item.urlToImage
                            : 'https://platform.theverge.com/wp-content/uploads/sites/2/2025/05/acastro_STK057_02.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200';
                        return (
                            <View style={[styles.card, { backgroundColor: colors.card }]}>
                                <Image source={{ uri: imageUrl }} style={styles.image} />
                                <View style={styles.content}>
                                    <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                                    <Text style={[styles.source, { color: colors.text }]}>{item.description ? item.description : "No description"}</Text>
                                    <Text style={[styles.publishAt, { color: colors.text }]}>{item.publishedAt}</Text>

                                </View>
                                <View>
                                </View>
                            </View>
                        );
                    }}
                />)}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 10
    },
    card: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        margin: 12
    },
    image: {
        height: 180,
        width: '100%'
    },
    content: {
        padding: 12
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4
    },
    source: {
        fontSize: 12
    },
    publishAt: {
        fontSize: 12,
        marginTop: 4
    },
    // btnRead: {
    //     backgroundColor: "yellow",
    //     margin: 10,
    //     fontSize: 20,
    //     borderWidth: 2,
    //     borderRadius: 10,
    //     textAlign: "center",

    // }
});
export default MainDataRender
