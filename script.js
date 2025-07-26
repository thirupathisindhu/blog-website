/**
 * UniVerse Blog - Comment Handling Script
 * Handles dynamic rendering and interaction of comment sections.
 * Author: [Your Name]
 * Date: June 2025
 */

document.addEventListener("DOMContentLoaded", () => {
  initializeCommentSections();
});

/**
 * Initializes comment sections for each blog post dynamically.
 */
function initializeCommentSections() {
  const sections = document.querySelectorAll(".comment-section");

  sections.forEach(section => {
    const postId = section.dataset.post;

    // Create and append the comment form
    const commentForm = createCommentForm(postId);
    const commentOutput = createCommentOutput(postId);

    section.appendChild(commentForm);
    section.appendChild(commentOutput);
  });
}

/**
 * Creates the comment input form for a post.
 * @param {string} postId - The unique ID of the blog post.
 * @returns {HTMLElement} The comment form element.
 */
function createCommentForm(postId) {
  const form = document.createElement("div");
  form.classList.add("comment-box");
  form.innerHTML = `
    <h4>Leave a Comment</h4>
    <input type="text" id="name${postId}" placeholder="Your name" />
    <textarea id="msg${postId}" placeholder="Your comment"></textarea>
    <button type="button" onclick="addComment(${postId})">Post</button>
  `;
  return form;
}

/**
 * Creates the container where comments will be displayed.
 * @param {string} postId - The unique ID of the blog post.
 * @returns {HTMLElement} The comment output element.
 */
function createCommentOutput(postId) {
  const output = document.createElement("div");
  output.classList.add("comments-output");
  output.id = `comments${postId}`;
  return output;
}

/**
 * Handles comment submission, validation, and rendering.
 * @param {string} postId - The unique ID of the blog post.
 */
function addComment(postId) {
  const nameInput = document.getElementById(`name${postId}`);
  const msgInput = document.getElementById(`msg${postId}`);
  const commentList = document.getElementById(`comments${postId}`);

  const name = nameInput.value.trim();
  const message = msgInput.value.trim();

  if (!name || !message) {
    alert("Both name and comment are required.");
    return;
  }

  const comment = document.createElement("p");
  comment.innerHTML = `<strong>${sanitize(name)}:</strong> ${sanitize(message)}`;
  commentList.appendChild(comment);

  nameInput.value = "";
  msgInput.value = "";
}

/**
 * Sanitizes input text to prevent HTML injection.
 * @param {string} str - The string to sanitize.
 * @returns {string} The sanitized string.
 */
function sanitize(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
