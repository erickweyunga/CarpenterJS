import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();
  return <h1>Blog Post: {slug}</h1>;
}
