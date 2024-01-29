import { View, Text, ScrollView, Image, TextInput ,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
// import { TouchableOpacity } from 'react-native-web';

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [search_text , setSearchText] = useState();
  
  useEffect(() => {
    getCategories();
    getRecipes();
  },[])
  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async () => {
    try {
      const  response = await axios.get("https://themealdb.com/api/json/v1/1/categories.php");
      if( response && response.data){
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const getRecipes = async (category="Beef") => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if( response && response.data){
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log('error: ',error.message);
    }
  }

  const search_this = async (search_text) =>{
    console.log(search_text);
    // try {
    //   const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${search_text}`);
    //   if( response && response.data){
    //     setMeals(response.data.meals);
    //   }
    // } catch (error) {
    //   console.log('error: ',error.message);
    // }
  }

 

  return (
    <View className="flex-1 bg-white">
      <StatusBar style='dark' />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../../assets/images/avatar.png')}
            style={{ width: hp(5.5), height: hp(5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">Hello, Mit</Text>
        <View>
        <Text style={{fontSize: hp(3.8) }} className="font-semibold text-neutral-600"> Make your own food,</Text>
        </View>
        <Text style={{fontSize: hp(3.8) }} className="font-semibold text-neutral-600">Stay at <Text className="text-amber-400">Home</Text></Text>
        </View>

        {/* Search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput 
          onChangeText={text => setSearchText(text)} value={search_text} 
          placeholder='Search any recipe' placeholderTextColor={'gray'} style={{fontSize: hp(1.7)}}
          className = "flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <TouchableOpacity onPress={() =>search_this(search_text)}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color='gray'  />
            </TouchableOpacity>
          </View>
        </View>

        {/* categories */}

        <View>
          {categories.length>0 && <Categories categories={categories} activeCategory ={activeCategory} handleChangeCategory= {handleChangeCategory} />}
        </View>
        {/* recipe */}
        <View>
        <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  )
}