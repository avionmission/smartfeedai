import React from 'react'
import '../App.css'

function FeedItemComponent(props) {
    return(
        <div className='item-container'>
          <p className='title'>{props.title}</p>
          <p className='url'>{props.url}</p>
          <p className='gist'><span style={{fontWeight: 'bold'}}>Gist:</span> {props.gist}</p>
          <div className='action-buttons'>
            <button className='read-full-btn'>READ FULL</button>
            <button className='save-btn'>SAVE FOR LATER</button>
          </div>
      </div>
    );
}

export default FeedItemComponent;