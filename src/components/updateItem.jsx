import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateItemHelper } from '../util/FetchDataHelper';

toast.configure();

function UpdateItem() {
  const history = useHistory();
  const { param } = useParams();
  const [item, setItem] = useState({});

  const successToastMessage = () => {
    toast.success("The item was updated!", { position: toast.POSITION.TOP_RIGHT, autoClose: 4000 })
  }

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/items/" + param, item);
      console.log("Item was updated!!")
      successToastMessage();
      history.push('/items');
    } catch (err) {
      console.log(err);

    }

  }
  UpdateItemHelper(param, setItem);

  return (
    <div>
      <h1> Udate Page</h1>
      <form>
        <div className="parentInputForm">

          <div className="childInputForm">
            <label>Name</label>
          </div>

          <div className="childInputForm">
            <input type="text"
              value={item.item_name}
              onChange={(e) => setItem({ ...item, "item_name": e.target.value })}
              required />
          </div>

          <div className="childInputForm">
            <label>Price$</label>
          </div>

          <div className="childInputForm">
            <input type="number" placeholder="999"
              value={item.price}
              onChange={(e) => setItem({ ...item, "price": e.target.value })}
              required />
          </div>
          <div className="childInputForm">
            <label>Change Image</label>
          </div>
          <div className="childInputForm">
            <input type="url"
              value={item.item_image}
              onChange={(e) => setItem({ ...item, "item_image": e.target.value })} />
          </div>

          <div className="childInputForm">
            <label>Description</label>
          </div>

          <div className="childInputForm">
            <textarea required
              value={item.item_description}
              onChange={(e) => setItem({ ...item, "item_description": e.target.value })}
            />
          </div>

          <div className="childInputForm">
            <button onClick={updateData} className="btn btn-success">Edit
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}


export default UpdateItem;
