// All Notifications
const allNotifs = [
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
    profilePic: "../assets/images/profile-pic-2.jpg",
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
    profilePic: "../assets/images/profile-pic-9.jpg",
    title: "Comment on Your Post",
    content: "John Doe Recently Commented on Your 29",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
  {
    id: 10,
    profilePic: "../assets/images/profile-pic-10.jpg",
    title: "You got 48 Reactions",
    content: "Your Recent Post got 48 Reactions in Last 6 Hr",
    isRead: false,
    isMuted: false,
    isNew: true,
  },
];

// Copying Notifications to Display
const displayedNotifs = JSON.parse(JSON.stringify(allNotifs));

// Sound Effects
const deleteSound = new Audio("../assets/sound/delete.mp3");
const readToggleSound = new Audio("../assets/sound/read-toggle.mp3");
const muteToggleSound = new Audio("../assets/sound/mute-toggle.mp3");
const newNotifSound = new Howl({
  src: ["../assets/sound/new-notif.mp3"],
  volume: 1,
});

// Minimum Notifications to Display
const minNotifsToDisplay = 2;

// Randomly Choosing N Notifications to Display
displayedNotifs.length = Math.floor(
  Math.random() * (allNotifs.length + 1 - minNotifsToDisplay) +
    minNotifsToDisplay
);

// Function to Display Notification Cards
const displayNotifCards = () => {
  let notifCards = "";

  // Traverse Over Displayed Notifications & Make Notification Card
  displayedNotifs.forEach((data) => {
    notifCards += `
    <div class="notif-card" id='${data.id}'>
      <div class="notif-card-body" >
        <i class="ri-delete-bin-3-fill delete-icon" id="${data.id}"></i>

        <div class="profile">
          <img src="${data.profilePic}" />
        </div>
        <h5 class="title">${data.title}</h5>
        <p class="content">${data.content}</p>
      </div>
      <div class="notif-card-footer">
          <div>
            <span class="label">${data.isMuted ? "muted" : "unmuted"}</span>
            <span class="label">${data.isRead ? "read" : "unread"}</span>
            ${
              data.isNew
                ? `<span class='label new-label' id='${data.id}'>new</span>`
                : ""
            }
          </div>
          <div>
            <i class=" ${
              data.isMuted
                ? "ri-notification-off-fill"
                : "ri-notification-4-fill"
            }  mute-toggle-icon" id="${data.id}"></i>
            <i class="${
              data.isRead ? "ri-mail-check-fill" : "ri-mail-unread-fill"
            }    read-toggle-icon" id="${data.id}"></i>
          </div>
      </div>
    </div>
  `;
  });

  // If There is no Notifications to Display
  if (displayedNotifs.length === 0)
    notifCards = "<h2 class='no-notifs-heading'>No notifications yet 🔕</h2>";

  // Inserting Notification Cards to Notifications Container
  document.querySelector(".notifs-container").innerHTML = notifCards;
};

// Function to Display Inbox Status Bar Details
const displayInboxStatusDetails = () => {
  // Find Number of Unread Notifications
  let unreadNotifs = displayedNotifs.filter(function (notif) {
    return !notif.isRead;
  }).length;

  // Find Number of New Notifications
  let newNotifs = displayedNotifs.filter(function (notif) {
    return notif.isNew;
  }).length;

  document.querySelector(".inbox-status-bar").innerHTML = `
        <div class="inbox-status">
          TOTAL
          <span class="inbox-count">${displayedNotifs.length}</span>
        </div>
        <div class="inbox-status">
          UNREAD
          <span class="inbox-count">${unreadNotifs}</span>
        </div>
        <div class="inbox-status">
          NEW
          <span class="inbox-count">${newNotifs}</span>
        </div>
  `;
};

// Function to Find Index of the Notification Object Having Given Id
const findIndexOfNotif = (id) => {
  return displayedNotifs.findIndex((notif) => {
    return notif.id === id;
  });
};

// Function to Delete Notification from displayedNotif & Update DOM & UI
const deleteNotif = (id) => {
  // Find Index of the Notification Object Having Given Id
  let index = findIndexOfNotif(id);

  // Delete Notification Objejct from displayedNotif
  displayedNotifs.splice(index, 1);

  // Play Delete Sound
  deleteSound.pause();
  deleteSound.currentTime = 0;
  deleteSound.play();

  // Update DOM & UI
  updateDOMandUI();
};

// Function to Mute Toggle Notification & Update DOM & UI
const muteToggleNotif = (id) => {
  // Play Mute Toggle Sound
  muteToggleSound.pause();
  muteToggleSound.currentTime = 0;
  muteToggleSound.play();

  // Find Index of the Notification Object Having Given Id
  let index = findIndexOfNotif(id);

  // If Notification is Muted then Unmute It & Vice versa
  displayedNotifs[index].isMuted = displayedNotifs[index].isMuted
    ? false
    : true;

  // Update DOM & UI
  updateDOMandUI();
};

// Function to Read Toggle Notification & Update DOM & UI
const readToggleNotif = (id) => {
  // Play Mute Toggle Sound
  readToggleSound.pause();
  readToggleSound.currentTime = 0;
  readToggleSound.play();

  // Find Index of the Notification Object Having Given Id
  let index = findIndexOfNotif(id);

  // If Notification is Read then Make It Unread and Vice versa
  displayedNotifs[index].isRead = displayedNotifs[index].isRead ? false : true;

  // Update DOM & UI
  updateDOMandUI();
};

// Function to Add Mouse Over Event on Notification Cards to Perform Action When Hovering on Notification Card Having New Label (New Notification) Using Event Bubbling
const addMouseOverEventOnNotifCards = () => {
  document.querySelectorAll(".notif-card").forEach((element) => {
    element.addEventListener("mouseover", (event) => {
      let index = findIndexOfNotif(+event.currentTarget.id);
      if (displayedNotifs[index].isNew) {
        displayedNotifs[index].isNew = false;
        updateDOMandUI();
      }
    });
  });
};

// Function to Update DOM & UI
const updateDOMandUI = () => {
  // Display Notifcation Cards
  displayNotifCards();

  // Display Inbox Statsi Bar Details
  displayInboxStatusDetails();

  // Adding Mouseover Event
  addMouseOverEventOnNotifCards();
};

// Display Notification Cards & Inbox Status Bar Details On Page Load
window.onload = updateDOMandUI;

// Getting Notification Container to Add Click Event on It and Perform Actions When Clicking on Delete, Mute Toggle & Read Toggle Icon Using Event Bubbling
document
  .querySelector(".notifs-container")
  .addEventListener("click", function (event) {
    // Target Element (Element that Triggered the Event)
    let targetElement = event.target;

    if (targetElement.classList.contains("delete-icon"))
      deleteNotif(+targetElement.id);
    else if (targetElement.classList.contains("mute-toggle-icon"))
      muteToggleNotif(+targetElement.id);
    else if (targetElement.classList.contains("read-toggle-icon"))
      readToggleNotif(+targetElement.id);
  });

// Push Some Notifications After Every 5 Seconds
setInterval(() => {
  const minNewNotifs = 1,
    maxNewNotifs = allNotifs.length - displayedNotifs.length;

  if (maxNewNotifs) {
    newNotifSound.play();

    let numOfNewNotifs = Math.floor(
      Math.random() * (maxNewNotifs + 1 - minNewNotifs) + minNewNotifs
    );

    for (let i = 0; i < allNotifs.length && numOfNewNotifs; i++) {
      let j;
      for (j = 0; j < displayedNotifs.length; j++)
        if (displayedNotifs[j].id === allNotifs[i].id) break;

      if (j !== displayedNotifs.length) continue;

      displayedNotifs.push({ ...allNotifs[i] });
      numOfNewNotifs--;
    }

    updateDOMandUI();
  }
}, 8000);

document
  .querySelector(".color-themes-box")
  .addEventListener("click", (event) => {
    let targetElement = event.target;
    if (targetElement.classList.contains("color-picker")) {
      for (let element of document.querySelectorAll(".color-picker"))
        element.classList.remove("selected-color");

      targetElement.classList.add("selected-color");
      document.body.style.backgroundColor =
        getComputedStyle(targetElement).backgroundColor;

      localStorage.setItem(
        "theme-color",
        getComputedStyle(targetElement).backgroundColor
      );
    }
  });

document.body.style.backgroundColor = localStorage.getItem("theme-color");

for (let element of document.querySelectorAll(".color-picker"))
  element.classList.remove("selected-color");

for (let element of document.querySelectorAll(".color-picker")) {
  if (
    getComputedStyle(element).backgroundColor ===
    localStorage.getItem("theme-color")
  )
    element.classList.add("selected-color");
}
