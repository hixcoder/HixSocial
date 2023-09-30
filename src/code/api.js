const baseUrl = "https://tarmeezacademy.com/api/v1";

// this function for fetch all posts

async function fetchPosts(reload = true, page = 1) {
  await new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/posts?limit=6&page=${page}`)
      .then((response) => {
        let allComments = response.data.data;
        var i = 0;
        var postList = [];
        // console.log(response.data.meta.last_page);
        lastPage = response.data.meta.last_page;
        if (reload) {
          document.getElementById("posts-container").innerHTML = "";
        }
        for (post of allComments) {
          // console.log(post);
          postList.push(new Post(post));
          var tmp = new Post(post);
          document.getElementById("posts-container").innerHTML +=
            tmp.PostCard();
          i++;
        }
        resolve();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  });
}

// this function for login
function login(userName, password, onFinish) {
  params = {
    username: userName,
    password: password,
  };
  axios
    .post(`${baseUrl}/login`, params)
    .then(function (response) {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      onFinish();
    })
    .catch(function (error) {
      console.log(error);
      if (error.response) {
        // Handle the error with a response
        const loginErrorMsg = document.getElementById("login-error-msg");
        loginErrorMsg.innerHTML = error.response.data.message;
      } else {
        // Handle the error without a response
        console.error("Network error or no response from the server.");
      }
    });
}

// this function for register
function register(fullName, userName, email, password, registerImg, onFinish) {
  let formData = new FormData();
  formData.append("name", fullName);
  formData.append("username", userName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("image", registerImg);
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  axios
    .post(`${baseUrl}/register`, formData, { headers: headers })
    .then(function (response) {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onFinish();
    })
    .catch(function (error) {
      const registerErrorMsg = document.getElementById("register-error-msg");
      registerErrorMsg.innerHTML = error.response.data.message;
      console.log(error.response.data.message);
      // console.log(error.response);
    });
}

// this function for get the post tags
function getTags(tags) {
  tagsHtml = "";
  if (!Array.isArray(tags) || tags.length === 0) {
    // console.log(tags);
    // console.log("getTags error");

    return tagsHtml;
  }
  for (let i = 0; i < tags.length; i++) {
    tagsHtml += `<h5>${tags[i].name}</h5>`;
  }
  // console.log(tagsHtml);
  return tagsHtml;
}

// this function for publish new posts
function publishPost(postTitle, postDescription, postImg, onFinish) {
  const token = localStorage.getItem("token");
  let formData = new FormData();
  formData.append("title", postTitle);
  formData.append("body", postDescription);
  formData.append("image", postImg);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };
  axios
    .post(`${baseUrl}/posts`, formData, { headers: headers })
    .then(function (response) {
      console.log(response.data);
      onFinish();
    })
    .catch(function (error) {
      // console.log(error.response.data.message);
      console.log(error.response);
    });
}

// this function for fetch comments
async function fetchComments(postId) {
  await new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/posts/${postId}`)
      .then((response) => {
        let allComments = response.data.data.comments;
        console.log(allComments.length);
        document.getElementById(
          `comment-count-${postId}`
        ).innerHTML = `${allComments.length} Comments`;
        document.getElementById(`all-comments-${postId}`).innerHTML = "";
        for (comment of allComments) {
          console.log(comment);
          document.getElementById(`all-comments-${postId}`).innerHTML += `
             <div class="users-comment">
                  <img class="users-comment-img " src="${comment.author.profile_image}" alt="" onerror="this.onerror=null;this.src='../assets/male.png';"/>
                  <div class="users-comment-info">
                    <h3>${comment.author.name}</h3>
                    <p>${comment.body}</p>
                  </div>
                </div>
            `;
        }
        resolve();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  });
}

function sendComment(postId, commentBody, onFinish) {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  params = {
    body: commentBody,
  };
  axios
    .post(`${baseUrl}/posts/${postId}/comments`, params, { headers: headers })
    .then(function (response) {
      console.log(response.data);
      fetchComments(postId);
      onFinish();
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function fetchUserPosts(reload = true, page = 1) {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  console.log(userId);

  await new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/users/${userId}/posts`)
      .then((response) => {
        let allComments = response.data.data;
        console.log(allComments);
        if (reload) {
          document.getElementById("posts-container").innerHTML = "";
        }
        var tmpPost;
        var tmpHtml;
        for (post of allComments) {
          // console.log(post);
          tmpPost = new Post(post);
          tmpHtml =
            tmpPost.PostCard() +
            document.getElementById("posts-container").innerHTML;
          document.getElementById("posts-container").innerHTML = tmpHtml;
        }
        resolve();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  });
}
