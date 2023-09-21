class Post {
  constructor(
    author = "author",
    authorImage = "",
    createdAt = "",
    title = "",
    body = "",
    image = ""
  ) {
    this.author = author;
    this.authorImage = authorImage;
    this.createdAt = createdAt;
    this.title = title ?? "";
    this.body = body ?? "";
    this.image = image;
  }
}
