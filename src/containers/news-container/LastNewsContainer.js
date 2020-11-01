import React from "react";

import NewsItem from "../../components/news-item/NewsItem";

import "./LastNewsContainer.css";
import { Grid } from "@material-ui/core";

export default function LastNewsContainer() {
  const news = [
    {
      title: "Plot twist no fansub busca traductores español - japones",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptas consequatur aspernatur distinctio, neque unde quod modi, vel quibusdam culpa numquam. Asperiores aut, repellat illum nobis odio veniam excepturi! At, eos iste exercitationem consequatur tempora ea dolor iure earum nam quaerat dolorem magni voluptatum possimus itaque, mollitia, adipisci quisquam eveniet.",
      views: 110,
      author: "Adaalberto",
      date: "26 octubre 2020",
      background: "https://otakuteca.com/images/news/thumbnail_5f5a8d1b633cf.jpg"
    },
    {
      title: "Ragnarok Scanlation busca redrawers, traductores y cleaners",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptas consequatur aspernatur distinctio, neque unde quod modi, vel quibusdam culpa numquam. Asperiores aut, repellat illum nobis odio veniam excepturi! At, eos iste exercitationem consequatur tempora ea dolor iure earum nam quaerat dolorem magni voluptatum possimus itaque, mollitia, adipisci quisquam eveniet.",
      views: 174,
      author: "Lucas",
      date: "24 octubre 2020",
      background: "https://otakuteca.com/images/news/thumbnail_5f96371f7fcdf.jpg"
    },
    {
      title: "Rakuen Translations busca staff!",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptas consequatur aspernatur distinctio, neque unde quod modi, vel quibusdam culpa numquam. Asperiores aut, repellat illum nobis odio veniam excepturi! At, eos iste exercitationem consequatur tempora ea dolor iure earum nam quaerat dolorem magni voluptatum possimus itaque, mollitia, adipisci quisquam eveniet.",
      views: 85,
      author: "Kaneki",
      date: "24 octubre 2020",
      background: "https://otakuteca.com/images/news/thumbnail_5f971b45a7fd7.jpg"
    },
  ]


  return (
    <div className="lastNewsContainer">
      <h2>Últimas Noticias</h2>
      <Grid container spacing={2}>
        {news.map((item, x) => ( 
          <Grid item key={x} xs={12} sm={6} md={6}>
            <NewsItem 
              title={item.title}
              message={item.message}
              views={item.views}
              author={item.author}
              date={item.date}
              background={item.background}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
