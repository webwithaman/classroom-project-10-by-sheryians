// Notifications
const actualNotifications = [
  {
    id: 1,
    profilePic: "../assets/images/profile-pic-1.jpg",
    title: "New Message from Aman",
    content: "Hey! Are you joining the project meeting at 5 PM?",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
  {
    id: 2,
    profilePic: "../assets/images/profile-pic-7.jpg",
    title: "GitHub: PR Review Needed",
    content: "You were requested to review Pull Request #42 in react-app repo.",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
  {
    id: 3,
    profilePic: "../assets/images/profile-pic-3.jpg",
    title: "New Comment on Your Post",
    content: "Riya commented: 'Loved your latest project! 🔥'",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
  {
    id: 4,
    profilePic: "../assets/images/profile-pic-4.jpg",
    title: "YouTube: New Video Uploaded",
    content: "Fireship uploaded: '100 JavaScript Concepts in 100 Seconds'",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
  {
    id: 5,
    profilePic: "../assets/images/profile-pic-5.jpg",
    title: "New Follower on Twitter",
    content: "John Doe started following you.",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
  {
    id: 6,
    profilePic: "../assets/images/profile-pic-6.jpg",
    title: "Instagram: Story Mention",
    content: "You were mentioned in a story by @devgirl_24",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
  {
    id: 7,
    profilePic: "../assets/images/profile-pic-7.jpg",
    title: "System Update Available",
    content: "A new update is available for your device. Tap to download.",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
  {
    id: 8,
    profilePic: "../assets/images/profile-pic-8.jpg",
    title: "New Like on Your Post",
    content: "Your photo got 37 new likes. Keep it up!",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
  {
    id: 9,
    profilePic: "../assets/images/profile-pic-4.jpg",
    title: "Meeting Reminder",
    content: "Daily Standup with Dev Team in 15 minutes.",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
  {
    id: 10,
    profilePic: "../assets/images/profile-pic-6.jpg",
    title: "Gmail: New Mail from HR",
    content: "Your interview is scheduled for Tuesday at 11:00 AM.",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
];

const notifications = [...actualNotifications];

var newNotificationSound = new Howl({
  src: ["../assets/music/new-notification.mp3"],
  autoplay: false,
  loop: false,
  volume: 1,
  onend: function () {
    console.log("Finished playing!");
  },
});

notifications.length = Math.floor(
  Math.random() * (notifications.length + 1 - 3) + 3
);

let deleteNotificationSound = new Audio("../assets/music/delete.mp3");
let readNotificationSound = new Audio("../assets/music/read.mp3");
let muteNotificationSound = new Audio("../assets/music/mute.mp3");

function displayCards() {
  let cards = "";
  notifications.forEach((data) => {
    cards += `
  <div class="card" id='${data.id}'>
      <div class="card-body" >
          <i class="ri-delete-bin-3-fill delete" id="${data.id}"></i>

        <div class="profile">
          <img src="${data.profilePic}" />
        </div>
        <h5 class="title">${data.title}</h5>
        <p class="content">${data.content}</p>
        </div>
        <div class="btns">
          <div>
            <span>${data.isMuted ? "muted" : "unmuted"}</span>
            <span>${data.isRead ? "read" : "unread"}</span>
            ${data.isNew ? `<span class='new' id='${data.id}'>new</span>` : ""}
          </div>
          <div>
            <i class=" ${
              data.isMuted
                ? "ri-notification-off-fill"
                : "ri-notification-4-fill"
            }  mute" id="${data.id}"></i>
           <i class="${
             data.isRead ? "ri-mail-check-fill" : "ri-mail-unread-fill"
           }    read" id="${data.id}"></i>
          </div>
        </div>
      </div>
  `;
  });
  if (notifications.length === 0) cards = "No Data";
  document.querySelector(".cards-container").innerHTML = cards;
  eventE();
}

let newNot = notifications.length;

displayCards();

function t(u) {
  return notifications.findIndex(function (e) {
    return e.id === u;
  });
}

function eventE() {
  document.querySelectorAll(".card").forEach(function (c) {
    c.addEventListener("mouseover", function (e) {
      let index = t(+this.id);
      console.log(index);
      if (notifications[index].isNew) {
        actualNotifications[index].isNew = false;
        notifications[index].isNew = false;
        newNot--;
        displayNot();
        displayCards();
      }
    });
  });
}

document
  .querySelector(".cards-container")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      notifications.splice(notifications[e.target.id], 1);
      deleteNotificationSound.pause();
      deleteNotificationSound.currentTime = 0;
      deleteNotificationSound.play();
      displayCards();
      displayNot();
    } else if (e.target.classList.contains("mute")) {
      muteNotificationSound.pause();
      muteNotificationSound.currentTime = 0;
      muteNotificationSound.play();
      let index = t(+e.target.id);
      console.log(index);
      if (e.target.classList.contains("ri-notification-4-fill"))
        notifications[index].isMuted = true;
      else notifications[index].isMuted = false;

      displayCards();
      displayNot();
    } else if (e.target.classList.contains("read")) {
      let index = t(+e.target.id);
      readNotificationSound.pause();
      readNotificationSound.currentTime = 0;
      readNotificationSound.play();
      if (e.target.classList.contains("ri-mail-unread-fill"))
        notifications[index].isRead = true;
      else notifications[index].isRead = false;

      displayCards();
      displayNot();
    }
  });

displayNot();

function displayNot() {
  let total = notifications.length;

  let unread = notifications.filter(function (e) {
    return !e.isRead;
  }).length;

  document.querySelector(".boxes").innerHTML = `
    <div>
          notifications
          <span>${total}</span>
        </div>
        <div>
          unread
          <span>${unread}</span>
        </div>
        <div>
          new
          <span>${newNot}</span>
        </div>
  `;
}

setInterval(function () {
  let diff = actualNotifications.length - notifications.length;

  if (diff) {
    let n = Math.floor(Math.random() * (diff + 1 - 1) + 1);
    newNot += n;
    let i = notifications.length;

    while (i < notifications.length + n) {
      actualNotifications[i].isNew = true;
      i++;
    }
    i = notifications.length;

    newNotificationSound.currentTime = 0;
    newNotificationSound.play();
    while (n) {
      notifications.splice(i, 0, actualNotifications[i]);
      n--;
      i++;
    }

    displayCards();
    displayNot();
  }
}, 8000);
