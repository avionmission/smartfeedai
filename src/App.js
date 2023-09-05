import React, { useState, useEffect } from 'react'
import './App.css';
import FeedItemComponent from './components/FeedItemComponent';
import NavBarComponent from './components/NavBarComponent';
import LoadingItemComponent from './components/LoadingItemComponent'

function App() {

  const [isLoading, setIsLoading] = useState(false);
  
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("Efficient Information Retrieval with AI Summarization: Streamlining the Process of Knowledge Acquisition.");
  const [gist, setGist] = useState("AI-powered summarization tools are becoming popular as they provide a quick way to summarize lengthy documents, articles or web pages by simply pasting the link. These tools use natural language processing, machine learning, and deep learning to identify the most relevant content. They are useful for professionals and individuals who need to quickly review large volumes of information. However, it's important to use them with a critical eye and verify the accuracy of the summary.");

  function handleSubmit(event) {

    setIsLoading(true)

    event.preventDefault(); // prevent default form submission behavior
    // perform any necessary form validation here

    // send the form data to the server using an HTTP POST request
    fetch("/api/summary", {
      method: "POST",
      body: new FormData(event.target)
    }).then(res => res.json()).then(data => {
      setIsLoading(false)
      setTitle(data.title)
      setGist(data.gist)
    })
  }


  return (
    
    <>
    
    <NavBarComponent/>

    <div className="App">

      <header className="App-header">
        <p className='heading'>Smart<span style={{ color: '#54DA9A' }}>Feed</span>.ai</p>
        <p className='subtitle'>The Future of Reading Online with Ai</p>
      </header>
      
      <form className='search-bar' onSubmit={handleSubmit}>
        <input type="url" name="url" className='inputurl' placeholder='Enter url of a blogpost..' id='url' required onChange={(e) => setUrl(e.target.value)} />
        <button className='btn' type="submit" value="submit" name='url' id='url'>Generate Feed</button>
      </form>

      {isLoading ? (
        <div><LoadingItemComponent/></div>
      ): (
        <FeedItemComponent  title={title} gist={gist} url={url}/>
      )}
      
    </div>
  </>
  );

}

export default App;
