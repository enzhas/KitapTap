import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/Book.svg";
import Searchform from "./searchform";
import Footer from "./footer";
import Book from "./book";
import LoadingCard from "./loadingCard";

const BookDetails = () => {
  const [details, setDetails] = useState([]);

  const [term, setTerm] = useState("Абай");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const resources = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=11`
      );
      setDetails(resources.data.items);
      setIsLoading(false);
    };
    fetchDetails();
  }, [term]);

  const loadMore = async () => {
    const resources = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=8&startIndex=${details.length}`
    );
    setDetails((oldDetails) => [...oldDetails, ...resources.data.items]);
  };

  return (
    <>
      <div
        className="searchText"
        style={{ filter: "drop-shadow(5px 8px 3px black)" }}
      >
        <h2
          style={{
            textTransform: "capitalize",
            color: "#db4437",
            fontSize: 40,
            marginTop: -60,
            marginBottom: -21,
            fontFamily: "Scheherazade New",
          }}
        >
          {term}
        </h2>
      </div>
      <Searchform searchText={(text) => setTerm(text)}></Searchform>
      {isLoading ? (
        <section className="container" style={{ padding: "2rem 0rem" }}>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : !details ? (
        <h1
          className="loading-name"
          style={{
            background: "white",
            borderRadius: "1rem",
            color: "#DB4437",
            padding: "1rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: 33,
            fontFamily: "Inria Serif",
            transform: "translate(-50%,-50%)",
            textTransform: "capitalize",
            display: "flex",
          }}
        >
          😞 Кітаптар табылмады {term}
        </h1>
      ) : (
        <section>
          <section className="container" style={{ padding: "1rem 0rem" }}>
            {details.map((book, index) => (
              <Book {...book} key={index} />
            ))}
            <div className="custom-card">
              <h3 style={{ fontSize: "1.32rem", color: "white" }}>
              Өзіңізге ұнайтын кітапты таба алмадыңыз ба?
              </h3>
              <br />

              <img
                style={{ width: "100%" }}
                src={logo}
                alt="A man reading a book"
                srcset=""
              />

              <h3 style={{ fontSize: "1.21rem", color: "white" }}>
                Таңдаулыны іздеңіз{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                Жанр{" "}
                </span>
                немесе{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                Автор{" "}
                </span>
                Іздеу жолағындағы Кітап!!{" "}
              </h3>
              <h3>
              немесе <span>Біздің жаңалықтар хатымызға жазылыңыз!</span>
              </h3>
              <form
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your Email"
                  required
                  autoFill="false"
                />
                <button
                  class="join-btn"
                  style={{
                    marginLeft: ".8rem",
                    transition: "all 0.3s ease 0s",
                    padding: "0.6rem",
                    borderRadius: "0.4rem",
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  Қосылу
                </button>
              </form>
            </div>
          </section>
          <div className="load-more">
            <button onClick={() => loadMore()}>Толығырақ оқу!</button>
          </div>
          <Footer></Footer>
        </section>
      )}
    </>
  );
};

export default BookDetails;
