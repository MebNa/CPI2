// const bidenVotesBtn = document.getElementById('current-biden-votes');
// const trumpVotesBtn = document.getElementById('current-trump-votes');
// const shareContent = document.getElementById('share-content'); 
// let bidenVotes = localStorage.getItem('bidenVotes');
// let trumpVotes = localStorage.getItem('trumpVotes');
// let votedFor = localStorage.getItem('votedFor'); 

// if (!bidenVotes) {
//   bidenVotes = 0;
// } else {
//   bidenVotes = parseInt(bidenVotes);
// }

// if (!trumpVotes) {
//   trumpVotes = 0;
// } else {
//   trumpVotes = parseInt(trumpVotes);
// }

// bidenVotesBtn.innerText = bidenVotes;
// trumpVotesBtn.innerText = trumpVotes;


// const btns = document.getElementsByClassName('vote-btn');

// for (let btn of btns) {
//   btn.onclick = function (e) {
//     bidenVotes = localStorage.getItem('bidenVotes');
//     trumpVotes = localStorage.getItem('trumpVotes');

//     if (!bidenVotes) {
//       bidenVotes = 0;
//     } else {
//       bidenVotes = parseInt(bidenVotes);
//     }

//     if (!trumpVotes) {
//       trumpVotes = 0;
//     } else {
//       trumpVotes = parseInt(trumpVotes);
//     }

//     let ripple = document.createElement('span');
//     ripple.classList.add('ripple');
//     this.appendChild(ripple);

//     let rect = this.getBoundingClientRect();
//     let x = e.clientX - rect.left;
//     let y = e.clientY - rect.top;

//     ripple.style.left = `${x}px`;
//     ripple.style.top = `${y}px`;

//     if (this.id === 'for-biden') {
//       localStorage.setItem('bidenVotes', bidenVotes + 1);
//       bidenVotesBtn.innerText = bidenVotes + 1;
//       if (!votedFor) {
//         localStorage.setItem('votedFor', 'biden');
//         shareContent.innerText = `I have voted for Biden. Current Biden votes: ${bidenVotes + 1}`;
//         document.getElementById('for-trump').style.cursor = 'not-allowed';
//         document.getElementById('for-trump').disabled = true;
//       }
//     } else if (this.id === 'for-trump') {
//       localStorage.setItem('trumpVotes', trumpVotes + 1);
//       trumpVotesBtn.innerText = trumpVotes + 1;
//       if (!votedFor) {
//         localStorage.setItem('votedFor', 'trump');
//         shareContent.innerText = `I have voted for Trump. Current Trump votes: ${trumpVotes + 1}`;
//         document.getElementById('for-biden').style.cursor = 'not-allowed';
//         document.getElementById('for-biden').disabled = true;
//       }
//     }

//     setTimeout(() => {
//       ripple.remove();
//     }, 300);
//   };
// }


const firebaseConfig = {
  apiKey: "AIzaSyBeqBl0C5FNEQ-s2CQyzbSRLdJ4nNcA8Ao",
  authDomain: "cpii-b51b9.firebaseapp.com",
  databaseURL: "https://cpii-b51b9-default-rtdb.firebaseio.com",
  projectId: "cpii-b51b9",
  storageBucket: "cpii-b51b9.appspot.com",
  messagingSenderId: "516537986482",
  appId: "1:516537986482:web:811d9484978e2b0a1f48ab",
  measurementId: "G-6M2NJJ3J61"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database(); 

const bidenVotesRef = database.ref('TotalBiden');
const trumpVotesRef = database.ref('TotalTrump');

// Lắng nghe sự thay đổi từ Firebase và cập nhật giao diện
bidenVotesRef.on('value', (snapshot) => {
    bidenVotesBtn.innerText = snapshot.val() || 0; // Nếu không có giá trị, mặc định là 0
});

trumpVotesRef.on('value', (snapshot) => {
    trumpVotesBtn.innerText = snapshot.val() || 0; // Nếu không có giá trị, mặc định là 0
});

const bidenVotesBtn = document.getElementById('current-biden-votes');
const trumpVotesBtn = document.getElementById('current-trump-votes');
const shareContent = document.getElementById('share-content');
let votedFor = localStorage.getItem('votedFor');


const btns = document.getElementsByClassName('vote-btn');

for (let btn of btns) {
    btn.onclick = function (e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        let rect = this.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        if (this.id === 'for-biden') {
            bidenVotesRef.transaction(currentVotes => (currentVotes || 0) + 1);
            if (!votedFor) {
                localStorage.setItem('votedFor', 'biden');
                shareContent.innerText = `I have voted for Biden.`; // Cập nhật thông báo
                document.getElementById('for-trump').style.cursor = 'not-allowed';
                document.getElementById('for-trump').disabled = true;
            }
        } else if (this.id === 'for-trump') {
            trumpVotesRef.transaction(currentVotes => (currentVotes || 0) + 1);
            if (!votedFor) {
                localStorage.setItem('votedFor', 'trump');
                shareContent.innerText = `I have voted for Trump.`; // Cập nhật thông báo
                document.getElementById('for-biden').style.cursor = 'not-allowed';
                document.getElementById('for-biden').disabled = true;
            }
        }

        setTimeout(() => {
            ripple.remove();
        }, 300);
    };
}