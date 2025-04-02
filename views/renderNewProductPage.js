/* 🏗 Structo the Builder */
/* Funkcja generująca stronę HTML z najnowszym produktem */
const renderNewProductPage = (productData) => {
    let renderedTemplate = `<!DOCTYPE html>
<html lang="en">
<head><title>Shop - Newest product</title></head>
<body>
<h1>Newest product</h1>
<nav><a href='/home'>Home</a><br /><a href='/product/add'>Add product</a><br /><a href='/logout'>Logout</a></nav>
${ productData === null ? `<div>New product data is uanvailable.</div>` : `<p>Product name: ${productData.name} </p>`}
${ productData === null ? `` : `<p>Product description: ${productData.description} </p>` }
</body>
</html>
`;
    /* if (err) {
      response.write("<br /><div>No new products available.</div>");
    } else {
      response.write();
    } */

    return renderedTemplate;
};

module.exports = renderNewProductPage;
