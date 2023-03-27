import React from "react";

export default function NewsItem(props) {
  return (
    <div className="my-3">
      <div className="card" >
     
        <img
          src={props.imageUrl}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}.... <span className="badge bg-success">{props.source}</span></h5>
          <p className="card-text">{props.des}....</p>
          <p className="card-text"><small className="text-danger">By {props.author?props.author:"Unknown"} on {new Date(props.date).toGMTString()}</small></p>
          <a href={props.newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
