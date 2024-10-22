import React, { useEffect, useState } from 'react';
import './Purchase.css'; // Import the CSS file

const Purchase = () => {
  const [events, setEvents] = useState([]);
  const [cart, setCart] = useState([]); // State to manage the cart

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events'); // Replace with your API URL
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddToCart = (event) => {
    setCart([...cart, event]);
    alert(`${event.eventName} has been added to your cart!`);
  };

  const handleBuyNow = (event) => {
    // Implement your buy now functionality here
    alert(`Buying ${event.eventName} now!`);
  };

  return (
    <div className="purchase-container">
      <h1>Event List</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="event-list">
          {events.map(event => (
            <li key={event._id} className="event-item">
              {event.imageBase64 && (
                <img src={event.imageBase64} alt={event.eventName} className="event-image" />
              )}
              <h2 className="event-title">{event.eventName}</h2>
              <p className="event-description">Description: {event.description}</p>
              <p className="event-location">Location: {event.eventLocation}</p>
              <p className="event-date">Date: {event.eventDate}</p>
              <div className="button-group">
                <button className="purchase-button" onClick={() => handleAddToCart(event)}>Add to Cart</button>
                <button className="purchase-button" onClick={() => handleBuyNow(event)}>Buy Now</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h2 className="cart-title">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              {item.eventName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Purchase;
