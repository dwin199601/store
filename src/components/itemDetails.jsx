import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router';
import { itemDetailsOpen } from '../util/FetchDataHelper.js';

export default function ItemDetails(props) {

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { param } = useParams();

  const deleteHandler = async (items) => {
    try {
      items._id = param;
      console.log("Item was deleted");
      const { data } = await axios.delete("http://localhost:5000/api/items/" + items._id);
      const newItem = props.item.filter(i => i._id !== items._id);
      console.log(data, newItem);
      props.setItem([...newItem]);
      alert("Item was deleted!!")
    }
    catch (error) {
      console.log(error);
      history.push('/items');
      setLoading(false);
    }
  }

  useEffect(() => {
    itemDetailsOpen(props.setItem, setLoading, param, setError);
  }, [param]);



  return (
    <div>

      {isLoading && <div>Loading..</div>}
      {error && <div>Error: {error}</div>}
      {props.item &&
        <span>
          <h1 style={{ margin: "10px", color: "#06412f" }}>{props.item.item_name}</h1>
          <div className="boxParent">
            <div className="boxchild"><img src={props.item.item_image} alt="" /> </div>
            <div className="boxchild">
              <span>
                <p>Price: ${props.item.price}</p>
                <p>Description: {props.item.item_description}</p>

              </span>
            </div>
          </div>
          <button type="button"
            className="btn btn-danger"
            onClick={deleteHandler} style={{ marginTop: "20px" }}>Delete Item</button>
        </span>
      }
    </div>
  )
}

