const baseUrl = "https://tarmeezacademy.com/api/v1";

// this function for fetch all posts
async function fetchPosts() {
  await new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/posts?limit=60`)
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
              post.createdAt,
              post.title,
              post.body,
              post.image
            )
          );
          document.getElementById("posts-container").innerHTML += `
          <div class="post">
            <div class="post-head">
              <img id="post-publisher-img" src="${postList[i].authorImage}" alt="" onerror="this.onerror=null;this.src='../assets/male.png';"/>
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
              <i class="fa-regular fa-message"></i>
              <h4>comment</h4>
            </div>
          </div>
         `;
          i++;
        }
        resolve();
      })
      .catch((error) => {
        alert(error);
      });
  });
}
fetchPosts();

// this function for fetch all posts
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
