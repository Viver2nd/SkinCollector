import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api'
import * as purchasesAPI from '../../utilities/purchases-api'

import './NewPurchasePage.css';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import SkinList from '../../components/SkinList/SkinList';
import CategoryList from '../../components/CategoryList/CategoryList';
import PurchaseDetail from '../../components/PurchaseDetail/PurchaseDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import purchase from '../../../models/purchase';

export default function NewPurchasePage({ user, setUser }) {
  const [skinItems, setSkinItems] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);



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
    setCart(updatedCard);
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
        <Link to="/purchases" className="button btn-sm">PREVIOUS ORDERS</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <SkinList
        skinItems={skinItems.filter(item => item.category.name === activeCat)}
        handleAddToPurchase={handleAddToPurchase}
      />
      <PurchaseDetail purchase={cart} />
    </main>
  );
}