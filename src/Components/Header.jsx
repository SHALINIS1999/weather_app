import React from "react";
import "./Header.css";

function Header({ search, setSearch, getWeather }) {

return (

<div className="header">

<h1>⛅Weather App</h1>
<div className="search-container">

<input
type="text"
placeholder="Search city..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="search-input"
/>

<button
onClick={()=>getWeather()}
className="search-btn"
>
Search
</button>

</div>
</div>

)
}

export default Header;