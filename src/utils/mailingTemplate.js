export const mailingTemplate = (user, cart, total) => {
  return `
        <div style="color: black; background: white; width: 450px; height: 600px; text-align: center;">
            <div style="height: 75px">
                <h1 style="font-size: 25px; font-weight: bold;">PURCHASE TICKET</h1>
            </div>
            <div style="width: 100%; padding: 0 10px;">
                <span style="font-size: 25px;">------------------------------------------------</span>
                <table style="width: 100%; padding: 0 25px; border-spacing: 0;">
                    <thead>
                      <tr>
                        <th style="text-align: left; padding: 5px 0;">Detail</th>
                                           <th style="text-align: center; padding: 5px 0;">Price per unit</th>
                        <th style="text-align: right; padding: 5px 0;">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${cart
                        .map(
                          (item) => `
                          <tr style="padding: 2px 0; font-size: 18px;">
                              <td style="text-align: left;">${
                                item.product.title
                              } X${item.quantity}</td>
                                         <td style="text-align: center;">$${
                                           item.product.price
                                         }</td>
                              <td style="text-align: right;">$${
                                item.product.price * item.quantity
                              }</td>
                          </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                </table>
                <span style="font-size: 25px;">------------------------------------------------</span>
            </div>
            <div style="width: 100%; padding: 0 40px;">
                <table style="width: 100%; border-spacing: 0;">
                    <tbody>
                        <tr>
                            <td style="text-align: left; font-size: 25px; font-weight: bold;">TOTAL</td>
                            <td style="text-align: right; font-size: 25px; font-weight: bold;">$${total}.-</td>
                        </tr>
                        <tr>
                            <td style="text-align: left;">Client</td>
                            <td style="text-align: right; font-size: 15px;">${
                              user.first_name
                            } ${user.last_name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`;
};
