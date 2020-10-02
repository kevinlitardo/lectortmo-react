import React from "react";

import NewsItem from "../../components/news-item/NewsItem";

import "./LastNewsContainer.css";

export default function LastNewsContainer() {
  const data = {
    title: "Plot twist no fansub busca traductores español - japones",
    message:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptas consequatur aspernatur distinctio, neque unde quod modi, vel quibusdam culpa numquam. Asperiores aut, repellat illum nobis odio veniam excepturi! At, eos iste exercitationem consequatur tempora ea dolor iure earum nam quaerat dolorem magni voluptatum possimus itaque, mollitia, adipisci quisquam eveniet.",
    views: 50,
    author: "Adaalberto",
    date: "13 septiembre 2020",
  };

  const styles = {
    backgroundImage:
      "url('https://otakuteca.com/images/news/thumbnail_5f5a8d1b633cf.jpg')",
  };

  return (
    <div className="lastNewsContainer">
      <h2>Últimas Noticias</h2>
      <NewsItem {...data} styles={styles} />
    </div>
  );
}
