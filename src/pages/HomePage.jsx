import { useEffect, useState } from "react";
import api from "../api/axios";

function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRooms = async () => {
    try {
      const response = await api.get("/room?page=1&pageSize=12");
      setRooms(response.data.items || []);
    } catch (error) {
      console.error("Failed to load rooms", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  if (loading) {
    return <p>Loading rooms...</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Available Rooms</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div key={room.id} className="overflow-hidden rounded bg-white shadow">
            {room.imageUrl ? (
              <img
                src={room.imageUrl}
                alt={room.name}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="flex h-48 items-center justify-center bg-gray-200 text-gray-500">
                No image
              </div>
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p className="mt-1 text-sm text-gray-600">{room.location}</p>
              <p className="mt-2 text-sm text-gray-700">{room.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-blue-600">
                  ${room.pricePerNight} / night
                </span>
                <span className="text-sm text-gray-500">
                  {room.capacity} guests
                </span>
              </div>

              {room.amenities?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {room.amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;