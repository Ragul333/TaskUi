import React, { useState } from "react";
import { Post } from "./Post";

export const Card = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [modal, setmodal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imgurl, setImgurl] = useState([]);
  const [trending, settrending] = useState([]);
  const [array, setarray] = useState([]);
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const displayModal = (e) => {
    e.preventDefault();
    setmodal(!modal);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = { value: text, image: selectedImage };
    setarray([...array, data]);
    setText("");
    setSelectedImage("");
  };

  const imageHandler = async (e) => {
    e.preventDefault();
    setImg(e.target.value);
    let customGif =
      await fetch(`https://api.giphy.com/v1/gifs/search?api_key=VsCimMLxyvCNn3HEMQfys7kwMQPf190F&q=${img}&limit=25&offset=0&rating=g&lang=en
    `);
    let datas = await customGif.json();
    let trendingGif =
      await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=VsCimMLxyvCNn3HEMQfys7kwMQPf190F&limit=25&rating=g
    `);
    let datas1 = await trendingGif.json();
    setImgurl(datas.data.map((gif) => gif.images.original.url));
    settrending(datas1.data.map((gif) => gif.images.original.url));
  };

  return (
    <>
      <div className="container">
        <div className="col-md-10 mx-auto">
          <div class="card text-center mt-4">
            <div class="card-body" id="header">
              <p>
                <span>
                  <i class="fas fa-pencil-alt"></i>{" "}
                </span>
                Compose Post
              </p>{" "}
              <span style={{ color: "lightgray" }}>|</span>
              <p>
                <span>
                  <i class="fas fa-camera-retro"></i>{" "}
                </span>
                Photo/Video Album
              </p>{" "}
              <span style={{ color: "lightgray" }}>|</span>
              <span>
                <i class="fas fa-video ml-2"></i>{" "}
              </span>
              <p>Live Video</p>
              <p class="ml-auto">X</p>
            </div>
            <div class="card-body">
              <img
                className="float-left"
                src="data:image/png;base64,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"
              ></img>
              <input
                id="body"
                type="text"
                class="form-control"
                value={text}
                placeholder="Write something here..."
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            {selectedImage ? (
              <div class="table-wrapper-scroll-x mx-custom-scrollbar">
                <table class="table mb-0">
                  <tbody>
                    <img
                      class="float-left"
                      src={selectedImage}
                      style={{ height: "100px", width: "80px" }}
                    ></img>
                  </tbody>
                </table>
              </div>
            ) : null}
            <div className="row mt-4">
              <div className="col-md-6 mt-2">
                <button type="button" class="btn btn-light">
                  <span>
                    <i
                      class="fa fa-users"
                      aria-hidden="false"
                      style={{ color: "#57a3de" }}
                    ></i>
                  </span>{" "}
                  Tag Friends
                </button>
              </div>
              <div className="col-md-6 mt-2">
                <button type="button" class="btn btn-light">
                  <span>
                    <i
                      class="fa fa-map-marker pr-1"
                      style={{ color: "#db442a" }}
                    ></i>
                  </span>
                  {"  "}
                  Check in
                </button>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6 mt-2">
                <button
                  onClick={displayModal}
                  type="button"
                  class="btn btn-light"
                >
                  <span id="gif">GIF</span> GIF
                </button>
                <div class="hide">
                  {modal ? (
                    <input
                      type="text"
                      id="body"
                      class="form-control"
                      value={img}
                      onChange={imageHandler}
                    ></input>
                  ) : null}

                  <div class="table-wrapper-scroll-x mx-custom-scrollbar">
                    <table class="table table-bordered  mb-0">
                      <tbody>
                        {img
                          ? imgurl.map((images) => {
                              return (
                                <tr>
                                  <td>
                                    <img
                                      onClick={() => {
                                        setSelectedImage(images);
                                      }}
                                      src={images}
                                      style={{ width: "100px", height: "auto" }}
                                    ></img>
                                  </td>
                                </tr>
                              );
                            })
                          : modal && !img
                          ? trending.map((images) => {
                              return (
                                <tr>
                                  <td>
                                    <a>
                                      <img
                                        onClick={() => {
                                          setSelectedImage(images);
                                        }}
                                        src={images}
                                        style={{
                                          width: "100px",
                                          height: "auto",
                                        }}
                                      ></img>
                                    </a>
                                  </td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-2">
                <button type="button" class="btn btn-light">
                  <span>
                    <i
                      class="fa fa-calendar pr-2"
                      style={{ color: "#ed9687" }}
                    ></i>
                  </span>{" "}
                  Tag Event
                </button>
              </div>
            </div>
            <div class="card-footer mt-4" id="header">
              <div className="ml-auto">
                <button
                  type="button"
                  class="btn "
                  style={{ border: "1px solid black" }}
                >
                  <span>
                    <i class="fa fa-lock pr-2" aria-hidden="false"></i>
                  </span>
                  Only me
                </button>{" "}
                <button
                  type="submit"
                  class="btn btn"
                  style={{ backgroundColor: "#4267B2", color: "white" }}
                  onClick={submitHandler}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        {array !== []
          ? array.map((p) => {
              return <Post post={p} />;
            })
          : null}
      </div>
    </>
  );
};
