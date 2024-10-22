import { View, Text } from './Themed';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

export default function FirebaseExample() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const itemsList = [];
      querySnapshot.forEach((doc) => {
        itemsList.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  const addItem = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, 'items'), data);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <View>
      <Text>Your Firebase Data Here</Text>
      {items.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
}