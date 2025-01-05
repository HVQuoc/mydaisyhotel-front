import { useState } from "react";

const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);
    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  const roomTypes = [...new Set(data.map((room) => room.roomType))];

  return (
    <div className="input-group mb-3">
      <div className="d-flex gap-2">
          <span className="input-group-text" id="room-type-filter">
            Filter rooms by type
          </span>
          <select
            className="select-options"
            value={filter}
            onChange={handleSelectChange}
          >
            <option value={""}>Select the room type to filter...</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={String(type)}>
                {String(type)}
              </option>
            ))}
          </select>
        <button className="btn-hotel" onClick={clearFilter}>
          Clear filter
        </button>
      </div>
    </div>
  );
};

export default RoomFilter;
