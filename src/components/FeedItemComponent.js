import React from 'react'
import '../App.css'

function FeedItemComponent(title) {
    return(
        <div className='item-container'>
        <p className='title'>{title.title}</p>
        <p className='gist'>{title.gist}</p>
        <div className='action-buttons'>
          <button className='read-full-button'>READ FULL</button>
          <button className='save-for-later'>SAVE FOR LATER</button>
        </div>
      </div>
    );
}

export default FeedItemComponent;