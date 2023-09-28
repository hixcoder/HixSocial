const baseUrl = "https://tarmeezacademy.com/api/v1";

// this function for fetch all posts

async function fetchPosts(reload = true, page = 1) {
  await new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/posts?limit=6&page=${page}`)
      .then((response) => {
        let allPosts = response.data.data;
        var i = 0;
        var postList = [];
        // console.log(response.data.meta.last_page);
        lastPage = response.data.meta.last_page;
        if (reload) {
          // document.getElementById("posts-container").innerHTML = "";
        }
        for (post of allPosts) {
          // console.log(post);
          postList.push(new Post(post));
          document.getElementById("posts-container").innerHTML +=
            postList[i].PostCard();
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
      console.log(error.response.data.message);
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
      fetchPosts();
    })
    .catch(function (error) {
      console.log(error.response.data.message);
      // console.log(error.response);
    });
}

fetchPosts();
