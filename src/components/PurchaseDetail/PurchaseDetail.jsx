import './PurchaseDetail.css';
import LineItem from '../LineItem/LineItem';

// Used to display the details of any order, including the cart (unpaid order)
export default function PurchaseDetail({ purchase }) {
  if (!purchase) return null;

  const lineItems = purchase.lineItems.map(item =>
    <LineItem
      lineItem={item}
      isPaid={purchase.isPaid}
      key={item._id}
    />
  );

  return (
    <div className="PurchaseDetail">
      <div className="section-heading">
        {purchase.isPaid ?
          <span>PURCHASE <span className="smaller">{purchase.purchaseId}</span></span>
          :
          <span>NEW PURCHASE</span>
        }
        <span>{new Date(purchase.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className="line-item-container flex-ctr-ctr flex-col scroll-y">
        {lineItems.length ?
          <>
            {lineItems}
            <section className="total">
              {purchase.isPaid ?
                <span className="right">TOTAL&nbsp;&nbsp;</span>
                :
                <button
                  className="btn-sm"
                  onClick={() => alert('clicked')}
                  disabled={!lineItems.length}
                >CHECKOUT</button>
              }
              <span>{purchase.totalQty}</span>
              <span className="right">${purchase.purchaseTotal.toFixed(2)}</span>
            </section>
          </>
          :
          <div className="no-items">No Items Selected...</div>
        }
      </div>
    </div>
  );
}