import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPostById } from "./../actions";
import { Button, Container, Card, TextField } from "@mui/material";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostType } from "./Home";

interface State {
  posts: {
    post: PostType;
  };
}

interface EditPostType {
  post: PostType;
  getPostById: (id: string) => any;
}

function EditPost({ post, getPostById }: EditPostType) {
  // eslint-disable-next-line
  const [postText, setPostText] = useState("");
  // eslint-disable-next-line
  const [postTags, setPostTags] = useState([]);

  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getPostById(id);
    if (post) {
      setPostText(post.text);
      setPostTags(post.tags);
    }
  }, [id, getPostById, post?.text, post?.tags, post]);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value);
  };

  const handleChangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTags(e.target.value.split(/[ ,]+/));
  };

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <Container maxWidth="lg" className="flex column align-c">
      <Button
        onClick={() => history.push("/")}
        variant="contained"
        className="top-left"
      >
        Go Back
      </Button>
      <div className="flex align-c justify-between">
        <h1>Edit Post</h1>
      </div>
      <Card key={post.id} className="card min800">
        <Link to={`/${id}/edit`}></Link>
        <div className="flex mb15">
          <img src={post.image} alt="" height="100" className="mr20" />
          <div className="flex column justify-between w100 mb5">
            <TextField
              label={`Text: ${post.text}`}
              className="mb15"
              onChange={handleChangeText}
            />
            <div className="mb30">
              <TextField
                className="w100 mb30"
                label={`Tags: ${post.tags.join(", ")}`}
                onChange={handleChangeTags}
              />
              <div>
                {`Posted by ${post.owner.firstName} ${post.owner.lastName} on ${
                  post.publishDate.split("T")[0]
                }`}
              </div>
            </div>
            <Button
              variant="contained"
              className="w50"
              color="success"
              onClick={() => history.push("/")}
            >
              Save
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
}

const mapStateToProps = (state: State) => {
  return { post: state.posts.post };
};

export default connect(mapStateToProps, { getPostById })(EditPost);
