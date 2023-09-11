import './SkinListItem.css';

export default function SkinListItem({ skinItem, handleAddToPurchase }) {
  return (
    <div className="SkinListItem">
      <div className="name">{skinItem.name}</div>
      <div className="buy">
        <span>${skinItem.price.toFixed(2)}</span>
        <button className="btn-sm" onClick={() => handleAddToPurchase(skinItem._id)}>
          ADD
        </button>
      </div>
    </div>
  );
}