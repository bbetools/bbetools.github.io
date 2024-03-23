import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import { getFirestore, collection, getDocs, where, and, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'
const firebaseConfig = {
  apiKey: "AIzaSyC4NyMl98ye9Jzsp1RNPywdFT0Nvy53sks",
  authDomain: "bbe-collection.firebaseapp.com",
  projectId: "bbe-collection",
  storageBucket: "bbe-collection.appspot.com",
  messagingSenderId: "75794038170",
  appId: "1:75794038170:web:43a17d3f54ae259bf04e23",
  measurementId: "G-Q6LPX422YN"
};
const app = initializeApp(firebaseConfig);
async function getDB(nw,condition=null){
  let db=await getFirestore();
  let col=await collection(db,nw);
  let qx;
  if(condition){
    if(condition.where.length===1){
      qx=query(col,where(condition.where[0][0],condition.where[0][1],condition.where[0][2]));
    }
    else if(condition.where.length===2){
      qx=query(col,and(where(condition.where[0][0],condition.where[0][1],condition.where[0][2]),where(condition.where[1][0],condition.where[1][1],condition.where[1][2])));
    }
  }
  else{qx=col}
  let q=query(qx, orderBy("resource_id", "asc"))
  return q;
}
export async function getFirestoreDB(dataName,condition=null){
  let mpj=await getDocs(await getDB(dataName,condition));
  let mpjd=mpj.docs;
  let dbdata=[];
  for(let slg of mpjd){
    dbdata.push({ ...slg.data()})
  }
  return dbdata;
}
export async function viewFirestoreDB(dataName,condition=null){
  let data=await getFirestoreDB(dataName,condition);
  console.log(JSON.stringify(data,null,4));
}
