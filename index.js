const form = document.getElementById("guest-form");
const guestList = document.getElementById("guest-list");
const nameInput = document.getElementById("guest-name");
const categorySelect = document.getElementById("guest-category");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (guestList.children.length >= 10) {
    alert("Guest limit reached (10).");
    return;
  }

  const name = nameInput.value.trim();
  const category = categorySelect.value;
  if (!name) return;

  const li = document.createElement("li");
  li.className = category;
  li.innerHTML = `
    <div class="info">
      <strong>${name}</strong> 
      <span class="timestamp">(${new Date().toLocaleTimeString()})</span><br/>
      <strong>Category:</strong> ${category}<br/>
      <span class="rsvp">❌ Not Attending</span>
    </div>
    <div class="controls">
      <button class="edit-btn">Edit</button>
      <button class="remove-btn">Remove</button>
    </div>
  `;
  guestList.appendChild(li);
  nameInput.value = "";
});

// Handle button actions using event delegation
guestList.addEventListener("click", function (e) {
  const target = e.target;
  const li = target.closest("li");

  if (target.classList.contains("remove-btn")) {
    li.remove();
  }

  if (target.classList.contains("edit-btn")) {
    const nameElem = li.querySelector(".info strong");
    const newName = prompt("Edit guest name:", nameElem.textContent);
    if (newName) nameElem.textContent = newName.trim();
  }

  if (target.classList.contains("rsvp")) {
    target.textContent = target.textContent.includes("Not Attending")
      ? "✅ Attending"
      : "❌ Not Attending";
  }
});
