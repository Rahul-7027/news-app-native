import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'

const GeneralData = (props) => {
  
  const [data, setData] = useState([])
  const fetchData = async () => {
    let response = await fetch(`https://newsapi.org/v2/top-headlines?category=${props.route.params.category}&apiKey=${props.route.params.API_Key}`);
    let getData = await response.json();
    setData(getData.articles)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View>
      <Text style={styles.text}>General - News</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.url + index}
        renderItem={({ item }) => {
          const imageUrl = item.urlToImage
            ? item.urlToImage
            : 'https://platform.theverge.com/wp-content/uploads/sites/2/2025/05/acastro_STK057_02.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200';
          return (
            <View style={styles.card}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.source}>{item.description}</Text>
                <Text style={styles.publishAt}>{item.publishedAt}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 10
  },
  card: {
    backgroundColor: '#fff',
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
    fontSize: 12,
    color: '#888'
  },
  publishAt: {
    fontSize: 12,
    color: '#888'
  }
});
export default GeneralData
