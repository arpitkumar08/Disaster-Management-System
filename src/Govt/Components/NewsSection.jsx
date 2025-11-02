import React, { useState } from "react";
import NewsModal from "./NewsModal";

const NewsSection = () => {
  const [newsArticles, setNewsArticles] = useState([
    {
      id: 1,
      title: "Relief operations intensified in Assam floods",
      description:
        "NDRF and local authorities have rescued over 5,000 people as heavy rains continue to affect the region.",
      date: "2025-11-01",
      source: "The Hindu",
    },
    {
      id: 2,
      title: "Government announces compensation for flood victims",
      description:
        "The state government has approved ₹500 crore in relief packages for affected families.",
      date: "2025-10-30",
      source: "Times of India",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNews = (newArticle) => {
    setNewsArticles((prev) => [newArticle, ...prev]);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-800">Latest News</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-700 text-white px-5 py-2 rounded-md font-medium shadow-md hover:bg-blue-800 transition-all"
        >
          + Add News
        </button>
      </div>

      <div className="grid gap-6">
        {newsArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white border border-blue-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-blue-700">{article.title}</h3>
            <p className="text-gray-600 mt-2">{article.description}</p>
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>{article.source}</span>
              <span>
                {new Date(article.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {/* <NewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddNews={handleAddNews}
      /> */}
    </div>
  );
};

export default NewsSection;
