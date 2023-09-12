import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api'
import * as purchasesAPI from '../../utilities/purchases-api'

import './NewPurchasePage.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import SkinList from '../../components/SkinList/SkinList';
import CategoryList from '../../components/CategoryList/CategoryList';
import PurchaseDetail from '../../components/PurchaseDetail/PurchaseDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewPurchasePage({ user, setUser }) {
  const [skinItems, setSkinItems] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();



  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      categoriesRef.current = [...new Set(items.map(item => item.category.name))];
      setSkinItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();
  }, []);

  async function getCart() {
    const cart = await purchasesAPI.getCart();
    setCart(cart);
  }
  getCart();

  /*--- Event Handlers --- */
  async function handleAddToPurchase(itemId) {
    const updatedCart = await purchasesAPI.addItemToCart(itemId);
    setCart(updatedCart);
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await purchasesAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await purchasesAPI.checkout();
    navigate('/purchases');
  }
  
  return (
    <main className="NewPurchasePage">
      <aside>
        <Logo />
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <SkinList
        skinItems={skinItems.filter(item => item.category.name === activeCat)}
        handleAddToPurchase={handleAddToPurchase}
      />
      <PurchaseDetail
        purchase={cart}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  );
}