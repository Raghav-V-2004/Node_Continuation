
import React from 'react';

function ArticleCard({ title, description, author, date }) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
      <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition duration-200 ease-in-out">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{author} | {date}</p>
      <p className="mt-4 text-gray-700">{description}</p>

      {/* Optional: Add a "Read more" link */}
      <div className="mt-4">
        <button className="text-blue-500 hover:text-blue-700 font-semibold transition duration-200 ease-in-out">
          Read more
        </button>
      </div>
    </div>
  );
}

export default ArticleCard;
