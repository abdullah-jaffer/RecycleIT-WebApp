import React, { useRef, useState } from 'react';

export default function CopyText(props) {

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
    <div>
     
      <form style={{display:"flex", flexFlow:"row wrap", alignItems:"center"}}>
        <textarea
        style={{width:"440px"}}
          ref={textAreaRef}
          value={props.text}
        />
        <span style={{marginLeft:"10px"}}>
          <button onClick={copyToClipboard}>Copy Link</button>  
          {copySuccess}
        </span>
      </form>
      
    </div>
  );
}