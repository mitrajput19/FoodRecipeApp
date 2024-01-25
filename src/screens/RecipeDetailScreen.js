import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../helpers/image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function RecipeDetailScreen(props) {
let item = props.route.params;
  return (
    <ScrollView className="bg-white flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}>
      <StatusBar style='dark'/>
      <View className="flex-row justify-center">
        <CachedImage uri={item.strMealThumb}
        style={{width:wp(98), height:hp(50), borderRadius:53, borderBottomLeftRadius:40, marginTop:4}}
        />
      </View>

    </ScrollView>
  )
}