import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
function Review({ checkoutToken }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Detalles de la orden
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Cantidad: ${product.quantity}`}
            ></ListItemText>
            <Typography variant="body2">
              {product.line_total.formatted_with_code}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkoutToken.live.subtotal.formatted_with_code}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}

export default Review;
