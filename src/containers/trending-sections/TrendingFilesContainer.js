import React ,{useState, useEffect} from "react";
import axios from "axios";

import FileItem from "../../components/file-item/FileItem";
import Loading from "../../components/loading/Loading";

import "./TrendingContainer.css";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function TrendingMangasContainer({search}) {
  let url;
  if(search !== 'all'){
    url = `https://lectortmo-api.herokuapp.com/api/trending/${search}`
  } else {
    url = `https://lectortmo-api.herokuapp.com/api/trending`
  }
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const req = await axios.get(url);
        setData(req.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, [search]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="trendingContainer">
      <h2>Trending</h2>
      {data.map((item) => (
        <FileItem
          IconStar={StarIcon}
          IconType={FavoriteIcon}
          key={item._id}
          title={item.title}
          type={item.type}
          rating={item.rating}
          demography={item.demography}
          bg={item.imageURL}
          id={item._id}
          description={item.description}
          tags={item.tags}
          status={item.status}
        />
      ))}
    </div>
  );
}
