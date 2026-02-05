import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    databaseURL: "https://SEU_PROJETO.firebaseio.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const roomId = prompt("Código da sala:");
const playerId = Math.random().toString(36).substr(2, 5);
const roomRef = ref(db, "rooms/" + roomId);

set(ref(db, `rooms/${roomId}/players/${playerId}`), {
    score: 0
});

onValue(roomRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // Aqui você atualiza UI do oponente
    console.log(data.players);
});

window.updateScore = (score) => {
    update(ref(db, `rooms/${roomId}/players/${playerId}`), {
        score
    });
};