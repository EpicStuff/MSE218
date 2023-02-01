import { useState } from 'react';
import React from "react";
import "../../css/header";

export default function SearchForm() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  return (
    <form  onSubmit={handleSubmit}>
      <div className="search-bar">
        <input type="Search" className="no-outline" placeholder="Search" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
    </form>
  )
}

