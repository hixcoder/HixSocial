class Post {
  constructor(post) {
    this.post = post;
    this.author = post.author.name;
    this.authorImage = post.author.profile_image;
    this.createdAt = post.created_at;
    this.title = post.title ?? "";
    this.body = post.body ?? "";
    this.image = post.image;
    this.tags = post.tags;
    this.id = post.id;
    this.commentCount = post.comments_count;
  }

  PostCard() {
    // console.log(this.post);
    const PostCardHtml = `
            <div class="post">
              <div class="post-head">
                <img id="post-publisher-img" src="${
                  this.authorImage
                }" alt="" onerror="this.onerror=null;this.src='../assets/male.png';"/>
                <div class="post-head-info">
                  <h3>${this.author}</h3>
                  <p>${this.createdAt}</p>
                </div>
              </div>
              <div class="post-body">
                <h3>
                  ${this.title}
                </h3>
                <h4>
                  ${this.body}
                </h4>
                <img id="post-img" src="${this.image}" alt="" />
              </div>
              <div class="post-footer">
                 <div class="tags">
                 ${getTags(this.tags)}
                  </div>
                  <div  onclick="commentBtnClicked(${
                    this.id
                  })"  id="comment-btn-${this.id}" class="comment-btn">
                  <i class="fa-regular fa-message"></i>
                  <h4>comment</h4>
              </div>
              <!-- comments -->
              <div id="comments-section-${this.id}" class="comments-section">
                <p id="comment-count-${this.id}" class="comments-count">${
      this.commentCount
    } Comments</p>

                <div id="all-comments-${this.id}">

                </div>
               
                <div class="send-comment" >
                  <form action="javascript:void()">
                    <input id="sendCommentInput-${
                      this.id
                    }" class="sendCommentInput" type="text" placeholder="Enter Comment">
                    <button id="btnSendComment-${
                      this.id
                    }" class="btnSendComment" onclick="sendCommentBtnClicked(${
      this.id
    })"  ><img src="../assets/send.png" alt=""></button>
                  </form>
                </div>
              </div>
              <!-- comments -->
              </div>
              </div>
            </div>
           `;
    return PostCardHtml;
  }
}
