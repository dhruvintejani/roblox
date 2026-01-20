import { dummyCategories, dummyItems } from "../../assets/data/Roblox/dummydata";
import { useCart } from "../context/CartContext";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { addToCart, removeFromCart, cart } = useCart();
  const { category, selectedTopics, searchQuery } = useOutletContext<{
    category: string;
    selectedTopics: string[];
    searchQuery: string;
  }>();

  const filteredItems = dummyItems.filter((item) => {
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(query);
      const matchesCreator = item.creatorName.toLowerCase().includes(query);
      const matchesTopics = item.topics.some((topic) =>
        topic.toLowerCase().includes(query)
      );

      if (!matchesTitle && !matchesCreator && !matchesTopics) {
        return false;
      }
    }
    if (category !== "All") {
      const selectedCategory = dummyCategories.find(
        (cat) => cat.category === category
      );
      if (!selectedCategory || item.taxonomy !== selectedCategory.taxonomy) {
        return false;
      }
    }

    if (selectedTopics.length > 0) {
      const itemTopics = item.topics.map((topic) => topic.toLowerCase());
      const hasSelectedTopic = selectedTopics.some((topic) =>
        itemTopics.includes(topic.toLowerCase())
      );
      if (!hasSelectedTopic) {
        return false;
      }
    }

    return true;
  });

  const isInCart = (id: number) => {
    return cart.some((item) => item.id === id);
  };

  return (
    <div className="px-6">
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-2xl font-bold mt-4 text-gray-700 mb-2">
            No items found
          </p>
          <p className="text-gray-500 text-xl font-semibold">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square object-contain"
                />
                <div className="absolute inset-0 bg-gray-300/30 opacity-0 px-2 py-3 group-hover:opacity-100 transition flex items-end justify-center">
                  {isInCart(item.id) ? (
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-white border border-black text-gray-500 px-4 w-full py-2.5 hover:text-black bg-opacity-50 rounded-xl text-md font-semibold"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-black text-white px-4 w-full py-3 rounded-xl text-sm font-semibold"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-3 text-lg leading-tight line-clamp-2">
                {item.title}
              </p>
              <div className="flex gap-2">
                <p>By</p>
                <p className="text-sm text-gray-500 flex items-center">
                  {item.creatorName}
                </p>
              </div>
              <div className="flex items-center gap-1 text-lg text-gray-700 mt-1">
                <span>🪙</span>
                <span>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
