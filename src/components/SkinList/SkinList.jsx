import './SkinList.css';
import SkinListItem from '../SkinListItem/SkinListItem';

export default function SkinList({ skinItems, handleAddToPurchase }) {
  const items = skinItems.map(item =>
    <SkinListItem
      key={item._id}
      skinItem={item}
      handleAddToPurchase={handleAddToPurchase}
    />
  );
  return (
    <main className="SkinList">
      {items}
    </main>
  );
}