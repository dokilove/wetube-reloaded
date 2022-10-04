const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const comments = document.getElementsByClassName("video__comment");

const addComment = (text, newCommentInfo) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = newCommentInfo.newCommentId;

  const commentUserInfo = document.createElement("div");
  commentUserInfo.className = "comment__userInfo";
  const commentUserAvatar = document.createElement("img");
  commentUserAvatar.className = "comment__userAvatar";
  commentUserAvatar.src = `/${newCommentInfo.ownerAvatar}`;
  const commentUsername = document.createElement("span");
  commentUsername.className = "comment__userName";
  commentUsername.innerText = newCommentInfo.ownerName;
  const commentDate = document.createElement("span");
  commentDate.className = "comment__date";
  commentDate.innerText = newCommentInfo.newCommentCreatedAt;
  commentUserInfo.appendChild(commentUserAvatar);
  commentUserInfo.appendChild(commentUsername);
  commentUserInfo.appendChild(commentDate);

  const textDiv = document.createElement("div");
  const commentText = document.createElement("span");
  commentText.className = "comment__text";
  commentText.innerText = ` ${text}`;
  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete__comment";
  deleteBtn.innerText = " ❌";
  deleteBtn.addEventListener("click", (event) => handelDelete(event));
  textDiv.appendChild(commentText);
  textDiv.appendChild(deleteBtn);

  newComment.appendChild(commentUserInfo);
  newComment.appendChild(textDiv);
  videoComments.prepend(newComment);
};

const deleteComment = (commentElement) => {
  commentElement.remove();
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const newCommentInfo = await response.json();
    addComment(text, newCommentInfo);
  }
};

// 동적으로 이벤트를 붙이고 id릃 출력하는 부분까지 함
const handelDelete = async (event) => {
  const commentElement = event.target.parentElement.parentElement;
  const commentId = commentElement.dataset.id;

  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    // 지우기
    deleteComment(commentElement);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

for (let i = 0; i < comments.length; i++) {
  const deleteButton = comments[i].querySelector(".delete__comment");
  if (deleteButton) {
    deleteButton.addEventListener("click", (event) => handelDelete(event));
  }
}
