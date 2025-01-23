import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import list_appbar from "../assets/list/list_appbar.svg";
import list_logo from "../assets/list/logo.svg";
import list_profile from "../assets/list/profile.svg";
import previous_arrow from "../assets/list/previous_arrow.svg";
import next_arrow from "../assets/list/next_arrow.svg";
import create_icon from "../assets/list/create_icon.svg";
import Card from "../components/Card";
import ApplyModal from "../components/ApplyModal";
import "../styles/List.css";

function List() {
  const [cards, setCards] = useState([]);
  const getCards = async () => {
    const response = await fetch(
      `https://one3th-front-api.onrender.com/grouping/groupList`
    );
    const json = await response.json();
    console.log(json);
    setCards(json);
  };
  useEffect(() => {
    getCards();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const openApplyModal = () => {
    setModalOpen(true);
  };

  return (
    <div id="main">
      <div id="list-appbar-box">
        <img id="list-appbar" src={list_appbar} alt="list-appbar" />
        <Link to="/">
          <img id="list-logo" src={list_logo} alt="logo" />
        </Link>
        <img id="list-profile" src={list_profile} alt="profile" />
        <div id="list-username">김원진</div>
      </div>
      <div id="list-previous-arrow-box">
        <img
          id="list-previous-arrow"
          src={previous_arrow}
          alt="previous-arrow"
        />
      </div>
      <div id="card-grid">
        <div id="create-group-button">
          <div id="create-icon-box">
            <img id="create-icon" src={create_icon} alt="create-icon" />
          </div>
        </div>
        {cards.map((card) => (
          <div id="card-list" onClick={openApplyModal}>
            <Card
              img_path={card.img_path}
              groupName={card.groupName}
              category={card.category}
              location={card.location}
              createdBy={card.createdBy}
            />
          </div>
        ))}
      </div>
      {modalOpen && <ApplyModal setModalOpen={setModalOpen} />}
      <div id="list-next-arrow-box">
        <img id="list-next-arrow" src={next_arrow} alt="next-arrow" />
      </div>
    </div>
  );
}

export default List;
