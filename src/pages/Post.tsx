import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getPostById, getCommentsByPostId } from "./../actions";
import { Button, Container, Card, TextField } from "@mui/material";
import { Link, useHistory, useParams } from "react-router-dom";
import getUUID from "../helpers/getUUID";
import { PostType } from "./Home";

interface Comment {
  id: string;
  message: string;
  owner: {
    firstName: string;
    lastName: string;
  };
}

interface State {
  posts: {
    post: PostType;
  };
  comments: {
    comments: Comment[];
  };
}

interface PostParams {
  post: PostType;
  comments: Comment[];
  getPostById: (id: string) => any;
  getCommentsByPostId: (id: string) => any;
}

function Post({
  post,
  comments,
  getPostById,
  getCommentsByPostId,
}: PostParams) {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const [addedComments, setAddedComments] = useState([]);

  const [allComments, setAllComments] = useState<Comment[]>(comments);

  useEffect(() => {
    getPostById(id);
    getCommentsByPostId(id);
  }, [id, getPostById, getCommentsByPostId]);

  useEffect(() => {
    setAllComments(comments.concat(addedComments));
  }, [comments, addedComments]);

  function addComment() {
    if (inputRef.current.value !== "") {
      setAddedComments([
        ...addedComments,
        {
          id: getUUID(),
          message: inputRef.current.value,
          owner: {
            firstName: "Anonymous",
            lastName: "User",
          },
        },
      ]);
    } else {
      alert("Comment must contain text");
    }
    inputRef.current.value = "";
  }

  if (post && allComments) {
    return (
      <Container maxWidth="lg" className="mt50">
        <Button
          onClick={() => history.push("/")}
          variant="contained"
          className="top-left"
        >
          Go Back
        </Button>
        <div className="flex align-c justify-between">
          <h1>Post</h1>
        </div>
        <Card key={post.id} className="card">
          <Link to={`/${id}/edit`}>
            <Button
              variant="contained"
              className="top-right button-edit"
              color="success"
            >
              Edit
            </Button>
          </Link>
          <div className="flex mb15">
            <img src={post.image} alt="" height="100" className="mr20" />
            <div className="flex column justify-between w100 mt30 mb5">
              <div className="post-title">{post.text}</div>
              <div className="flex justify-between">
                <div>Tags: {post.tags.join(", ")}</div>
                <div>
                  {`Posted by ${post.owner.firstName} ${
                    post.owner.lastName
                  } on ${post.publishDate.split("T")[0]}`}
                </div>
              </div>
            </div>
          </div>
          <div className="comments mb15">
            {allComments.map((comment: Comment) => (
              <div className="small-card" key={comment.id}>
                <span className="bold">{`${comment.owner.firstName} ${comment.owner.lastName}:`}</span>{" "}
                {`${comment.message}`}
              </div>
            ))}
          </div>
          <div
            className={
              allComments.length > 0
                ? "comment-container align-c"
                : "comment-container align-c mt50"
            }
          >
            <TextField
              inputRef={inputRef}
              label="Leave a comment"
              variant="standard"
              size="small"
              className="mr20"
              fullWidth
            />
            <Button
              size="small"
              variant="contained"
              className="button-post"
              onClick={() => {
                addComment();
              }}
            >
              Post
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return <div>Post loading...</div>;
}

const mapStateToProps = (state: State) => {
  return { post: state.posts.post, comments: state.comments.comments };
};

export default connect(mapStateToProps, { getPostById, getCommentsByPostId })(
  Post
);
