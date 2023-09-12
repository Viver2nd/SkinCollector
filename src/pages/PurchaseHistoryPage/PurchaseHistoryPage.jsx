import { checkToken } from "../../utilities/users-service";
import './PurchaseHistoryPage.css';

export default function PurchaseHistoryPage() {
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }
  
  return (
    <>
      <h1 className="purchase-complete">Purchase Successful!</h1>
    </>
  );
}