import OrlistDetail from "./OrderListDetail";

function OrderListSellerContent({ content }) {
  return (
    <>
      {content.map((v, i) => {
        const {
          orId,
          date,
          payment_price,
          recip_name,
          recip_phone,
          recip_address,
          type_name,
          deliStatus,
        } = v;
        return (
          <tr key={orId}>
            <td>{orId}</td>
            <td className="tableHide">{date}</td>
            <td className="tableHide">${payment_price}</td>
            <td>{recip_name}</td>
            <td className="tableHide">{recip_phone}</td>
            <td className="tableHide">{recip_address}</td>
            <td className="tableHide">{type_name}</td>
            <td>{deliStatus}</td>
            <td>
              <OrlistDetail orId={orId} />
            </td>
          </tr>
        );
      })}
    </>
  );
}
export default OrderListSellerContent;