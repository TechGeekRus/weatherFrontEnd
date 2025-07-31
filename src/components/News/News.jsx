import React, { useEffect, useState } from 'react'

function NewsFeed() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/news')
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, []);

  if (loading) return <div>Loading news...</div>

  return (
    <div>
      <h2>Top Headlines</h2>
      <ul>
        {articles.map((article, idx) => (
          <li key={idx}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewsFeed