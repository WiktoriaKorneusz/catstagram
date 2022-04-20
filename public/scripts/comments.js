const btn = document.querySelector("#loadComments");
const comments = document.querySelector(".comments");
const submitBtn = document.querySelector("#submit-btn");
const commentForm = document.querySelector("#comment-form");
const reloadBtn = document.querySelector("#reloadComments");

// Render a comment
const renderComment = (comment) => {
    const li = document.createElement("li");
    li.classList.add("comment");
    li.innerHTML = `<p>
    <span class="primary bold">${comment.name} </span>
    ${comment.comment}
    </p>
    <hr />`;
    comments.appendChild(li);
};

// Fetches comments.
const fetchComments = async (e) => {
    try {
        const postId = e.target.dataset.postid;
        const response = await fetch(`/comments/${postId}`);
        if (!response.ok) {
            alert("oops! Something went wrong");
            return;
        }
        const data = await response.json();

        if (!data || data.length < 1) {
            alert("There are no comments");
            return;
        }

        comments.innerHTML = "";
        data.forEach((comment) => renderComment(comment));
        btn.style.display = "none";

        reloadBtn.style.display = "block";
    } catch (error) {
        alert("oops! Something went wrong");
    }
};

// inserts comment
const submitComment = async (e) => {
    e.preventDefault();
    const data = [...commentForm.querySelectorAll("input")];
    const values = data.map((input) => input.value);
    const comment = {
        postId: values[0],
        name: values[1],
        comment: values[2],
    };
    try {
        const response = await fetch("/add-comment", {
            method: "POST",
            body: JSON.stringify(comment),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            renderComment(comment);
            data.forEach((input) => {
                if (input.type === "text") input.value = "";
            });
            btn.style.display = "none";
            reloadBtn.style.display = "block";
            reloadBtn.textContent = "Load All comments";
        } else {
            alert("oops! Something went wrong");
        }
    } catch (error) {
        alert("oops! Something went wrong");
    }
};

btn.addEventListener("click", fetchComments);
reloadBtn.addEventListener("click", fetchComments);
commentForm.addEventListener("submit", submitComment);