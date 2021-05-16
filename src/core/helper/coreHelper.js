export const addCartToItem = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (
      localStorage.getItem("cart") &&
      localStorage.getItem("cart").indexOf(item._id) === -1
    ) {
      cart = cart.concat(JSON.parse(localStorage.getItem("cart")));
      cart.push(item._id);
      let price = cart[0] + item.price;
      cart[0] = price;
    } else {
      cart = [0];
      let price = cart[0] + item.price;
      cart[0] = price;
      cart.push(item._id);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const getCartItem = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      return [];
    }
  }
  return [];
};

export const removeCartItem = (id, price, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = cart.concat(JSON.parse(localStorage.getItem("cart")));
    }
    cart = cart.filter((item) => item !== id);
    let newPrice = cart[0] - price;
    cart[0] = newPrice;
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
