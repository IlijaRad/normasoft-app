import { useEffect } from "react";
import { CREATE_POST } from "../constants/routes";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { connect } from "react-redux";
import { getPosts } from "./../actions";

export interface PostType {
  id: string;
  text: string;
  publishDate: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  tags: string[];
  image: string;
}

interface State {
  posts: {
    posts: PostType[];
  };
}

interface HomeType {
  posts: PostType[];
  getPosts: () => any;
}
const Home = ({ posts, getPosts }: HomeType) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (posts !== []) {
    return (
      <Container maxWidth="lg">
        <div className="flex align-c justify-between">
          <h1>Posts</h1>
          <Link to={CREATE_POST}>
            <Button variant="contained">New Post</Button>
          </Link>
        </div>
        {posts.map((post: PostType) => (
          <Card key={post.id} className="card">
            <div></div>
            <div className="flex">
              <Link to={`/${post.id}`}>
                <img src={post.image} alt="" height="100" className="mr20" />
              </Link>

              <div className="flex column justify-between w100 mt30 mb5">
                <Link to={`/${post.id}`} className="post-title link">
                  {post.text}
                </Link>

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
          </Card>
        ))}
      </Container>
    );
  }

  return <div>Currently there are no posts available!</div>;
};

const mapStateToProps = (state: State) => {
  return { posts: state.posts.posts };
};

export default connect(mapStateToProps, { getPosts })(Home);
