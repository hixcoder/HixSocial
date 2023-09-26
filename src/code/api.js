const baseUrl = "https://tarmeezacademy.com/api/v1";

// this function for fetch all posts
async function fetchPosts() {
  await new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/posts?limit=10`)
      .then((response) => {
        let allPosts = response.data.data;
        var i = 0;
        var postList = [];
        for (post of allPosts) {
          // console.log(post);
          postList.push(
            new Post(
              post.author.name,
              post.author.profile_image,
              post.created_at,
              post.title,
              post.body,
              post.image,
              post.tags
            )
          );
          document.getElementById("posts-container").innerHTML += `
          <div class="post">
            <div class="post-head">
              <img id="post-publisher-img" src="${
                postList[i].authorImage
              }" alt="" onerror="this.onerror=null;this.src='../assets/male.png';"/>
              <div class="post-head-info">
                <h3>${postList[i].author}</h3>
                <p>${postList[i].createdAt}</p>
              </div>
            </div>
            <div class="post-body">
              <h3>
                ${postList[i].title}
              </h3>
              <h4>
                ${postList[i].body}
              </h4>
              <img id="post-img" src="${postList[i].image}" alt="" />
            </div>
            <div class="post-footer">
               <div class="tags">
               ${getTags(postList[i].tags)}
                </div>
                <div class="comment">
                    <i class="fa-regular fa-message"></i>
                    <h4>comment</h4>
              </div>
            </div>
            </div>
          </div>
         `;
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
function register(fullName, userName, email, password, onFinish) {
  params = {
    name: fullName,
    username: userName,
    email: email,
    password: password,
  };
  axios
    .post(`${baseUrl}/register`, params)
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

fetchPosts();
