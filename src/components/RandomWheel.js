import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import "./RandomWheel.css";

const RandomWheel = () => {
  const initialData = [
    {
      option: "Giải 1",
      style: { backgroundColor: "#EE4040", textColor: "white" },
    },
    {
      option: "Giải 2",
      style: { backgroundColor: "#F0CF50", textColor: "black" },
    },
    {
      option: "Giải 3",
      style: { backgroundColor: "#815CD1", textColor: "white" },
    },
    {
      option: "Giải 4",
      style: { backgroundColor: "#3DA5E0", textColor: "white" },
    },
    {
      option: "Giải 5",
      style: { backgroundColor: "#34A24F", textColor: "white" },
    },
    {
      option: "Giải 6",
      style: { backgroundColor: "#F9AA1F", textColor: "black" },
    },
  ];
  const playerData = [{ name: "Lê Hoàng Phi", rewards: [] }];

  const [data, setData] = useState(initialData);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [newOption, setNewOption] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [players, setPlayers] = useState(playerData);
  const [newPlayer, setNewPlayer] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    setPlayers(savedPlayers);
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const handleSpinClick = () => {
    if (data.length === 0) {
      alert("Không có tùy chọn nào để quay!");
      return;
    }
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleAddOption = () => {
    if (newOption.trim() === "") {
      alert("Tùy chọn không được để trống!");
      return;
    }
    const newData = [
      ...data,
      {
        option: newOption,
        style: { backgroundColor, textColor },
      },
    ];
    setData(newData);
    setNewOption("");
    setBackgroundColor("#ffffff");
    setTextColor("#000000");
  };

  const handleDeleteOption = (index) => {
    if (data.length === 1) {
      alert("Cần giữ lại ít nhất 1 tùy chọn!");
      return;
    }
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleAddPlayer = () => {
    if (newPlayer.trim() === "") {
      alert("Tên người chơi không được để trống!");
      return;
    }
    const newPlayers = [...players, { name: newPlayer, rewards: [] }];
    setPlayers(newPlayers);
    setNewPlayer("");
  };

  const handleDeletePlayer = (index) => {
    if (players.length === 1) {
      alert("Cần giữ lại ít nhất 1 người chơi!");
      return;
    }

    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    if (data.length > 0) {
      const winningOption = data[prizeNumber].option;
      alert(
        `Chúc mừng ${players[currentPlayerIndex].name}! Bạn đã trúng ${winningOption}`
      );

      const updatedPlayers = players.map((player, index) => {
        if (index === currentPlayerIndex) {
          return { ...player, rewards: [...player.rewards, winningOption] };
        }
        return player;
      });
      setPlayers(updatedPlayers);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  return (
    <section className="container">
      <div className="container-wheel">
        <h1>Random Wheel</h1>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          onStopSpinning={handleStopSpinning}
        />
        <button onClick={handleSpinClick}>Quay!</button>
        <button onClick={handleStopSpinning}>Ngừng!</button>
      </div>
      <div className="options">
        <div className="options-section">
          <h2>Thêm Tuỳ chọn Mới</h2>
          <input
            type="text"
            placeholder="Tuỳ chọn"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <button onClick={handleAddOption}>Thêm</button>
          <div>
            <h2>Danh sách Tuỳ chọn</h2>
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  {item.option}
                  <button onClick={() => handleDeleteOption(index)}>Xoá</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="players-section">
          <h2>Thêm Người Chơi</h2>
          <input
            type="text"
            placeholder="Tên người chơi"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
          />
          <button onClick={handleAddPlayer}>Thêm</button>
          <div>
            <h2>Danh sách Người Chơi</h2>
            <ul>
              {players.map((player, index) => (
                <li key={index}>
                  {player.name} - Phần thưởng: {player.rewards.join(", ")}
                  <button onClick={() => handleDeletePlayer(index)}>Xoá</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomWheel;
