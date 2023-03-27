import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
 import Spinner from "./Spinner";

export default function News(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalresult, settotalResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const upDate = () => {
    fetch(
      `https:newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=60a1dde8d3d64040bb146ef65b206bb9&page=${page}&pageSize=${props.pageSize}`,
      setLoading(true)
    ).then((res) => {
      res.json().then((resp) => {
        setLoading(false);
        setData(resp.articles);
        settotalResult(resp.totalResults);
      });
    });
  }

  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  console.log(capitalizeFirstLetter('foo')); // Foo
  

  useEffect(() => {
    upDate();
    document.title= `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  }, []);

  const HandlePreviewClick = () => {
    setPage(page - 1);
    upDate();
  };
  const HandleNextClick = () => {
    if (!(page + 1 > Math.ceil(totalresult / props.pageSize))) {
      setPage(page + 1);
      upDate();
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{margin: "35px 0"}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading &&<Spinner />} 
      <div className="row">
        {!loading&&data.map((item, i) => {
          return (
            <div className="col-md-4" key={i}>
              <NewsItem
                title={item.title ? item.title.slice(0, 40) : ""}
                des={item.description ? item.description.slice(0, 70) : ""}
                imageUrl={
                  item.urlToImage
                    ? item.urlToImage
                    : "https://img.etimg.com/thumb/msid-86260427,width-1070,height-580,overlay-economictimes/photo.jpg"
                }
                newsUrl={item.url}
                author={item.author}
                date={item.publishedAt}
                source={item.source.name}
              />
            </div>
          );
        })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={HandlePreviewClick}
        >
          {" "}
          &larr; Preview
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalresult / props.pageSize)}
          type="button"
          className="btn btn-dark"
          onClick={HandleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
