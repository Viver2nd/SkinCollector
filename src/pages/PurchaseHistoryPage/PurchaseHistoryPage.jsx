import { checkToken } from "../../utilities/users-service";

export default function PurchaseHistoryPage() {
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }
  
  return (
    <>
      <h1>PurchaseHistoryPage</h1>
    </>
  );
}