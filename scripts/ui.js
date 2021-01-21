class ChatUI {
  constructor(list) {
    this.list = list;
  }
  clear(list) {
    list.innerHTML = "";
  }
  render(chat) {
    const time = dateFns.distanceInWordsToNow(chat.created_at.toDate(), {
      addSuffix: true,
    });
    const html = `
            <li class="list-group-item">
            <span class="username"><b>${chat.username}</b></span>
            <span class="message">${chat.message}</span>
            <div class="time">${time}</div>
            </li>
      `;

    this.list.innerHTML += html;
  }
}
