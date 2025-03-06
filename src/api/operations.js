import db from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const getAllTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const addTask = async (taskText) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: taskText,
      completed: false,
    });
    console.log(docRef.id);
    
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
